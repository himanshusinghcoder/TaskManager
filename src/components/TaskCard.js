import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskCard = ({ title, isCompleted, onToggle, onDelete, onEdit }) => {
  return (
    <View style={{...styles.card, backgroundColor: isCompleted ? "lightgreen" : "white"}}>
      <View style={styles.touchable}>
        <Text style={[styles.title, { textDecorationLine: isCompleted ? 'line-through' : 'none' }]}>
          {title}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={onToggle} style={[styles.actionButton, styles.toggleButton, { backgroundColor: isCompleted ? 'lightgray' : 'green' }]}>
          <Text style={styles.buttonText}>
            {isCompleted ? 'Undo' : 'Done'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit} style={[styles.actionButton, styles.editButton]}>
          <Text style={styles.buttonText}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={[styles.actionButton, styles.deleteButton]}>
          <Text style={styles.buttonText}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  touchable: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  toggleButton: {
    backgroundColor: 'green',
  },
  editButton: {
    backgroundColor: 'blue',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TaskCard;
