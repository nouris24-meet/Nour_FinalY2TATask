import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Client, Account } from "appwrite";  

const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject("6770251c00164ee6df61");
const account = new Account(client); 

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();  
        console.log("User already logged in:", user);
        await account.deleteSession("current");  
      } catch (error) {
        console.log("User not logged in, proceed with login.");
      }
    };

    checkSession(); 
  }, []);

  const handleLogin = async () => {
    try {
      console.log("Attempting login...");
      const session = await account.createEmailPasswordSession(email, password);
      console.log("Session created:", session);
      Alert.alert("Success", "Logged in!");
      navigation.replace("MainApp");  
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Error", error.message || "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#a680d1"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#a680d1"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Log In" color="#6a0dad" onPress={handleLogin} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f3fc", // Light purple background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6a0dad", // Deep purple
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "90%",
    borderColor: "#b28dd9", // Light purple shade
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
    fontSize: 16,
    color: "#6a0dad",
  },
  buttonContainer: {
    marginTop: 10,
    width: "90%",
  },
  signupText: {
    marginTop: 15,
    fontSize: 16,
    color: "#6a0dad",
    textDecorationLine: "underline",
  },
});
