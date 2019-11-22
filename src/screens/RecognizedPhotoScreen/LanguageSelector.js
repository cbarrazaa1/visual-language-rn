import * as React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {elevationShadowStyle} from '../../common/StylesHelper';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useState} from 'react';

const languages = {
  Inglés: 'en',
  Francés: 'fr',
  Portugués: 'pt',
};

function LanguageSelector({languages}) {
  const [selectedLanguage, setSelectedLanguage] = useState('Inglés');

  return (
    <TouchableOpacity style={styles.root}>
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
