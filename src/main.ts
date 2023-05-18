import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4b0W7K2UTf0dWe1uXPyJNo6LdprpK-qI",
  authDomain: "ihm---ambr.firebaseapp.com",
  projectId: "ihm---ambr",
  storageBucket: "ihm---ambr.appspot.com",
  messagingSenderId: "498497994738",
  appId: "1:498497994738:web:1576e016d6d05267cf756b",
  measurementId: "G-P6ZP34NT2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);