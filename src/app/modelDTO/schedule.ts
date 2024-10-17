import { Doctor } from "../model/doctor";
import { Patients } from "../model/patients";

export interface Schedule {
  id:number,
  date?:Date,
  time:string,
  codeVideoCall?:string,
  isEnable?:number,
  isDeletePatients?:number,
  isDeleteDoctors?:number,
  patients:Patients,
  doctor:Doctor
}
