/*
  Visual Learning
  FlashcardController.js

  Copyright (c) 2019
*/
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid-generator';

const FLASHCARD_KEY = 'flashcards';

/*
  saveFlashcard
  @param {Object} flashcard
  @return {Promise<void>}
*/
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

/*
  readFlashcards
  @return {Promise<Object[]>}
*/
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

/*
  deleteFlashcard
  @param {string} id
  @return {Promise<void>}
*/
async function deleteFlashcard(id) {
  const flashcards = await readFlashcards();
  const result = flashcards.filter(flashcard => flashcard.id !== id);

  try {
    await AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(result));
  } catch {}
}

export default {saveFlashcard, readFlashcards, deleteFlashcard};
