import { TranslationsBuilder } from './translations-builder';

describe('TranslationsBuilder', () => {
	let translationsBuilder: TranslationsBuilder;

	beforeAll(() => {
		translationsBuilder = new TranslationsBuilder();
	});

	it('findDuplicatedValues', () => {
		const result = translationsBuilder.findDuplicatedValues({
			'a.a': 'a',
			'a.b': 'b',
			'a.c': 'a',
		});

		expect(result).toEqual({ a: 2 });
	});
});
