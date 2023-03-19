class LoginObject {
  final String uid;
  final String email;

  const LoginObject({required this.uid, required this.email});

  Map<String, dynamic> toJson() => {
        'uid': uid,
        'email': email,
      };
}
