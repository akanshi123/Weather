// 1. This section imports the necessary dependencies for the component
import React from "react"; // This line imports the React Library which is the foundation for building user interfaces
import { MainWrapper } from "./weather.module"; // MainWrapper is a styled Component imported from weather.module
//These icon components are imported from react-icons
//These are used to display different whether conditions
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
} from "react-icons/bs";
import { RiLoaderFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
//This line imports the axios library used for making HTTP requests
import axios from "axios";

// Defining the Component
//WeatherDataProps interface defines the shape of the weather data object that will be used in the component
interface WeatherDataProps {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}
// This section defines the DisplayWeather Component as a functional Component
const DisplayWeather = () => {
  // This section sets up the API Key and endpoint using environmental variables
  const api_Key = "0c830eb0ac05ad526f566ebd255dbce3";
  const api_EndPoint = "http://api.openweathermap.org/data/2.5/";
  const [weatherData, setWeatherData] = React.useState<WeatherDataProps | null>(
    null
  ); // weatherData: stores the weather data object
  //This lines sets up a state variable called weatherData using the React.useState hook .The initial value of this state is null

  const [isLoading, setIsLoading] = React.useState(false); // isloading: stores a boolean indicating whether the data is loading
  const [searchCity, setSearchCity] = React.useState(""); //searchCity: stores the search query for the city

  // fetchCurrentWeather function fetches the current weather data for a given location
  const fetchCurrentWeather = React.useCallback(
    async (lat: number, lon: number) => {
      const url = `${api_EndPoint}weather?lat=${lat}&lon=${lon}&appid=${api_Key}&units=metric`;
      const response = await axios.get(url);
      return response.data;
    },
    [api_EndPoint, api_Key]
  );

  // fetchWeatherData fetches the weather data for a given city
  const fetchWeatherData = async (city: string) => {
    try {
      const url = `${api_EndPoint}weather?q=${city}&appid=${api_Key}&units=metric`;
      const searchResponse = await axios.get(url);
      const currentWeatherData: WeatherDataProps = searchResponse.data;
      return { currentWeatherData };
    } catch (error) {
      throw error;
    }
  };
  // handleSearch function handles the search query and updates the state with new weather data
  const handleSearch = async () => {
    if (searchCity.trim() === "") {
      return;
    }
    try {
      const { currentWeatherData } = await fetchWeatherData(searchCity);
      setWeatherData(currentWeatherData);
    } catch (error) {}
  };

  // iconChanger returns an icon based on the weather condition
  const iconChanger = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconElement = <BsFillCloudRainFill />;
        iconColor = "#272829";
        break;

      case "Clear":
        iconElement = <BsFillSunFill />;
        iconColor = "#FFC436";
        break;
      case "Clouds":
        iconElement = <BsCloudyFill />;
        iconColor = "#102C57";
        break;

      case "Mist":
        iconElement = <BsCloudFog2Fill />;
        iconColor = "#279EFF";
        break;
      default:
        iconElement = <TiWeatherPartlySunny />;
        iconColor = "#7B2869";
    }

    return (
      <span className="icon" style={{ color: iconColor }}>
        {iconElement}
      </span>
    );
  };

  //This section uses the React.useEffect hook to fetch the current weather data when the component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const [currentWeather] = await Promise.all([
          fetchCurrentWeather(latitude, longitude),
        ]);
        setWeatherData(currentWeather);
        setIsLoading(true);
      });
    };
    fetchData();
  }, [fetchCurrentWeather]);

  return (
    <MainWrapper>
      <div className="container">
        <div className="searchArea">
          <input
            type="text"
            placeholder="Enter City Name"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />

          <div className="searchCircle">
            <AiOutlineSearch className="searchIcon" onClick={handleSearch} />
          </div>
        </div>
        {weatherData && isLoading ? (
          <>
            <div className="weatherArea">
              <h1>{weatherData.name}</h1>
              <span>{weatherData.sys.country}</span>
              <div className="icon">
                {iconChanger(weatherData.weather[0].main)}
              </div>
              <h1>{weatherData.main.temp.toFixed(0)}°C</h1>
              <h2>{weatherData.weather[0].main}</h2>
            </div>

            <div className="bottomInfoArea">
              <div className="humidityLevel">
                <WiHumidity className="windIcon" />
                <div className="humidInfo">
                  <h1>{weatherData.main.humidity}%</h1>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="wind">
                <FiWind className="windIcon" />
                <div className="humidInfo">
                  <h1>{weatherData.wind.speed}km/h</h1>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="loading">
            <RiLoaderFill className="loadingIcon" />
            <p>Loading</p>
          </div>
        )}
      </div>
    </MainWrapper>
  );
};

export default DisplayWeather;
