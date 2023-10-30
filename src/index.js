import { View, StyleSheet, Text, Keyboard, TextInput } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native';


const TranslateApp = () => {
    
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [fromLanguage, setFromLanguage] = useState('English'); // default
    const [toLanguage, setToLanguage] = useState('Turkish');
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);

    const API_KEY = 'your openai key'
    
    const translateText = async () => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            messages: [
              {role: 'user', content: `Translate the following ${fromLanguage} text info ${toLanguage} : "${inputText}"`},

              {role: 'assistant', content: 'translate'}
            ],
            max_tokens:200,
            model: 'gpt-4, gpt-3.5-turbo',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${API_KEY}`
            },
          }
        );
        //The translated text will be the assistant's response
        setTranslatedText(response.data.choices[0].message.content);

        // dismiss the keybord
        Keyboard.dismiss();
      } catch (error) {
        console.error('Error translating text: ', error.response.data);
      }
    }
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Translate App</Text>
      <View style={styles.dropdowncontainer}>
        <DropDownPicker
          open = {openFrom}
          value = {fromLanguage}
          setOpen = {setOpenFrom}
          setValue = {setFromLanguage}
          items={[
            {label: 'Turkish', value: 'Turkish'},
            {label: 'French', value: 'French'},
            {label: 'German', value: 'German'},
            {label: 'English', value: 'English'}
          ]}
          defaultValue={fromLanguage}
          style={styles.dropdown}
          containerStyle= {{flex:1, alignItems: 'center'}}
          onChangeItem = {(item) =>{
            setFromLanguage(item.value)
          }}
        />
        <DropDownPicker
          open = {openTo}
          value = {toLanguage}
          setOpen = {setOpenTo}
          setValue = {setToLanguage}
          items={[
            {label: 'Turkish', value: 'Turkish'},
            {label: 'French', value: 'French'},
            {label: 'German', value: 'German'},
            {label: 'English', value: 'English'}
          ]}
          defaultValue={toLanguage}
          style={styles.dropdown}
          containerStyle= {{flex:1, alignItems: 'center'}}
          onChangeItem = {(item) =>{
            setToLanguage(item.value)
          }}
        /> 
      </View>
      <TextInput
        style={styles.input}
        onChangeText={text => setInputText(text)}
        value={inputText}
        multiline
      />
      <TouchableOpacity
        style={styles.button}
        onPress={translateText}
      >
        <Text style={styles.buttonText}>Translate</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Translated Text : </Text>
      <Text style={styles.text}>{translatedText}</Text>
    </View>
  )
}

export default TranslateApp

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
   
    },
    title: {
      fontWeight: 'bold',
      fontSize: 32,
      marginBottom: 20,
      marginTop: 50,
      color: '#fff'
    },
    dropdowncontainer: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    dropdown: {
      backgroundColor: '#fff',
      width: 180,
      marginTop: 50,
      color: '#fff'
    },
    input: {
      height: 150,
      width: '100%',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#fff',
      color: '#fff',
      padding:10,
      marginTop:100
    },
    button: {
      backgroundColor: 'grey',
      width: 200,
      height:50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:50
    },
    buttonText: {
      color: '#fff',
      fontSize:20,
      fontWeight:'bold'
    },
    text: {
      color: '#fff',
      fontSize:20,
    },
  });