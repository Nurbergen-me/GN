export interface Book {
  title: string;
  author_name: string[];
  first_publish_year: number;
  format: string[];
 }

 export interface FormData {
   search: string;
   years: number[];
   formats: string[]
 }