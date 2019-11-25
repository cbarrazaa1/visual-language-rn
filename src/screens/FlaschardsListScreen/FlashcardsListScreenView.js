import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {elevationShadowStyle} from '../../common/StylesHelper';
import ColorPalette from '../../common/ColorPalette';
import {useNavigation} from 'react-navigation-hooks';
import Flashcard from './Flashcard';
import {useEffect, useState} from 'react';
import FlashcardController from '../../controllers/FlashcardController';
import BottomDrawer from '../../common/components/BottomDrawer';

function FlashcardsListView() {
  // Flashcard List Screen View Controller //
  const navigation = useNavigation();
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    async function getFlashcards() {
      setFlashcards(await FlashcardController.readFlashcards());
    }
    getFlashcards();

    navigation.addListener('didFocus', () => {
      getFlashcards();
    });
  }, [navigation]);

  const onFlashcardDelete = async id => {
    await FlashcardController.deleteFlashcard(id);
    setFlashcards(prev => prev.filter(flashcard => flashcard.id !== id));
    BottomDrawer.hide();
  };

  // Flashcard List Screen View //
  return (
    <FlatList
      style={styles.root}
      contentContainerStyle={styles.rootContent}
      data={flashcards}
      renderItem={({item}) => (
        <Flashcard
          id={item.id}
          text={item.text}
          language={item.language}
          uri={item.uri}
          translatedText={item.translatedText}
          onDelete={onFlashcardDelete}
        />
      )}
    />
  );
}

FlashcardsListView.navigationOptions = {
  title: 'Flashcards',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ColorPalette.BACKGROUND,
  },
  rootContent: {
    alignItems: 'center',
  },
});

export default FlashcardsListView;
