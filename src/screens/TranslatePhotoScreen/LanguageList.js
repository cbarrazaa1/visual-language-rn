/*
  Visual Learning
  LanguageList.js

  Copyright (c) 2019
*/
import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ColorPalette from '../../common/ColorPalette';
import {useState} from 'react';

/*
  TranslatePhotoScreenView
  React Functional Component

  Serves as a list of available languages.

  Props: {
    languages: string[],
    currentSelectedLanguage: string,
    onSelectLanguage: (language: string) => void
  }
  State: {
    selectedLanguage: string
  }
*/
function LanguageList({languages, currentSelectedLanguage, onSelectLanguage}) {
  const [selectedLanguage, setSelectedLanguage] = useState(
    currentSelectedLanguage,
  );

  const onRowPress = language => {
    setSelectedLanguage(language);
    onSelectLanguage(language);
  };

  return (
    <View style={styles.containerRoot}>
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.rootContent}>
        {languages.map((language, i) => {
          const icon =
            language === selectedLanguage
              ? 'md-radio-button-on'
              : 'md-radio-button-off';
          const tint =
            language === selectedLanguage ? ColorPalette.PRIMARY : '#000000';

          return (
            <React.Fragment key={i}>
              <TouchableOpacity
                style={styles.row}
                onPress={() => onRowPress(language)}>
                <Text style={styles.languageLabel}>{language}</Text>
                <Ionicon name={icon} size={20} color={tint} />
              </TouchableOpacity>
              <View style={styles.separator} />
            </React.Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerRoot: {
    flex: 1,
  },
  root: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
  },
  rootContent: {
    flexGrow: 1,
  },
  row: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e0e0e0',
  },
  languageLabel: {
    fontSize: 16,
  },
});

export default React.memo(LanguageList);
