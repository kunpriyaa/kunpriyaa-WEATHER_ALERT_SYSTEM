// app.js
import { fetchWeatherData } from './weather.js';
import { handleSignUp } from './auth.js';
import { handleSettings } from './setting.js';

document.addEventListener('DOMContentLoaded', () => {
  fetchWeatherData();
  handleSignUp();
  handleSettings();
});






