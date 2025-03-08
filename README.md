Weather App 🌤️

This is a React + TypeScript weather application that fetches real-time weather data using the OpenWeather API. Users can search for a city to see current weather conditions, including temperature, humidity, and wind speed. The app also fetches the user's current location weather automatically.


---

Features 🚀

🌎 Fetch weather by city name or current location

🌡️ Displays temperature, humidity, and wind speed

🎨 Weather icons change based on conditions

⚡ Uses React hooks (useState, useEffect, useCallback)

🔥 Built with TypeScript for better type safety



---

Technologies Used 🛠️

React ⚛️

TypeScript 📜

Axios 🔄 (for API calls)

React Icons 🎨

CSS Modules 💅



---

Installation & Setup 💻

1️⃣ Clone the Repository:

git clone https://github.com/your-username/weather-app.git
cd weather-app

2️⃣ Install Dependencies:

npm install

3️⃣ Start the App:

npm start


---

Usage 🏗️

Enter a city name in the search bar and click the search icon 🔍.

The app will fetch weather details for the entered city.

If location access is granted, the app will automatically fetch your current weather.



---

Folder Structure 📂

/weather-app
│── src/
│   ├── components/
│   │   ├── DisplayWeather.tsx  # Main Weather Component
│   |   ├── weather.module.css   # CSS Styles
│   │ 
│   ├── App.tsx
│   ├── index.tsx
│   ├── App.css
|
│── package.json
│── README.md


---

API Reference 📡

This app uses the OpenWeather API to fetch real-time weather data.

🔗 API Documentation: OpenWeather

Example API Call:

https://api.openweathermap.org/data/2.5/weather?q=city&appid=YOUR_API_KEY&units=metric


---

Future Improvements 🔮

🌎 5-day weather forecast

🎨 Dark mode theme

📍 Search suggestions for cities

📱 Mobile responsiveness improvements



---

Contributing 🤝

Feel free to fork this repository, make improvements, and submit a pull request!


---




---

⭐ If you like this project, give it a star! ⭐
