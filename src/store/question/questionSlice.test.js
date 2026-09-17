import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../APIs/apiRequest';
import questionReducer, { getAllQuestions, createQuestion, getQuestion, deleteQuestion, editQuestion } from './questionSlice';

vi.mock('../APIs/apiRequest', () => ({ apiRequest: vi.fn() }));

function makeStore() {
	return configureStore({ reducer: { questions: questionReducer } });
}

describe('questionSlice', () => {
	beforeEach(() => {
		apiRequest.mockReset();
	});

	describe('getAllQuestions', () => {
		it('fetches and stores the question list, clearing question', async () => {
			const store = makeStore();
			const questions = [{ _id: '1' }];
			apiRequest.mockResolvedValue({ data: { data: questions } });

			await store.dispatch(getAllQuestions());

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/question/');
			const state = store.getState().questions;
			expect(state.questions).toEqual(questions);
			expect(state.question).toBeNull();
		});

		it('sets a real server error message on failure', async () => {
			const store = makeStore();
			apiRequest.mockRejectedValue({ response: { data: { message: 'Forbidden' } } });
			await store.dispatch(getAllQuestions());
			expect(store.getState().questions.errorMessage).toBe('Forbidden');
		});
	});

	describe('createQuestion', () => {
		it('posts the question payload and sets success on completion', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: {} });
			const payload = { question: 'How was the course?', category: 'c1' };

			await store.dispatch(createQuestion(payload));

			expect(apiRequest).toHaveBeenCalledWith('post', '/api/v1/question/', payload);
			expect(store.getState().questions.success).toBe(true);
		});
	});

	describe('getQuestion', () => {
		it('fetches a single question and clears the list', async () => {
			const store = makeStore();
			const question = { _id: '1', question: 'How was the course?' };
			apiRequest.mockResolvedValue({ data: { data: question } });

			await store.dispatch(getQuestion({ id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('get', '/api/v1/question/1');
			const state = store.getState().questions;
			expect(state.question).toEqual(question);
			expect(state.questions).toEqual([]);
		});
	});

	describe('deleteQuestion', () => {
		it('deletes a question and sets success', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: {} });

			await store.dispatch(deleteQuestion({ id: '1' }));

			expect(apiRequest).toHaveBeenCalledWith('delete', '/api/v1/question/1');
			expect(store.getState().questions.success).toBe(true);
		});
	});

	describe('editQuestion', () => {
		it('patches the question by id (not a delete)', async () => {
			const store = makeStore();
			apiRequest.mockResolvedValue({ data: {} });
			const payload = { id: '1', question: 'Updated question text' };

			await store.dispatch(editQuestion(payload));

			expect(apiRequest).toHaveBeenCalledWith('patch', '/api/v1/question/1', payload);
			expect(store.getState().questions.success).toBe(true);
		});
	});
});
