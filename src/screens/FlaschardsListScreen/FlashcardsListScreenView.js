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
  const navigation = useNavigation();
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    async function getFlashcards() {
      setFlashcards(await FlashcardController.readFlashcards());
    }
    getFlashcards();
  }, []);

  const onFlashcardDelete = async id => {
    await FlashcardController.deleteFlashcard(id);
    setFlashcards(prev => prev.filter(flashcard => flashcard.id !== id));
    BottomDrawer.hide();
  };

  return (
    <FlatList
      style={styles.root}
      contentContainerStyle={styles.rootContent}
      data={flashcards}
      renderItem={({item}) => (
        <Flashcard
          id={item.id}
          title={item.text}
          lang={item.language}
          uri={item.uri}
          trad={item.translatedText}
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
