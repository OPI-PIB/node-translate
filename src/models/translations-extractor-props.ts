export interface TranslationsExtractorProps {
	inputPath: string;
	outputTranslatorPath: string;
	outputInterfaceFile: string;
	outputTranslationKeyTypeFile: string;
	outputMarkerFile: string;
	outputLanguagesFile: string;
	outputAppPath: string;
	langs: string[];
	reportDuplicates: boolean;
}
