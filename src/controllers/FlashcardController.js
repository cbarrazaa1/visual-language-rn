import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid-generator';

const FLASHCARD_KEY = 'flashcards';

async function saveFlashcard(flashcard) {
  flashcard.id = await uuid.getRandomUUID();

  try {
    const flashcards = await AsyncStorage.getItem(FLASHCARD_KEY);
    if (flashcards == null) {
      // create flashcard
      const list = [flashcard];
      await AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(list));
    } else {
      const list = JSON.parse(flashcards);
      list.push(flashcard);
      await AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(list));
    }
  } catch {}
}

async function readFlashcards() {
  try {
    const flashcards = await AsyncStorage.getItem(FLASHCARD_KEY);
    if (flashcards == null) {
      return [];
    } else {
      return JSON.parse(flashcards);
    }
  } catch {}
}

export default {saveFlashcard, readFlashcards};
