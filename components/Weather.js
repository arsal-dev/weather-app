import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, ImageBackground } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { clear_day, clear_night, cloud_day, cloud_night, haze_day, haze_night, rain_day, rain_night, snow_day, snow_night } from "../assets/backgrounds/index";

const API_KEY = '1e6db11e86fd080628cea5a0121e4814';

const Weather = (props) => {
    
    const [ weatherData, setWeatherData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ icon, setIcon ] = useState('');
    const [ background, setBackground ] = useState('');
    
    async function getWeatherData(cityName){
        setLoading(true)
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
        let res = await fetch(API);
        if(res.status == 200){
            res = await res.json();
            setWeatherData(res);
        }
        else {
            setWeatherData(null);
        }
        setLoading(false)
    }

    useEffect(() => {
        // console.log(weatherData);
        const iconObj = {
            snow: <FontAwesome name="snowflake-o" size={48} color="white" />,
            clear: <Ionicons name="sunny" size={48} color="white" />,
            rain: <Ionicons name="rainy" size={48} color="white" />,
            haze: <Fontisto name="day-haze" size={48} color="white" />,
            cloud: <Ionicons name="cloudy" size={48} color="white" />
        }
        if(weatherData != null){

            const now = new Date();
            const sunrise = new Date(weatherData.sys.sunrise * 1000);
            const sunset = new Date(weatherData.sys.sunset * 1000);
            const isDaytime = now > sunrise && now < sunset;

            switch (weatherData.weather[0].main){
                case 'Clouds':
                    setIcon(iconObj.cloud);
                    isDaytime ? setBackground(cloud_day) : setBackground(cloud_night);
                    break;
                case 'Snow':
                    setIcon(iconObj.snow);
                    isDaytime ? setBackground(cloud_day) : setBackground(cloud_night);
                    break;
                case 'Clear':
                    setIcon(iconObj.clear);
                    isDaytime ? setBackground(clear_day) : setBackground(clear_night);
                    break;
                case 'Rain':
                    setIcon(iconObj.rain);
                    isDaytime ? setBackground(rain_day) : setBackground(rain_night);
                    break;
                case 'Haze':
                    setIcon(iconObj.haze);
                    isDaytime ? setBackground(haze_day) : setBackground(haze_night);
                    break;
                default:
                    setIcon(iconObj.haze);
                    isDaytime ? setBackground(haze_day) : setBackground(haze_night);
            }
            props.background(background);
        }
    }, [weatherData]);

    useEffect(() => {
        if(props.cityName !== '') {
            getWeatherData(props.cityName);
        }
    }, [props.cityName])

    if(loading){
        return (
            <ActivityIndicator size='large' />
        )
    }
    else if(weatherData == null){
        return (
            <View>
                <Text style={{ marginTop: 20, fontSize: 24, textAlign: 'center' }}>Enter City Name</Text>
            </View>
        );
    }
    else {
        return ( 
            <View>
                <View style={styles.background}></View>
                <Text style={styles.deg}>{weatherData.wind.deg}°</Text>
                <Text style={styles.cityName}>{weatherData.name}</Text>
                <View style={styles.icon}>
                    <View style={styles.temp}>
                        <Text style={{ color: 'white' }}>Humidity: {weatherData.main.humidity}</Text>
                        <Text style={{ color: 'white' }}>temp: {weatherData.main.temp}</Text>
                    </View>
                    <View>
                        <Text>{icon}</Text>
                    </View>
                </View>
            </View>
         );
    }

}
 
export default Weather;

const styles = StyleSheet.create({
    deg: {
        fontSize: 80,
        textAlign: 'center',
        marginTop: '50%',
        color: 'white'
    },
    cityName: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    },
    icon: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: Dimensions.get('screen').width -50,
        alignItems: 'center',
        height: '50%'
    },
    temp: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 5,
    },
    background: {
        width: '80%',
        height: 150,
        backgroundColor: 'black',
        position: "absolute",
        top: '25%',
        left: 10,
        borderRadius: 5,
        opacity: .5
    }
});
