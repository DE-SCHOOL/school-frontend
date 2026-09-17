import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import courseReducer, {
	getCourses,
	createCourse,
	editCourse,
	myCourses,
	getCoursesBySearch,
	getCourse,
	getCourseStats,
	getAllCourseStats,
	getCoursesPerSpecialty,
	getCoursesPerSpecialtyPerLevel,
	deleteCourse,
} from './courseSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { courses: courseReducer } });
}

describe('courseSlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	describe('getCourses', () => {
		it('sets isLoading while pending', () => {
			const store = makeStore();
			apiRequest.mockReturnValue(new Promise(() => {})); // never resolves
			store.dispatch(getCourses());
			expect(store.getState().courses.isLoading).toBe(true);
		});

		it('stores the course list and resets course/courseStats on success', async () => {
			const store = makeStore();
			const courses = [{ _id: '1', name: 'Math' }];
			apiRequest.mockResolvedValue({ data: courses });

			await store.dispatch(getCourses());

			const state = store.getState().courses;
			expect(state.courses).toEqual(courses);
			expect(state.courseStats).toBeUndefined();
			expect(state.course).toEqual({});
			expect(state.isLoading).toBe(false);
			expect(state.errorMessage).toBeNull();
		});

		it('sets error state with the server message on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Not authorized' } } });

			await store.dispatch(getCourses());

			const state = store.getState().courses;
			expect(state.error).toBe(true);
			expect(state.isLoading).toBe(false);
			expect(state.errorMessage).toBe('Not authorized');
		});

		it('falls back to a generic message when the server gives none', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue(new Error('network down'));

			await store.dispatch(getCourses());

			expect(store.getState().courses.errorMessage).toBe('Something went wrong');
		});

		it('calls the real course list endpoint', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: [] });
			await store.dispatch(getCourses());
			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/course');
		});
	});

	describe('createCourse', () => {
		it('posts the full course payload to the real endpoint', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: { _id: '1' } });
			const payload = {
				name: 'Physics',
				specialty: ['s1'],
				code: 'PHY101',
				semester: 's1',
				levels: [100],
				status: 'compulsory',
				credit_value: 3,
			};

			await store.dispatch(createCourse(payload));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/course', payload);
		});

		it('clears errorMessage on success without touching the courses list', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: {} });
			await store.dispatch(
				createCourse({ name: 'x', specialty: [], code: 'x', semester: 's1', levels: [], status: 'compulsory', credit_value: 1 })
			);
			const state = store.getState().courses;
			expect(state.errorMessage).toBeNull();
			expect(state.isLoading).toBe(false);
		});

		it('sets error state on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Duplicate course code' } } });
			await store.dispatch(
				createCourse({ name: 'x', specialty: [], code: 'x', semester: 's1', levels: [], status: 'compulsory', credit_value: 1 })
			);
			const state = store.getState().courses;
			expect(state.error).toBe(true);
			expect(state.errorMessage).toBe('Duplicate course code');
		});
	});

	describe('editCourse', () => {
		it('patches the course by id and replaces course/clears courses on success', async () => {
			const store = makeStore();
			const updated = { _id: '1', name: 'Updated Physics' };
			apiRequest.mockResolvedValue({ data: { data: updated } });

			await store.dispatch(editCourse({ values: { name: 'Updated Physics' }, id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('patch', '/api/v1/course/1', { name: 'Updated Physics' });
			const state = store.getState().courses;
			expect(state.course).toEqual(updated);
			expect(state.courses).toEqual([]);
		});

		it('sets error state on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Not found' } } });
			await store.dispatch(editCourse({ values: {}, id: '1' }));
			expect(store.getState().courses.errorMessage).toBe('Not found');
		});
	});

	describe('myCourses', () => {
		it('fetches a teacher\'s courses and stores them under myCourses', async () => {
			const store = makeStore();
			const courses = [{ _id: '1' }];
			apiRequest.mockResolvedValue({ data: courses });

			await store.dispatch(myCourses({ teacherID: 't1' }));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/staff-course/t1');
			expect(store.getState().courses.myCourses).toEqual(courses);
		});
	});

	describe('getCoursesBySearch', () => {
		it('posts the search criteria and stores results', async () => {
			const store = makeStore();
			const courses = [{ _id: '1' }];
			apiRequest.mockResolvedValue({ data: courses });
			const searchData = { name: 'Math' };

			await store.dispatch(getCoursesBySearch(searchData));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/course/search-courses', searchData);
			expect(store.getState().courses.courses).toEqual(courses);
		});
	});

	describe('getCourse', () => {
		it('fetches a single course by id', async () => {
			const store = makeStore();
			const course = { _id: '1', name: 'Math' };
			// getCourse.fulfilled reads action.payload.data, so the mocked
			// axios response body must itself carry the backend's own
			// {data: ...} envelope — unlike getCourses, which reads
			// action.payload directly.
			apiRequest.mockResolvedValue({ data: { data: course } });

			await store.dispatch(getCourse({ id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/course/1');
			expect(store.getState().courses.course).toEqual(course);
		});
	});

	describe('getCourseStats', () => {
		it('posts semester/academicYear and stores courseStats', async () => {
			const store = makeStore();
			const stats = { average: 65 };
			apiRequest.mockResolvedValue({ data: { data: stats } });

			await store.dispatch(getCourseStats({ id: '1', semester: 's1', academicYear: '2024/2025' }));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/course/statistics/1', {
				semester: 's1',
				academicYear: '2024/2025',
			});
			expect(store.getState().courses.courseStats).toEqual(stats);
		});
	});

	describe('getAllCourseStats', () => {
		it('posts the course id list and stores allCourseStats', async () => {
			const store = makeStore();
			const stats = [{ courseId: '1' }];
			apiRequest.mockResolvedValue({ data: { data: stats } });

			await store.dispatch(getAllCourseStats({ semester: 's1', academicYear: '2024/2025', courseIDs: ['1'] }));

			expect(store.getState().courses.allCourseStats).toEqual(stats);
		});
	});

	describe('getCoursesPerSpecialty', () => {
		it('fetches courses for a specialty', async () => {
			const store = makeStore();
			const courses = [{ _id: '1' }];
			apiRequest.mockResolvedValue({ data: { data: courses } });

			await store.dispatch(getCoursesPerSpecialty({ id: 'spec1' }));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/course/specialty/spec1');
			expect(store.getState().courses.courses).toEqual(courses);
		});
	});

	describe('getCoursesPerSpecialtyPerLevel', () => {
		it('posts the level and fetches courses for a specialty+level', async () => {
			const store = makeStore();
			const courses = [{ _id: '1' }];
			apiRequest.mockResolvedValue({ data: { data: courses } });

			await store.dispatch(getCoursesPerSpecialtyPerLevel({ id: 'spec1', level: 200 }));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/course/level/specialty/spec1', { level: 200 });
			expect(store.getState().courses.courses).toEqual(courses);
		});
	});

	describe('deleteCourse', () => {
		it('deletes a course and stores the returned list', async () => {
			const store = makeStore();
			const remaining = [{ _id: '2' }];
			apiRequest.mockResolvedValue({ data: remaining });

			await store.dispatch(deleteCourse({ id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('delete', '/api/v1/course/1');
			expect(store.getState().courses.courses).toEqual(remaining);
		});

		it('reads the error message from a real axios-shaped rejection', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Course has enrolled students' } } });

			await store.dispatch(deleteCourse({ id: '1' }));

			expect(store.getState().courses.errorMessage).toBe('Course has enrolled students');
		});
	});
});
