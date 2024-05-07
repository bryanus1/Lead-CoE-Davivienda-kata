import User from '../models/users.model';

export interface IUserRepository {
  getByUsernameOrEmail(usernameOrEmail: string): Promise<User>;
}
