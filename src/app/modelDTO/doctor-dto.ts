interface Specialist {
  id: number;
  name: string;
  image: string | null;
}
interface Account {
  username: string;
  createAt: string;
}
export interface DoctorDTO {
  id:number,
  name?:string,
  date?:Date,
  gender?:number,
  username?:string
  houseAddress?:string,
  workAddress?:string,
  phoneNumber?:string,
  strengths?:string,
  email?:string,
  avatar?:string,
  education?:string,
  issue?:string,
  image?:string,
  isEnable?:number;
  certificate?:string,
  specialist?:Specialist,
  account:Account
}
