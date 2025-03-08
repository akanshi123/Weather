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
  const [error, setError] = React.useState("");

  // fetchCurrentWeather function fetches the current weather data for a given location
  const fetchCurrentWeather = React.useCallback(
    //useCallback hook is used to memoize the function , so its not recreated on every render
    async (lat: number, lon: number) => {
      // async function returns a promise
      const url = `${api_EndPoint}weather?lat=${lat}&lon=${lon}&appid=${api_Key}&units=metric`; // This line constructs a url by concatenating these
      const response = await axios.get(url); // Sends s GET request to the constructed URL using axios library
      return response.data; // Returns the data from the API response
    }, // Closes the callback hook
    [api_EndPoint, api_Key] // specify the dependencies, recreated if either of these values change
  );

  // fetchWeatherData fetches the weather data for a given city
  const fetchWeatherData = async (city: string) => {
    try {
      const url = `${api_EndPoint}weather?q=${city}&appid=${api_Key}&units=metric`;
      const searchResponse = await axios.get(url);
      const currentWeatherData: WeatherDataProps = searchResponse.data;
      return { currentWeatherData }; // Returns the extracted weather data
    } catch (error) {
      // catch block is used to handle any errors that might be thrown ina try block
      throw error;
    }
  }; // Closes the fetchWeatherData function
  // handleSearch function handles the search query and updates the state with new weather data
  const handleSearch = async () => {
    if (searchCity.trim() === "") {
      // checks any whitespace characters and removed
      return;
    }
    try {
      const { currentWeatherData } = await fetchWeatherData(searchCity);
      setWeatherData(currentWeatherData); // Updates the weatherData state variable passes the currentWeatherData object as an argument
    } catch (error) {
      console.error(error);
      setError("Invalid City");
    }
  }; // Closes the handleSearch function definition

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
        // get the current geolocation of the user
        const { latitude, longitude } = position.coords; // extracts the lat and lon properties from the position.coords object
        const [currentWeather] = await Promise.all([
          fetchCurrentWeather(latitude, longitude),
        ]);
        setWeatherData(currentWeather); // updates the weatherData state variable
        setIsLoading(true); // updates isLoading state variable
      }); // ends the callBack function passed to getCuurentPosition
    };
    fetchData(); // Calls the fetchData function to execute it
  }, [fetchCurrentWeather]); // specify the dependency array that means rerun whenever the function changes

  return (
    <MainWrapper>
      <div className="container">
        <div className="searchArea">
          <input //Text input Element
            type="text"
            placeholder="Enter A Valid City Name" // Hint
            value={searchCity} // input value will display the current value of the searchCity
            onChange={(e) => setSearchCity(e.target.value)}
            // updates the state variable whenever the user types something in the input field
          />

          <div className="searchCircle">
            <AiOutlineSearch
              className="searchIcon"
              onClick={handleSearch} //When the user clicks on the icon, the handleSearch function will be called
            />
          </div>
        </div>

        {weatherData && isLoading ? ( // uses Ternary operator either a weatherData or loading
          //render Weather data
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
          // Render Loading indicator
          <div className="loading">
            <RiLoaderFill className="loadingIcon" />
            <p>Loading</p>
          </div>
        )}
      </div>

      {error && (
        <p style={{ color: "red", fontSize: "2rem", fontWeight: "bolder" }}>
          {error}
        </p>
      )}
    </MainWrapper>
  );
};
// Exports the DisplayWeather component as the default export of the module
export default DisplayWeather;
