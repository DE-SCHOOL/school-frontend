import { describe, expect, it, vi } from 'vitest';
import { sortArrayObject } from './sortingInfo';

describe('sortArrayObject', () => {
	it('sorts ascending by a plain field and reports the sorted field', () => {
		const data = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }];
		const setData = vi.fn();
		const setSortedBy = vi.fn();

		sortArrayObject(data, setData, setSortedBy, 'name');

		expect(setData).toHaveBeenCalledWith([{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }]);
		expect(setSortedBy).toHaveBeenCalledWith('name');
	});

	it('sorts by a nested field when fieldOpt is given', () => {
		const data = [
			{ specialty: { name: 'Zoology' } },
			{ specialty: { name: 'Anatomy' } },
		];
		const setData = vi.fn();
		const setSortedBy = vi.fn();

		sortArrayObject(data, setData, setSortedBy, 'specialty', 'name');

		expect(setData).toHaveBeenCalledWith([
			{ specialty: { name: 'Anatomy' } },
			{ specialty: { name: 'Zoology' } },
		]);
	});

	it('does not mutate the original array', () => {
		const data = [{ name: 'B' }, { name: 'A' }];
		const original = [...data];
		sortArrayObject(data, vi.fn(), vi.fn(), 'name');
		expect(data).toEqual(original);
	});

	it('treats a missing nested value as null without throwing', () => {
		const data = [{ specialty: { name: 'Zoology' } }, { specialty: {} }];
		const setData = vi.fn();

		// null vs. undefined compare as neither less-than-nor-greater-than
		// under JS's relational operators, so the comparator reports them
		// equal and Array.prototype.sort (stable) leaves their relative
		// order unchanged — pinning that real behavior, not "sorts it
		// first", which was this test's original, wrong assumption.
		expect(() => sortArrayObject(data, setData, vi.fn(), 'specialty', 'name')).not.toThrow();
		expect(setData).toHaveBeenCalledWith([{ specialty: { name: 'Zoology' } }, { specialty: {} }]);
	});
});
