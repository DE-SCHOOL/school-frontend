import { configureStore } from '@reduxjs/toolkit';

//IMPORT SLICE FEATURES
import staffReducer from './staffs/staffSlice';
import studentReducer from './students/studentSlice';
import specialtyReducer from './specialty/specialtySlice';
import departmentReducer from './departments/departmentSlice';
import authReducer from './auth/authSlice';
import programReducer from './program/programSlice';
import courseReducer from './courses/courseSlice';
import curPageReducer from './cur page/curPageSlice';
import dashboardReducer from './dashboard/dashboardSlice';
import markReducer from './marks/markSlice';
import examReducer from './exams/examSlice';
import uiStateReducer from './ui-state/ui-stateSlice';
import questionReducer from './question/questionSlice';
import reviewReducer from './reviews/reviewSlice';
import questionCategoryReducer from './question category/questionCategorySlice';
import academicYearReducer from './academic year/academicYearSlice';

//CREATING THE VARIOUS REDUCERS
const store = configureStore({
	reducer: {
		staffs: staffReducer,
		students: studentReducer,
		specialty: specialtyReducer,
		departments: departmentReducer,
		auth: authReducer,
		programs: programReducer,
		courses: courseReducer,
		curPage: curPageReducer,
		dashboard: dashboardReducer,
		marks: markReducer,
		exams: examReducer,
		uiState: uiStateReducer,
		questions: questionReducer,
		reviews: reviewReducer,
		questionCategory: questionCategoryReducer,
		years: academicYearReducer,
	},
});

export default store;
