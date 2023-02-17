class CocktailUser {
  final int id;
  final String name;

  const CocktailUser({required this.id, required this.name});

  factory CocktailUser.fromJson(Map<String, dynamic> json) {
    return CocktailUser(
      id: json['id'],
      name: json['name'],
    );
  }
}
