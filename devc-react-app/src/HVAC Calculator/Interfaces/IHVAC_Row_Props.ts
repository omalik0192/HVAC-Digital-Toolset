import { ChangeEvent, MouseEvent, ReactNode, CSSProperties } from 'react';
import IRow from './IRow';
import { ClassNameMap } from '@material-ui/styles';

// Define the types for your props here
interface TableRowComponentProps {
  row: IRow;
  index: number;
  handleInputChange: (event: ChangeEvent<{ value: unknown }>, index: number, property: keyof IRow) => void;
  hoveredRow: number | null;
  handleOpenModal: (index: number) => void;
  handleAddRow: (index: number) => void;
  handleDeleteRow: (index: number) => void;
  setHoveredRow: React.Dispatch<React.SetStateAction<number | null>>;
  classes: ClassNameMap<string>; // or another suitable type depending on your classes object
}

export default TableRowComponentProps

