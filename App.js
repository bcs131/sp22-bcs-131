import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity } from 'react-native';
import QuranData from './QuranData';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const filteredSurahs = QuranData.surahNames.filter((surah) =>
    surah.english.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const headerTextStyle = darkMode ? styles.headerTextDark : styles.headerText;
  const searchInputStyle = darkMode ? styles.searchInputDark : styles.searchInput;

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.surah}>
      <Text style={styles.surahNumber}>{index + 1}</Text>
      <View style={styles.surahDetails}>
        <Text style={[styles.surahText, styles.englishText]}>{item.english}</Text>
        <Text style={[styles.surahText, styles.arabicText]}>{item.arabic}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, darkMode ? styles.darkMode : null]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, headerTextStyle]}>Quran Explorer</Text>
        <TouchableOpacity style={styles.modeButton} onPress={toggleDarkMode}>
          <Text>{darkMode ? "Light Mode" : "Dark Mode"}</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.searchInput, searchInputStyle]}
        placeholder="Search Surah"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredSurahs}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  darkMode: {
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  headerTextDark: {
    color: 'white',
  },
  modeButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  searchInputDark: {
    color: 'white',
    backgroundColor: 'darkgray',
  },
  surah: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  surahNumber: {
    color: 'white',
    marginRight: 10,
  },
  surahDetails: {
    flex: 1,
    flexDirection: 'column', 
    justifyContent: 'center',
  },
  surahText: {
    color: 'white',
  },
  englishText: {
    textAlign: 'center', 
    marginBottom: 5, 
  },
  arabicText: {
    textAlign: 'center', 
  },
});
