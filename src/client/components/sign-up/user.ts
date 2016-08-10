export class User {
  constructor(
    public email: string,
    public password: string,
    public passwordConfirm: string
  ) {  }

  validatePasswords(): boolean {
    return this.password === this.passwordConfirm;
  }
  validateEmail(): boolean {
     var valid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    return valid.test(this.email);
  }
}
