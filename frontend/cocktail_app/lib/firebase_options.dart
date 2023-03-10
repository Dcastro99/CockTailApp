// File generated by FlutterFire CLI.
// ignore_for_file: lines_longer_than_80_chars, avoid_classes_with_only_static_members
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyDuh2VMZsP_zJQduajx_LWFgnFjtfjJ-Sg',
    appId: '1:605650289038:web:17299fca730adb779524df',
    messagingSenderId: '605650289038',
    projectId: 'cocktailauth',
    authDomain: 'cocktailauth.firebaseapp.com',
    storageBucket: 'cocktailauth.appspot.com',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyCeeltUiPZ4XCrW9bteVNfytaOwhVWzByM',
    appId: '1:605650289038:android:77706e417a93ae089524df',
    messagingSenderId: '605650289038',
    projectId: 'cocktailauth',
    storageBucket: 'cocktailauth.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyBeMnsqVDrFEcCVTW5DVlmMZGgUm_FVeZQ',
    appId: '1:605650289038:ios:415f7252928abda39524df',
    messagingSenderId: '605650289038',
    projectId: 'cocktailauth',
    storageBucket: 'cocktailauth.appspot.com',
    iosClientId: '605650289038-ik4thb73c7t2o2hvn5lmau9snqk39ta4.apps.googleusercontent.com',
    iosBundleId: 'com.example.cocktailApp',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyBeMnsqVDrFEcCVTW5DVlmMZGgUm_FVeZQ',
    appId: '1:605650289038:ios:415f7252928abda39524df',
    messagingSenderId: '605650289038',
    projectId: 'cocktailauth',
    storageBucket: 'cocktailauth.appspot.com',
    iosClientId: '605650289038-ik4thb73c7t2o2hvn5lmau9snqk39ta4.apps.googleusercontent.com',
    iosBundleId: 'com.example.cocktailApp',
  );
}
