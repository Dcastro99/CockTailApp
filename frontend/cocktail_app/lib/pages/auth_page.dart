import 'package:cocktail_app/pages/login_or_register.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:cocktail_app/pages/home_page.dart';
import 'package:cocktail_app/pages/login_page.dart';

class AuthPage extends StatelessWidget {
  AuthPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: StreamBuilder<User?>(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (context, snapshot) {
          // If the user is logged in, show the home page
          if (snapshot.hasData) {
            return HomePage();
          } else {
            // If the user is not logged in, show the login page
            return const LoginOrRegisterPage();
          }
        },
      ),
    );
  }
}
