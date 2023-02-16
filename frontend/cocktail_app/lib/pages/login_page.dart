import 'package:cocktail_app/components/my_textfield.dart';
import 'package:cocktail_app/components/my_button.dart';
import 'package:cocktail_app/components/square_tile.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final emailController = TextEditingController();

  final passwordController = TextEditingController();

  //Sign in function
  void signUserIn() async {
//show loading indicator
    showDialog(
        context: context,
        builder: (context) => const Center(child: CircularProgressIndicator()));

    try {
      await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: emailController.text,
        password: passwordController.text,
      );
      Navigator.pop(context);
    } on FirebaseAuthException catch (e) {
      Navigator.pop(context);
      if (e.code == 'user-not-found') {
        wrongEmailMessage();
      } else if (e.code == 'wrong-password') {
        wrongPasswordMessage();
      }
    }
  }

  void wrongEmailMessage() {
    showDialog(
        context: context,
        builder: (context) => AlertDialog(
              title: const Text('Wrong Email'),
              content: const Text('There is no user with this email'),
              actions: [
                TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text('OK'))
              ],
            ));
  }

  void wrongPasswordMessage() {
    showDialog(
        context: context,
        builder: (context) => AlertDialog(
              title: const Text('Wrong Password'),
              content: const Text('Please check your password'),
              actions: [
                TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text('OK'))
              ],
            ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: SafeArea(
        child: Center(
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
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

            //email
            Mytextfield(
              controller: emailController,
              hintText: 'Email',
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
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'New User? ',
                  style: TextStyle(color: Colors.grey[700], fontSize: 12),
                ),
                const SizedBox(width: 4),
                const Text(
                  'Sign Up',
                  style: TextStyle(
                      color: Colors.blue,
                      fontSize: 12,
                      fontWeight: FontWeight.bold),
                ),
              ],
            )
          ]),
        ),
      ),
    );
  }
}
