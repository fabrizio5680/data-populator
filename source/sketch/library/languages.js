import * as OPTIONS from '../../sketch/library/options'
import * as Data from '../../sketch/library/data'
import Context from '../../sketch/library/context'
import {setTimeout} from '@skpm/timers';

const languageFileCache = {};

export const languages = 'ar, bg, br, ca, ch, cs, da, de, el, en, es, et, fi, fl, fo, fr, hr, hu, id, is, it, lt, lv, mk, ms, mx, nl, no, pl, pt, ro, ru, sr, sv, th, tl, tr, uk, vi, zh'.split(',');

const getFile = ({langPath, langKey = '', rootDir}) => {

  const key = langKey.toLowerCase().trim();

  if (!key) {
    return null;
  }

  if (languageFileCache[key]) {
    return languageFileCache[key]
  }

  const raw = langPath
    ? Data.readFileAsText(`${langPath}/${key}.json`)
    : Data.readFileAsText(`${rootDir}/langs/${key}.json`);

  if (raw) {
    try {
      languageFileCache[key] = JSON.parse(raw);
    } catch (e) {
      languageFileCache[key] = null;
    }
  }

  return languageFileCache[key];
}


const getLanguagesArray = (options) => {
  return (options[OPTIONS.LANGUAGE_KEYS] && options[OPTIONS.LANGUAGE_KEYS].split(',')) || [];
}

export const getNextLanguageKey = (options, dataIndex) => {
  const languagesArray = getLanguagesArray(options)
  const m = Math.floor(dataIndex / languagesArray.length)
  return dataIndex < languagesArray.length ? languagesArray[dataIndex] : languagesArray[dataIndex - (languagesArray.length * m)]
}

export const preFetchAllLanguages = (options) => {
  const languages = getLanguagesArray(options)
  languages.forEach((key, index) => {
    setTimeout(() => {
      getFile(Object.assign({}, options, {
        langKey: key
      }))
    }, index * 2)
  })
};

export const getLanguageJSON = (options) => {
  if (!options[OPTIONS.LANG_KEY]) {
    Context().document.showMessage(`no language key specified, please select language`);
    return null;
  }

  if (options[OPTIONS.LANG_KEY].toLowerCase() === 'ko' || options[OPTIONS.LANG_KEY].toLowerCase() === 'ja') {
    Context().document.showMessage(`"${options[OPTIONS.LANG_KEY].toLowerCase()}" language not supported`);
    return null;
  }

  try {
    const lang = getFile(options);
    if (lang) {
      return lang
    }

    const dir = `${options[OPTIONS.LANG_PATH] || `${options[OPTIONS.ROOT_DIR]}/langs`}`

    Context().document.showMessage(`language file "${options[OPTIONS.LANG_KEY]}" not found in ${dir}`);
    return null;

  } catch (e) {
    Context().document.showMessage(`Error loading languages - "${e && e.message}"`);

    return null;
  }
}
