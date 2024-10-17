interface Specialist {
  id: number;
  name: string;
  image: string | null;
}
export interface Doctor {
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
  isEnable?:number,
  image?:string,
  specialist?:Specialist
}
// them username va de ? o specialist:
