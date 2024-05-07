export interface IAuthRepository {
  getUserPasswordById(id: number): Promise<string>;
}
