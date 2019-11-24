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

function speak(text, language) {
  tts.stop();
  tts.setDefaultLanguage(languages[language]);
  tts.speak(text);
}

export default {
  speak,
};
