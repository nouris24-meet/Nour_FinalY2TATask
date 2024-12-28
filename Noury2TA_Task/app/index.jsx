import { View, Text, Button,Alert, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; 
import account from "./appwrite"; 
import React, {useEffect } from "react";

export default function Index() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const user = await account.get();  // Get the current user
      await account.deleteSession("current");  
      Alert.alert("Success", "Logged out successfully!");
      router.push("/Login");} 
    catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Error", error.message || "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative", 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logoutButton: {
    position: "absolute",
    top: 20, 
    right: 20, 
    backgroundColor: "#6a0dad",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 5, 
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
