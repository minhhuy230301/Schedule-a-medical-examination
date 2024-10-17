interface Topic{
  id?: number;
  name?: string;
  image?: string | null;
  description?:string;
}
export interface PostDTO {
  id:number;
  name?:string;
  description?:string;
  image?:string;
  topic?:Topic
}
