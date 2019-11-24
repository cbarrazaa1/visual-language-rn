import * as React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {elevationShadowStyle} from '../../common/StylesHelper';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useState} from 'react';
import BottomDrawer from '../../common/components/BottomDrawer';
import LanguageList from './LanguageList';

const languages = {
  Inglés: 'en',
  Francés: 'fr',
  Alemán: 'de',
  Italiano: 'it',
  Portugués: 'pt',
  Chino: 'zh',
  Japonés: 'ja',
  Coreano: 'ko',
  Hindú: 'hi',
};

function LanguageSelector({onLanguageChange}) {
  const [selectedLanguage, setSelectedLanguage] = useState('Inglés');

  const onSelectLanguage = language => {
    setSelectedLanguage(language);
    onLanguageChange(languages[language]);
  };

  const onPress = () => {
    BottomDrawer.show({
      title: 'Seleccionar Idioma',
      content: (
        <LanguageList
          languages={Object.keys(languages)}
          currentSelectedLanguage={selectedLanguage}
          onSelectLanguage={language => onSelectLanguage(language)}
        />
      ),
      offsetY: 100,
    });
  };

  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Text style={styles.text}>{selectedLanguage}</Text>
      <EntypoIcon name="chevron-down" size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '70%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    ...elevationShadowStyle(2),
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    marginVertical: 4,
    fontSize: 16,
  },
});

export default React.memo(LanguageSelector);
