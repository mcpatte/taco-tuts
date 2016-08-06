export class User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public subjects: array,
    public teacher: boolean,
    public student: boolean
  ) {  }
}