import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function TabOneScreen() {
  const [tasks, setTasks] = useState<
    { id: string; text: string; done: boolean }[]
  >([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('TASKS', JSON.stringify(tasks));
    } catch (e) {
      console.log('Error saving tasks:', e);
    }
  };

  const loadTasks = async () => {
    try {
      const saved = await AsyncStorage.getItem('TASKS');
      if (saved) {
        setTasks(JSON.parse(saved));
      }
    } catch (e) {
      console.log('Error loading tasks:', e);
    }
  };

  const addTask = () => {
    if (input.trim() === '') return;

    const newTask = {
      id: Date.now().toString(),
      text: input,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => toggleTask(item.id)}
      style={{
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#ccc',
      }}
    >
      <Text
        style={{
          textDecorationLine: item.done ? 'line-through' : 'none',
          color: item.done ? '#777' : '#000',
        }}
      >
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View 
      style={{ 
        flex: 1, 
        padding: 16, 
        paddingTop: 50,   // tiputettu otsikko jne alaspäin, jotta skaalautuu paremmin
        backgroundColor: '#fff' 
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Todo List
      </Text>

      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            padding: 8,
            borderRadius: 4,
            borderColor: '#aaa',
          }}
          placeholder="Add new task"
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity
          onPress={addTask}
          style={{
            marginLeft: 8,
            backgroundColor: '#007bff',
            paddingHorizontal: 16,
            justifyContent: 'center',
            borderRadius: 4,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={tasks} 
        keyExtractor={item => item.id} 
        renderItem={renderItem} 
      />
    </View>
  );
}
