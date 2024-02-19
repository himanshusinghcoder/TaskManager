import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import TaskCard from '../components/TaskCard';
import { MMKVLoader } from 'react-native-mmkv-storage';
import { useNavigation } from '@react-navigation/native';

const storage = new MMKVLoader().initialize();

// Function to get the current date and time
const getCurrentDateAndTime = () => {
    const date = new Date();
    return {
        currentDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        currentTime: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    };
};

// Home screen component
const HomeScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const { addListener, removeListener } = useNavigation();

    // Fetch tasks on focus
    useEffect(() => {
        const onFocus = () => {
            fetchTask();
        };

        const unsubscribeFocus = addListener('focus', onFocus);
        fetchTask(); // Fetch tasks when component mounts
        return () => {
            unsubscribeFocus();
        };
    }, []);

    const fetchTask = async () => {
        const data = await storage.getArrayAsync('tasks')
        if (data) {
            setTasks(data);
        }
    }

    // Update tasks when navigating back from another screen
    useEffect(() => {
        const onReturn = () => {
            fetchTask();
        };

        const unsubscribeReturn = addListener('blur', onReturn);
        return () => {
            unsubscribeReturn();
        };
    }, [tasks]);

    const setData = async (data) => {
        setTasks(data)
        await storage.setArrayAsync('tasks', data);
    }

    return (
        <View style={styles.container}>
            {/* Display current date and time */}
            <View style={styles.datetimeContainer}>
                <Text style={styles.datetimeText}>Date: {getCurrentDateAndTime().currentDate}</Text>
                <Text style={styles.datetimeText}>Time: {getCurrentDateAndTime().currentTime}</Text>
            </View>

            {/* Display task cards */}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TaskCard
                        title={item.title}
                        isCompleted={item.isCompleted}
                        onToggle={() => {
                            // Toggle task completion
                            const updatedTasks = tasks.map((task) => {
                                if (task.id === item.id) {
                                    return { ...task, isCompleted: !task.isCompleted };
                                }
                                return task;
                            });
                            setData(updatedTasks);
                        }}
                        onDelete={() => {
                            // Delete task
                            const updatedTasks = tasks.filter((task) => task.id !== item.id);
                            setData(updatedTasks);
                        }}
                        onEdit={() => {
                            // Navigate to task detail screen
                            navigation.navigate('EditTaskScreen', { taskId: item.id, taskTitle: item.title, taskDescription: item.description, isCompleted: item.isCompleted });
                        }}

                    />
                )}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text>No tasks yet</Text>
                    </View>
                )}
            />

            {/* Create Task button */}
            <TouchableOpacity
                style={styles.createTaskButton}
                onPress={() => navigation.navigate('CreateTaskScreen')}
            >
                <Text style={styles.createTaskButtonText}>Create Task</Text>
            </TouchableOpacity>
        </View>
    );
};

// Navigation stack for HomeScreen, CreateTaskScreen, and EditTaskScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    datetimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    datetimeText: {
        fontSize: 16,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    createTaskButton: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    createTaskButtonText: {
        fontSize: 16,
        color: 'white',
    },
});

export default HomeScreen;
