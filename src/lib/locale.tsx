import ka from '../../public/locales/ka';
import en from '../../public/locales/en';
import az from '../../public/locales/az';

type LanguageObject = {
    [key: string]: any;
};

const locales: { [key: string]: LanguageObject } = {
    'en': en,
    'ka': ka,
    'az': az
};

const getLocale = (locale: string | undefined): LanguageObject => {
    if (locale && locales[locale]) {
        return locales[locale];
    }

    return ka;
};

export default getLocale;
