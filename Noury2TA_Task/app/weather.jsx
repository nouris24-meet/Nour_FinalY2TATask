import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [citiesList, setCitiesList] = useState(["New York", "Nazareth", "Chicago", "London", "Rome","Tokyo", "Jerusalem"]);

  const API_KEY = "a70636df12890ae2d7870c58dd0ddaf0";  
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: "metric", 
        },
      });
      setWeatherData(response.data);
    } catch (err) {
      setError("City not found");
    }
    setLoading(false);
  };

  const handleCityChange = (text) => {
    setCity(text);
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
      setCity(""); 
    }
  };

  const handleCityClick = (cityName) => {
    fetchWeather(cityName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Information</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={handleCityChange}
        placeholder="Enter city name"
      />
      <Button title="Search" onPress={handleSearch} />


      {error && <Text style={styles.error}>{error}</Text>}


      <FlatList
        data={citiesList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCityClick(item)} style={styles.cityItem}>
            <Text style={styles.cityText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.cityList}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#f4511e" />
      ) : weatherData ? (
        <View style={styles.weatherInfo}>
          <Text style={styles.cityName}>{weatherData.name}, {weatherData.sys.country}</Text>
          <Text style={styles.weatherDescription}>{weatherData.weather[0].description}</Text>
          <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
          <Text style={styles.details}>Humidity: {weatherData.main.humidity}%</Text>
          <Text style={styles.details}>Wind Speed: {weatherData.wind.speed} m/s</Text>
        </View>
      ) : (
        <Text style={styles.placeholder}>Enter a city to get weather data, not limited to the list above!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cityList: {
    marginTop: 20,
    width: "100%",
  },
  cityItem: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cityText: {
    fontSize: 18,
    color: "#333",
  },
  weatherInfo: {
    marginTop: 20,
    alignItems: "center",
  },
  cityName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  weatherDescription: {
    fontSize: 18,
    color: "#555",
  },
  temp: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#f4511e",
    marginTop: 10,
  },
  details: {
    fontSize: 18,
    color: "#555",
    marginTop: 5,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  placeholder: {
    fontSize: 18,
    color: "#888",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Weather;
