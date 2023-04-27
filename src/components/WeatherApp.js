import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const city = 'Hanoi';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c9226d55a93eb6985f8f6223da01e87f&units=metric`);
                setWeatherData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [city]);

    const getWeatherIcon = (weatherDescription) => {
        switch (weatherDescription) {
            case 'Clear':
                return <Icon name="ios-sunny-sharp" size={60} color="#FCE38A" />;
            case 'Clouds':
                return <Icon name="cloud" size={60} color="#F9F7F7" />;
            case 'Rain':
                return <Icon name="ios-rainy" size={60} color="#3F72AF" />;
            case 'Thunderstorm':
                return <Icon name="ios-thunderstorm-sharp" size={60} color="#0F4C75" />;
            case 'Snow':
                return <Icon name="ios-snow" size={60} color="#F5F5F5" />;
            default:
                return <Icon name="help-outline" size={60} color="#393E46" />;
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <View style={styles.left}>
                        <Text style={styles.temperature}>{Math.round(weatherData.main.temp)}°C</Text>
                        <Text style={styles.cityName}>{city}</Text>
                    </View>
                    <View style={styles.right}>
                        {getWeatherIcon(weatherData.weather[0].main)}
                        <Text style={styles.description}>{weatherData.weather[0].description}</Text>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 0,
        backgroundColor: '#00ADB5',
        width: '85%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        marginTop: 10,
    },

    left: {
        marginRight: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },

    right: {
        marginLeft: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    temperature: {
        fontSize: 60,
        fontWeight: '400',
        color: '#EEEEEE',
    },
    description: {
        fontSize: 15,
        color: '#EEEEEE',
    },

    cityName: {
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 20,
        color: '#EEEEEE',
    },
});

export default WeatherApp;
