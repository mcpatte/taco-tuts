export class User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public subjects: string,
    public teacher: boolean,
    public student: boolean
  ) {  }
}