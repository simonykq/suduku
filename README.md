# Back-Tracking Soduku Solver

## Description

A soduku solver application that runs on mobile platforms (iOS and Android). The application is implemented using the 
latest [React Native](https://facebook.github.io/react-native/) as the UI framework, and [Mobx](https://mobx.js.org/) 
as the state management framework. The solver algorithm is based on the back-tracking, where it remembers the previous 
travelled paths and back-tracks to the most recent one should it gets into dead-end in current path. It keeps trying 
until all empty cells on an 8 * 8 grid are filled. 

![iOS screenshot](./ios.png =250x250)

To load different suduku numbers, find the `suduku_data.json` file under `stores` directory and put the numbers as flat 
string ordered by the horizontal order (on the 8 * 8 grid) into the 'numbers' field. The application will randomly pick 
one number each time you click the 'Try Another' button.

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app)
and [Expo](https://expo.io/)


## Getting Started

Clone this repository and make sure you have [__npm__](https://nodejs.org/en/download/) and 
[__node__](https://nodejs.org/en/download/) installed. Navigate to this directory and then install dependencies by running:

```
  npm install
```

You may also want to install the Expo local development tools (XDE or exp) to facilitate the development, 
build and deployment of the React Native app. Check [this link](https://docs.expo.io/versions/v29.0.0/introduction/installation) 
for details to get everything installed on your desktop. 

## Running React Native App

Once you have the dependencies installed, you are good to run the React Native application by running the command:

```
npm start
```

This will run a server terminal that serves your native application in development mode. To view the application 
in your mobile devices, you will need to install the [Expo client](https://expo.io) on your phone. 
The __[Expo client]__ will reload your app if you save edits to your files, and you will see build errors and logs in the terminal.
                                                     
Sometimes you may need to pass the `--reset-cache` option on the `npm start` command to reset or clear 
the React Native packager's cache. 

## Running on mobile devices

To view your application on your devices, you will first need to connect the mobile device to the same Wi-Fi network
that runs your React Native application. Then you will need to download the [Expo client](https://expo.io/tools#client) 
on iOS or Android in order to run your application. Once you have downloaded the __Expo client__, you can either view your
application by scanning the QR code displayed from the server terminal or have a link sent directly to your phone through 
SMS over Cellular network. In the server terminal, to display the QR code, simply type `q` and to request an _Expo URL_ 
sent to your phone, type `s`, followed by your phone number. For other information, follow the instructions on the terminal
screen. Notice that you do not need to create an account and sign in to Expo in order to view your application. 

## Running on mobile simulator

To view your application on an iOS simulator (MacOS only) and Android simulator, you will need to set up the Xcode and
Android development environment respectively. For setting up the Xcode development environment to run iOS simulator, 
follow the official Xcode installation guideline from [Apple App Store](https://itunes.apple.com/app/xcode/id497799835).
Once you have installed the Xcode, you can view your application on an iOS simulator by running:

```
  npm run ios
```

from the project directory or type `i` on the server terminal while your React Native application is running through `npm start`

For setting up the Android development environment and set up an virtual Android device, follow 
[this](https://docs.expo.io/versions/v29.0.0/workflow/android-studio-emulator.html) link. You will need to install 
Android Studio 3.0 +. Once you have set these up, you can view your application on an pre-configured Android device by
running:

```
  npm run android
```

from the project directory or type `a` on the server terminal while your React Native application is running through `npm start`

## Publishing and Deployment

[Create React Native App](https://github.com/react-community/create-react-native-app) and [Expo](https://expo.io/) 
does a lot of work to make app setup and development simple and straightforward, but it's very difficult to do the same 
for deploying to Apple's App Store or Google's Play Store without relying on a hosted service. It is therefore, Expo
offers a variety of ways to publish and deploy your React Native applications that can be accessed by anyone over internet.

### Publishing to Expo's React Native Community

The most easy way to publish your native app is probably to publish it to the Expo hosting service. Expo provides 
free hosting for the JS-only apps created by CRNA, allowing you to share your app through the Expo client app. 
This requires registration for an Expo account and to open your app, each person who wants to view it must have 
[Expo client](https://expo.io/tools#client) installed on their mobile devices and sign in to their Expo accounts.

To publish your React Native app created through Expo, install the `exp` command-line tool, and run the publish command:

```
$ npm i -g exp
$ exp publish
```

### Building an Expo "standalone" app

You can also use Expo to build your React Native application standalone, without relying on Expo's hosting service. Follow
the instructions on the [Expo's standalone builds](https://docs.expo.io/versions/latest/guides/building-standalone-apps.html) link
to figure out how you can get an IPA/APK package for distribution without building the native code yourself. You will
probably need an Apple Developer account or a Google Play Developer account.

### Ejecting from Create React Native App

In the last stand if you want to add some native code (Objective-C or Swift for iOS and Java for Android) or access to the
platform specific SDK in your application to build and deploy app yourself, you can _eject_ the application from Expo 
and use Xcode or Android Studio IDEs to continue your development. The ejected code will be ready to be imported by 
Xcode for iOS or by Android Studio for Android.

To eject your CRNA application into native builds, run following commands:

```
  npm run eject 
```

You will also need to install `watchman` and `react-native-cli` before importing to the project into Xcode or Android Studio.
Follow the instructions on [native code getting started guide for React Native](https://facebook.github.io/react-native/docs/getting-started.html)
to get more details.


## Troubleshooting

### Networking

If you're unable to load your app on your phone due to a network timeout or a refused connection, a good first step is to verify that your phone and computer are on the same network and that they can reach each other. Create React Native App needs access to ports 19000 and 19001 so ensure that your network and firewall settings allow access from your device to your computer on both of these ports.

Try opening a web browser on your phone and opening the URL that the packager script prints, replacing `exp://` with `http://`. So, for example, if underneath the QR code in your terminal you see:

```
exp://192.168.0.1:19000
```

Try opening Safari or Chrome on your phone and loading

```
http://192.168.0.1:19000
```

and

```
http://192.168.0.1:19001
```

If this works, but you're still unable to load your app by scanning the QR code, please open an issue on the [Create React Native App repository](https://github.com/react-community/create-react-native-app) with details about these steps and any other error messages you may have received.

If you're not able to load the `http` URL in your phone's web browser, try using the tethering/mobile hotspot feature on your phone (beware of data usage, though), connecting your computer to that WiFi network, and restarting the packager. If you are using a VPN you may need to disable it.

### iOS Simulator won't open

If you're on a Mac, there are a few errors that users sometimes see when attempting to `npm run ios`:

* "non-zero exit code: 107"
* "You may need to install Xcode" but it is already installed
* and others

There are a few steps you may want to take to troubleshoot these kinds of errors:

1. Make sure Xcode is installed and open it to accept the license agreement if it prompts you. You can install it from the Mac App Store.
2. Open Xcode's Preferences, the Locations tab, and make sure that the `Command Line Tools` menu option is set to something. Sometimes when the CLI tools are first installed by Homebrew this option is left blank, which can prevent Apple utilities from finding the simulator. Make sure to re-run `npm/yarn run ios` after doing so.
3. If that doesn't work, open the Simulator, and under the app menu select `Reset Contents and Settings...`. After that has finished, quit the Simulator, and re-run `npm/yarn run ios`.

### QR Code does not scan

If you're not able to scan the QR code, make sure your phone's camera is focusing correctly, and also make sure that the contrast on the two colors in your terminal is high enough. For example, WebStorm's default themes may [not have enough contrast](https://github.com/react-community/create-react-native-app/issues/49) for terminal QR codes to be scannable with the system barcode scanners that the Expo app uses.

If this causes problems for you, you may want to try changing your terminal's color theme to have more contrast, or running Create React Native App from a different terminal. You can also manually enter the URL printed by the packager script in the Expo app's search bar to load it manually.
