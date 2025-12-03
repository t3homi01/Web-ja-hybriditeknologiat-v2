import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useTodos from '../../hooks/useTodos'; // HUOM: polku oikein!

export default function TabOneScreen() {
  const { tasks, addTask, removeTask } = useTodos();
  const [text, setText] = useState('');

  const renderItem = ({ item }: { item: { id: string; text: string } }) => (
    <TouchableOpacity
      onPress={() => removeTask(item.id)}
      style={{
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#444',
      }}
    >
      <Text style={{ color: 'white' }}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        paddingTop: 70,      // iphonen skaalausta varten tiputettu tekstit 
        backgroundColor: '#222', // Tumma tausta
      }}
    >

      
      <Text
  style={{
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  }}
>
  Simple Todo
</Text>


      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            borderColor: '#888',
            backgroundColor: '#333',
            color: 'white', // Valkoinen teksti
          }}
          placeholder="Add task"
          placeholderTextColor="#aaa"
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity
          onPress={() => {
            if (text.trim() !== '') {
              addTask(text);
              setText('');
            }
          }}
          style={{
            marginLeft: 10,
            backgroundColor: '#007bff',
            paddingHorizontal: 18,
            borderRadius: 5,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
