import * as R from 'ramda';
import { readFileSync } from 'fs-extra';
import { Maybe } from '@opi_pib/ts-utility';

import { TranslationsObject } from '../../models/translations-object';

export class TranslationsBuilder {
	removeKeysWithEmptyString(translation: TranslationsObject): TranslationsObject {
		R.keys(translation).forEach((key) => {
			const value: string = R.prop(key, translation);

			if (R.is(String, value) && R.isEmpty(value)) {
				delete translation[key];
			}
		});

		return translation;
	}

	mergeOldTranslations(newTranslations: TranslationsObject, oldTranslations: TranslationsObject): TranslationsObject {
		return R.mergeAll([newTranslations, this.removeUnusedKeys(oldTranslations, newTranslations)]);
	}

	private removeUnusedKeys(oldTranslation: TranslationsObject, newTranslation: TranslationsObject): TranslationsObject {
		const newKeys = R.keys(newTranslation);

		return R.pick(newKeys as any, oldTranslation);
	}

	getOldTranslationObject(lang: string, outputTranslatorPath: string): Maybe<TranslationsObject> {
		let content: string;
		let translationsObject: Maybe<TranslationsObject> = null;

		try {
			content = readFileSync(`${outputTranslatorPath}${lang}.json`, 'utf8');
		} catch (e) {
			return translationsObject;
		}

		if (content && R.is(String, content) && !!content.length) {
			translationsObject = JSON.parse(content);
		}

		return translationsObject;
	}

	findDuplicatedValues(translations: TranslationsObject): Record<string, number> {
		return R.pickBy(
			(value, key) => value > 1,
			R.countBy((r) => r, R.values(translations))
		);
	}
}
