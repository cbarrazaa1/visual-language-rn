import AsyncStorage from '@react-native-community/async-storage';

const PRACTICE_TIME_KEY = 'PRACTICE_TIME';
const NEW_FLASHCARDS_KEY = 'NEW_FLASHCARDS';

async function addPracticeTime(minutes) {
  try {
    let currentPracticeTime = Number(
      await AsyncStorage.getItem(PRACTICE_TIME_KEY),
    );

    if (currentPracticeTime != null) {
      currentPracticeTime += minutes;
    } else {
      currentPracticeTime = minutes;
    }

    await AsyncStorage.setItem(PRACTICE_TIME_KEY, String(currentPracticeTime));
  } catch {}
}

async function getPracticeTime() {
  let time = 0;

  try {
    time = await AsyncStorage.getItem(PRACTICE_TIME_KEY);
  } catch {
    time = 0;
  } finally {
    return Number(time);
  }
}

async function addNewFlashcard(count) {
  try {
    let currentFlashcardCount = Number(
      await AsyncStorage.getItem(NEW_FLASHCARDS_KEY),
    );

    if (currentFlashcardCount != null) {
      currentFlashcardCount += count;
    } else {
      currentFlashcardCount = count;
    }

    await AsyncStorage.setItem(
      NEW_FLASHCARDS_KEY,
      String(currentFlashcardCount),
    );
  } catch {}
}

async function getNewFlashcardCount() {
  let count = 0;

  try {
    count = await AsyncStorage.getItem(NEW_FLASHCARDS_KEY);
  } catch {
    count = 0;
  } finally {
    return Number(count);
  }
}

export default {
  addPracticeTime,
  getPracticeTime,
  addNewFlashcard,
  getNewFlashcardCount,
};
