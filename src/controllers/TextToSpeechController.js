/*
  Visual Learning
  TextToSpeechController.js

  Copyright (c) 2019
*/
import tts from 'react-native-tts';

const languages = {
  Inglés: 'en-US',
  Francés: 'fr-FR',
  Alemán: 'de-DE',
  Italiano: 'it-IT',
  Portugués: 'pt-BR',
  Chino: 'zh-CN',
  Japonés: 'ja-JP',
  Coreano: 'ko-KR',
  Hindú: 'hi-IN',
};

/*
  speak
  @param {string} text
  @param {string} language
  @return {void}
*/
function speak(text, language) {
  tts.stop();
  tts.setDefaultLanguage(languages[language]);
  tts.speak(text);
}

/*
  convertLanguageToLocale
  @param {string} language
  @return {string}
*/
function convertLanguageToLocale(language) {
  return languages[language];
}

export default {
  speak,
  convertLanguageToLocale,
};
