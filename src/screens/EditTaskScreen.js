import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MMKVLoader } from 'react-native-mmkv-storage';
const storage = new MMKVLoader().initialize();

const EditTaskScreen = ({ navigation, route }) => {
  const { taskId, taskDescription, taskTitle, isCompleted } = route.params;
  const [title, setTitle] = useState(taskTitle);
  const [description, setDescription] = useState(taskDescription);

  const handleSave = async () => {
    // Update the task and navigate back to the home screen
    const updatedTask = {
      id: taskId,
      title: title,
      description: description,
      isCompleted: isCompleted,
    };
    if(title.length && description.length){
      const data = await storage.getArrayAsync('tasks')
      const updatedTasks = data.map((task) => task.id !== updatedTask.id ? task  : updatedTask);
      await storage.setArrayAsync('tasks', updatedTasks)
  
      // Navigate back to the home screen
      navigation.goBack();
    }else{
      Alert.alert("Fill All The Fields")
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

export default EditTaskScreen;
