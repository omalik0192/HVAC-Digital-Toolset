import ductShape from "../enums/DuctShape"

interface IRow  {
    id: number;
    ductShape: ductShape;
    diameter?: string; 
    height?: string; 
    width?: string;
    length: number;
    flowRate: number;
  }

  export default IRow