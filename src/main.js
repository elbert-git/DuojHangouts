import './app.css'
import App from './App.svelte'
import DataManager from './modules/dataManager'

// --- start data manager
const isDevelopment = true;
// const baseUrl = "http://localhost:8000/hangouts" // local server
const baseUrl = "http://192.53.113.254:3535/hangouts"
DataManager.init(isDevelopment, baseUrl);

// --- start svelte
const app = new App({
  target: document.getElementById('app'),
})

export default app
