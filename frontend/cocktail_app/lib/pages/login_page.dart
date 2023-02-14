import 'package:cocktail_app/components/my_textfield.dart';
import 'package:cocktail_app/components/my_button.dart';
import 'package:cocktail_app/components/square_tile.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LoginPage extends StatelessWidget {
  LoginPage({super.key});

  final usernameController = TextEditingController();
  final passwordController = TextEditingController();

  //Sign in function
  void signUserIn() {}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: SafeArea(
        child: Center(
          child: Column(children: [
            const SizedBox(height: 50),
            //LOGO
            const Icon(
              Icons.phone_iphone,
              size: 100,
            ),
            const SizedBox(height: 50),
            //WELCMOE BACK
            Text(
              'Welcome Back, you\'ve been missed!',
              style: TextStyle(color: Colors.grey[700], fontSize: 16),
            ),

            const SizedBox(height: 25),

            //USERNAME
            Mytextfield(
              controller: usernameController,
              hintText: 'Username',
              obscureText: false,
            ),

            const SizedBox(height: 10),

            //PASSWORD
            Mytextfield(
              controller: passwordController,
              hintText: 'Password',
              obscureText: true,
            ),

            const SizedBox(height: 10),

            //FORGOT PASSWORD
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 25),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Text(
                    'Forgot Password?',
                    style: TextStyle(color: Colors.grey[600], fontSize: 12),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 25),

            //LOGIN BUTTON
            MyButton(
              onTap: signUserIn,
            ),

            const SizedBox(height: 50),

            //OR CONTINUE WITH
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 25),
              child: Row(
                children: [
                  Expanded(
                    child: Divider(
                      thickness: 0.5,
                      color: Colors.grey[400],
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 10),
                    child: Text(
                      'Or continue with',
                      style: TextStyle(color: Colors.grey[700], fontSize: 12),
                    ),
                  ),
                  Expanded(
                    child: Divider(
                      thickness: 0.5,
                      color: Colors.grey[400],
                    ),
                  )
                ],
              ),
            ),

            const SizedBox(height: 50),

            //GOOGLE + APPLE BUTTONS
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                SquareTile(imagePath: 'lib/images/google.png'),
                SizedBox(width: 25),
                SquareTile(imagePath: 'lib/images/apple.png'),
              ],
            ),

            const SizedBox(height: 50),

            //NEW USER? SIGN UP
          ]),
        ),
      ),
    );
  }
}
