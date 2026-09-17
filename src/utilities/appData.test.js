import { describe, expect, it } from 'vitest';
import { mapSchoolToHeaderProp, schoolHeaderPropFallback, gradeAndRange } from './appData';

describe('mapSchoolToHeaderProp', () => {
	it('maps every real School field onto the header shape', () => {
		const school = {
			name: 'Real School',
			poBox: 'P.O Box 99',
			region: 'Centre Region',
			contactPhone: '699000000',
			contactEmail: 'contact@real.cm',
			country: 'REPUBLIC OF CAMEROON',
			motto: 'Excellence',
			ministry: 'Ministry of Basic Education',
		};

		expect(mapSchoolToHeaderProp(school)).toEqual({
			name: 'Real School',
			box: 'P.O Box 99',
			region: 'Centre Region',
			tel: '699000000',
			email: 'contact@real.cm',
			country: 'REPUBLIC OF CAMEROON',
			motto: 'Excellence',
			ministry: 'Ministry of Basic Education',
		});
	});

	it('falls back field-by-field when school is null (not yet loaded)', () => {
		expect(mapSchoolToHeaderProp(null)).toEqual(schoolHeaderPropFallback);
	});

	it('falls back only for the fields that are missing on a partial school', () => {
		const result = mapSchoolToHeaderProp({ name: 'Partial School' });
		expect(result.name).toBe('Partial School');
		expect(result.box).toBe(schoolHeaderPropFallback.box);
		expect(result.country).toBe(schoolHeaderPropFallback.country);
	});
});

describe('gradeAndRange', () => {
	it('covers the full 0-100 mark range with no gaps, high to low', () => {
		expect(gradeAndRange).toHaveLength(4);
		expect(gradeAndRange[0]).toEqual({ grade1: 'A', range1: '80 - 100', grade2: 'C', range2: '50 - 54' });
		expect(gradeAndRange[3]).toEqual({ grade1: 'C+', range1: '55 - 59', grade2: 'F', range2: '0 - 39' });
	});
});
