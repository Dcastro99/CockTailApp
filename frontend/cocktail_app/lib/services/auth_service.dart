import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/CocktailUser.dart';
import '../models/LoginObject.dart';

class AuthService {
  // Google Sign in
  signInWithGoogle() async {
    // Trigger the authentication flow
    final GoogleSignInAccount? gUser = await GoogleSignIn().signIn();

    // Obtain the auth details from the request
    final GoogleSignInAuthentication gAuth = await gUser!.authentication;

    // Create a new credential
    final credential = GoogleAuthProvider.credential(
      accessToken: gAuth.accessToken,
      idToken: gAuth.idToken,
    );

    // Once signed in, return the UserCredential
    return await FirebaseAuth.instance.signInWithCredential(credential);
  }

  Future<CocktailUser> signinWithOurService(
      String email, String password) async {
    final response = await http.post(
      Uri.parse('http://localhost:3001/api/login'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(LoginObject(email: email, password: password)),
    );

    if (response.statusCode == 200) {
      return CocktailUser.fromJson(jsonDecode(response.body));
    } else {
      throw Exception(response.body);
    }
  }

  Future<CocktailUser> registerCocktailUser(
      String email, String password) async {
    final response = await http.post(
      Uri.parse('http://localhost:3001/api/register'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(LoginObject(email: email, password: password)),
    );

    if (response.statusCode == 200) {
      return CocktailUser.fromJson(jsonDecode(response.body));
    } else {
      throw Exception(response.body);
    }
  }
}
