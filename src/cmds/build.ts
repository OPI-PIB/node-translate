import { Notify } from '@opi_pib/node-utility';
import { ensureDirSync } from 'fs-extra';

import { TranslationsExtractor } from '../classes/translations-extractor/translations-extractor';
import { TranslationsExtractorProps } from '../models/translations-extractor-props';

exports.command = 'build [source] [dist] [i18n] [langs...] [reportDuplicates]';
exports.aliases = ['b'];
exports.desc = 'Generate translations';
exports.builder = {
	source: {
		default: './src/app/**/*+(.ts|.html)',
	},
	dist: {
		default: './src/translations',
	},
	i18n: {
		default: './src/assets/i18n/',
	},
	langs: {
		default: ['pl'],
	},
	reportDuplicates: {
		default: 'true',
	},
};
exports.handler = (argv: any) => {
	ensureDirSync(argv.dist);
	ensureDirSync(`${argv.dist}/for-the-translator/`);
	ensureDirSync(argv.i18n);

	const options: Omit<TranslationsExtractorProps, 'reportDuplicates'> & { reportDuplicates: string } = {
		inputPath: argv.source,
		outputTranslatorPath: `${argv.dist}/for-the-translator/`,
		outputAppPath: argv.i18n,
		outputInterfaceFile: `${argv.dist}/translations.ts`,
		outputTranslationKeyTypeFile: `${argv.dist}/translation-key.ts`,
		outputMarkerFile: `${argv.dist}/translation-marker.ts`,
		outputLanguagesFile: `${argv.dist}/translation-languages.ts`,
		langs: argv.langs,
		reportDuplicates: argv.reportDuplicates,
	};
	const translationsExtractor = new TranslationsExtractor({
		...options,
		reportDuplicates: options.reportDuplicates !== 'false',
	});

	try {
		translationsExtractor.extract(argv);
	} catch (error) {
		if (error instanceof Error) {
			Notify.error({ message: 'Error', error });
		}
	}
};
