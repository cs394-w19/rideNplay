### Overview: rideNplay
Team Red Client Project: rideNplay
	-This app allows parents to find rides for their children's events through other parents.

### Deploying
* `npm install` to install required dependencies.
* `node server.js` to start the express backend server.
* `npm start` to start the react-native app.

**Note:** The proxy their requests to `localhost:3002`, the express server.


## Contents

- [Requirements](#-requirements)
- [Building App](#-building-your-first-react-native-app)


## 📋 Requirements

React Native apps may target iOS 9.0 and Android 4.1 (API 16) or newer. You may use Windows, macOS, or Linux as your development operating system, though building and running iOS apps is limited to macOS. Tools like [Expo](https://expo.io) can be used to work around this.

Follow the [Getting Started guide](https://facebook.github.io/react-native/docs/getting-started.html). The recommended way to install React Native depends on your project. Here you can find short guides for the most common scenarios:

The full documentation for React Native can be found on our [website][docs].


[docs]: https://facebook.github.io/react-native/docs/getting-started.html
[r-docs]: https://reactjs.org/docs/getting-started.html
[repo-website]: https://github.com/facebook/react-native-website

Next, create Firebase account and add in API keys in App.js. Visit Firebase documentation here for more information: https://firebase.google.com/

With access to your Firebase key, enter config information in App.js on lines 19-23.


Next, create Google Cloud account and integrate Google Maps API by visiting the following link: https://developers.google.com/maps/documentation/

With access to your Google Cloud key, enter config information in components/GooglePlacesInput.js on line 32.


## 🎉 Building App

To run project, run the following from command line:
`expo start`
