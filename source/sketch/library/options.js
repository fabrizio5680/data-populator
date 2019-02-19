/**
 * Options
 *
 * Provides functionality to get and set user options shared across the plugin.
 */

import * as Utils from './utils'

export const ROOT_DIR = 'rootDir'
// data options
export const RANDOMIZE_DATA = 'randomizeData'
export const TRIM_TEXT = 'trimText'
export const INSERT_ELLIPSIS = 'insertEllipsis'
export const DEFAULT_SUBSTITUTE = 'defaultSubstitute'

// layout options
export const CREATE_GRID = 'createGrid'
export const ROWS_COUNT = 'rowsCount'
export const ROWS_MARGIN = 'rowsMargin'
export const COLUMNS_COUNT = 'columnsCount'
export const COLUMNS_MARGIN = 'columnsMargin'

// populator options
export const POPULATE_TYPE = 'populateType'
export const POPULATE_TYPE_PRESET = 'preset'
export const POPULATE_TYPE_JSON = 'json'
export const POPULATE_TYPE_URL = 'url'
export const PRESETS_LIBRARY_PATH = 'presetsLibraryPath'
export const SELECTED_PRESET = 'selectedPreset'
export const JSON_PATH = 'JSONPath'
export const URL = 'URL'
export const HEADERS = 'headers'
export const HEADERS_VISIBLE = 'headersVisible'
export const DATA_PATH = 'dataPath'
export const LANG_KEY = 'langKey'
export const LANG_PATH = 'langPath'
export const NAMESPACE_LANG = 'namespaceLang';
export const LANGUAGE_KEYS = 'languageKeys'
export const LANGUAGES_FILL = 'languagesFill'

let OPTIONS = [
  RANDOMIZE_DATA, TRIM_TEXT, INSERT_ELLIPSIS, DEFAULT_SUBSTITUTE,
  CREATE_GRID, ROWS_COUNT, ROWS_MARGIN, COLUMNS_COUNT, COLUMNS_MARGIN,
  POPULATE_TYPE, SELECTED_PRESET, LANG_PATH, LANG_KEY,
  JSON_PATH, NAMESPACE_LANG, LANGUAGE_KEYS,
  URL, HEADERS, HEADERS_VISIBLE,
  PRESETS_LIBRARY_PATH, DATA_PATH
]

/**
 * Gets or sets the stored options in user defaults.
 *
 * @returns {Object}
 */
export default function (newOptions) {

  // set new options
  if (newOptions) {
    OPTIONS.forEach((key) => {

      // save into user defaults
      if (newOptions.hasOwnProperty(key)) {
        NSUserDefaults.standardUserDefaults().setObject_forKey(JSON.stringify(newOptions[key]), 'DataPopulator_' + key)
      }
    })

    // sync defaults
    NSUserDefaults.standardUserDefaults().synchronize()
  }

  // get options
  let options = {}
  OPTIONS.map((key) => {

    // get options from user defaults
    let option = NSUserDefaults.standardUserDefaults().objectForKey('DataPopulator_' + key)

    // convert to correct type and set
    if (option) {

      try {
        option = JSON.parse(option)
        options[key] = option
      } catch (e) {}
    }
  })

  return options
}

export function remove () {

  let keys = Utils.convertToJSArray(NSUserDefaults.standardUserDefaults().dictionaryRepresentation().allKeys()).map(key => String(key)).filter(key => {
    return key.indexOf('DataPopulator') > -1
  })

  keys.forEach(key => {
    NSUserDefaults.standardUserDefaults().removeObjectForKey(key)
  })

  NSUserDefaults.standardUserDefaults().synchronize()
}
