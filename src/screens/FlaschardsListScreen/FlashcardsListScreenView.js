import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {elevationShadowStyle} from '../../common/StylesHelper';
import ColorPalette from '../../common/ColorPalette';
import {useNavigation} from 'react-navigation-hooks';
import Flashcard from './Flashcard';

const puppy =
  'https://img.maximummedia.ie/joe_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE5XFxcLzAzXFxcLzI3MjAzMDI2XFxcL2lTdG9jay01MjE2OTc0NTMuanBnXCIsXCJ3aWR0aFwiOjY0MCxcImhlaWdodFwiOjM2MCxcImRlZmF1bHRcIjpcImh0dHBzOlxcXC9cXFwvd3d3LmpvZS5pZVxcXC9hc3NldHNcXFwvaW1hZ2VzXFxcL2pvZVxcXC9uby1pbWFnZS5wbmc_aWQ9MjY0YTJkYmUzNzBmMmM2NzVmY2RcIixcIm9wdGlvbnNcIjpbXX0iLCJoYXNoIjoiNGIxNWM5OWEwOGI0NmI1ZGZiNDYzODA1MTM3MTAyNGNmZjNkMDc2NCJ9/istock-521697453.jpg';

const camel = 'https://secretldn.com/wp-content/uploads/2018/03/Animals-5.jpg';

function FlashcardsListView() {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          data={[{title: 'puppy', trad: 'cacho', lang: 'eng', uri: puppy}]}
          renderItem={({item}) => (
            <Flashcard
              title={item.title}
              lang={item.lang}
              uri={item.uri}
              trad={item.trad}
            />
          )}
        />
      </View>
    </View>
  );
}

FlashcardsListView.navigationOptions = {
  title: 'Flashcards',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ColorPalette.BACKGROUND,
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});

export default FlashcardsListView;
