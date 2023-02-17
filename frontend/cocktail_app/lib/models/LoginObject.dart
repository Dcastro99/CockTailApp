class LoginObject {
  final String email;
  final String password;

  const LoginObject({required this.email, required this.password});

  Map<String, dynamic> toJson() => {
        'email': email,
        'password': password,
      };
}
