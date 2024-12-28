import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import account from "./appwrite"; 
import { useRouter } from "expo-router"; 

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();  

  const handleSignup = async () => {
    try {
      await account.create("unique()", email, password);  
      const session = await account.createEmailPasswordSession(email, password);
    //   console.log("Session created:", session);
    //   Alert.alert("Success", "Account created successfully!");
      navigation.replace("MainApp");  
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
        placeholder="Create a password"
        placeholderTextColor="#a680d1"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" color="#6a0dad" onPress={handleSignup} />
      </View>
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
