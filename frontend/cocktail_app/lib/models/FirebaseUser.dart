import 'package:firebase_auth/firebase_auth.dart';

class FirebaseUser {
  final String uid;

  const FirebaseUser({required this.uid});

  factory FirebaseUser.fromJson(Map<String, dynamic> json) {
    User user = json['user'];
    return FirebaseUser(uid: user.uid);
  }
}
