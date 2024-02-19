import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MMKVLoader } from 'react-native-mmkv-storage';
const storage = new MMKVLoader().initialize();

const CreateTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const saveTaskToMMKV = async (task) => {
    try {
      await storage.setArrayAsync('tasks', task);
      // If the task saved successfully, navigate back to the home screen
      navigation.goBack();
    } catch (error) {
      console.error('Error saving task to MMKV:', error);
    }
  };

  const handleSave = async () => {
    const newTask = {
      id: Math.random().toString(),
      title,
      description,
      isCompleted: false,
    };
    if(title.length && description.length){
      const data = await storage.getArrayAsync('tasks')
      if(data){
        data.push(newTask)
        saveTaskToMMKV(data);
      }else{
        saveTaskToMMKV([newTask]);
      }
    }else{
      Alert.alert("Fill All The Field")
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Task Title"
        placeholderTextColor={"darkgray"}
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Task Description"
        placeholderTextColor={"darkgray"}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    color: "#000"
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreateTaskScreen;
