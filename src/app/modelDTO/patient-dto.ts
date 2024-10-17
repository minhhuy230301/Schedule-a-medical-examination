interface Account {
  username: string;
  createAt: string;
}
export interface PatientDto {
  id:number,
  name?:string,
  date?:Date,
  gender?:number,
  address?:string,
  phoneNumber?:string,
  email?:string,
  avatar?:string,
  account:Account
}
