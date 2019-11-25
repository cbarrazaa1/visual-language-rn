/*
  Visual Learning
  GoogleAPIController.js

  Copyright (c) 2019
*/
const API_KEY = 'AIzaSyB4mukqS9G8DRFjaCuE6o1hXfl8NrTyrRY';

/*
  getLanguages
  @return {Promise<string[]>}
*/
async function getLanguages() {
  const url = `https://translation.googleapis.com/language/translate/v2/languages?key=${API_KEY}&target=es`;
  const response = await fetch(url, {
    method: 'GET',
  });
  const json = await response.json();
  return json.data.languages;
}

/*
  getTranslationForText
  @param {string} text
  @param {string} language
  @return {Promise<string>}
*/
async function getTranslationForText(text, language) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&q=${text}&source=es&target=${language}`;
  const response = await fetch(url, {
    method: 'GET',
  });
  const json = await response.json();
  console.log(json);
  return json.data.translations[0].translatedText;
}

export default {
  getLanguages,
  getTranslationForText,
};
