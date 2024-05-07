export default class User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly username: string;

  constructor(id: number, name: string, email: string, username: string) {
    this.id = id;
    this.name = name;
    this.username = username;
  }

  static fromJson(data: {
    id: number;
    name: string;
    email: string;
    username: string;
  }): User {
    return new User(data.id, data.name, data.email, data.username);
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
    };
  }
}
