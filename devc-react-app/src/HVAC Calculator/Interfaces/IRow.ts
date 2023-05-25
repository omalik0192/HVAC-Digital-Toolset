import ductShape from "../enums/DuctShape"

interface IRow  {
    id: number;
    ductShape: ductShape;
    diameter?: string; 
    height?: string; 
    width?: string;
  }

  export default IRow