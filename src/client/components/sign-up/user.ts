export class User {
  constructor(
    public email: string,
    public password: string,
    public passwordConfirm: string
  ) {  }

  validatePasswords(): boolean {
    return this.password === this.passwordConfirm;
  }
}
