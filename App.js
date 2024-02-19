import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './screens/HomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        cardStyle: {
            backgroundColor: "grey"
        }
      }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen title={"Create Task"} name="CreateTaskScreen" component={CreateTaskScreen} />
        <Stack.Screen title={"Edit Task"} name="EditTaskScreen" component={EditTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
