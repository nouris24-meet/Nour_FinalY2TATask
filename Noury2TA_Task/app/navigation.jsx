import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import Index from "./index";  
import ToDoList from "./todolist";  
import Login from "./Login";
import Signup from "./Signup";
import Weather from "./weather";  

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#f4511e",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Index}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="To Do List"
        component={ToDoList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      {/* Add the Weather screen as a tab */}
      <Tab.Screen
        name="Weather"
        component={Weather} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cloud" size={size} color={color} />  
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <Stack.Navigator>
      {/* Authentication Screens */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerTitle: "Sign Up" }}
      />
      {/* Main App */}
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
