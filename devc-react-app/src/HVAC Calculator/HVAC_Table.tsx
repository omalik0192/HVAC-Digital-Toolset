// Importing necessary modules and components from react and material-ui library
import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  
} from "@material-ui/core";

import IRow from "./Interfaces/IRow";
import DuctShape from "./enums/DuctShape";
import { makeStyles } from "@material-ui/core/styles";
import HVAC_Row from "./HVAC_Row"



const useStyles = makeStyles({
  small: {
    padding: '0px 0px', // custom padding for 'small' size
  },
  button: {
    textTransform: "none",
  },
});

// Define the MyTable component
const MyTable = () => {
  const classes = useStyles();
  //Type information for row object

  // Initialize a state variable 'rows' with an array containing a single object
  // Also initialize the function 'setRows' to update this state
  const [rows, setRows] = useState<IRow[]>([
    {
      id: 1,
      ductShape: DuctShape.Unselected,
      diameter: "",
      height: "",
      width: "",
      length: 0,
      flowRate: 0,
    },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  // Function to add a new row to the table
  const handleAddRow = (index: number) => {
    // Create new row object
    const newRow: IRow = {
      id: rows.length + 1,
      ductShape: DuctShape.Unselected,
      diameter: "", // Provide default value
      height: "", // Provide default value
      width: "", // Provide default value
      length: 0,
      flowRate: 0,
    };
    // Clone rows array
    const updatedRows: IRow[] = [...rows];
    updatedRows.splice(index + 1, 0, newRow);
    // Update IDs
    const rowsWithNewIds = updatedRows.map((row, i) => {
      return { ...row, id: i };
    });
    // Update state with the new array

    setRows(rowsWithNewIds);
    console.log(rowsWithNewIds);
  };
  // Function to delete a row from the table
  const handleDeleteRow = (index: number) => {
    // Filter out the row at the given index
    const updatedRows = rows.filter((_, i) => i !== index);
    // Update IDs
    const rowsWithNewIds = updatedRows.map((row, i) => {
      return { ...row, id: i };
    });
    // Update state with the new array
    setRows(rowsWithNewIds);
    console.log(rowsWithNewIds);
  };

  //Function to handle changes in the input and track the row object
  const handleInputChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    index: number,
    property: keyof IRow
  ) => {
    //Update the property (name of the input field) of the row at the given index value with the new value
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, [property]: event.target.value };
      }
      return row;
    });
    //Update the state with the new array

    setRows(updatedRows);
    console.log(updatedRows);
  };
  const handleOpenModal = (index: number) => {
    setActiveRow(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  

  //Render the component
  return (
    //Define a table structure
    <Table style={{ width: "1500px", margin: "0px" }} size="small">
      {/*Define table headers*/}
      <TableHead>
        <TableRow>
          <TableCell
            style={{ width: "100px", fontWeight: "bold", backgroundColor: "#7939f7",
            color: '#FFFFFF', }}
            align="left"
          >
            Duct Shape
          </TableCell>
          <TableCell
            style={{ width: "100px", fontWeight: "bold", backgroundColor: "#7939f7",
            color: '#FFFFFF', }}
            align="center"
          >
            Width <br />
            (mm)
          </TableCell>
          <TableCell
            style={{ width: "100px", fontWeight: "bold", backgroundColor: "#7939f7",
            color: '#FFFFFF', }}
            align="center"
          >
            Height <br />
            (mm)
          </TableCell>
          <TableCell
            style={{ width: "100px", fontWeight: "bold", backgroundColor: "#7939f7",
            color: '#FFFFFF', }}
            align="center"
          >
            Diameter <br />
            (mm)
          </TableCell>
          <TableCell
            style={{ width: "120px", fontWeight: "bold", backgroundColor: "#7939f7",
            color: '#FFFFFF', }}
            align="center"
          >
            Length <br />
            (mm)
          </TableCell>
          <TableCell
            style={{ width: "150px", fontWeight: "bold", backgroundColor: "#7939f7",
            color: '#FFFFFF', }}
            align="center"
          >
            Flow Rate <br />
            (m<sup>3</sup>/s)
          </TableCell>
          <TableCell
            style={{ width: "150px", fontWeight: "bold", backgroundColor: "#7939f7",
            color: '#FFFFFF', }}
            align="center"
          >
            Pressure Loss <br />
            (Pa)
          </TableCell>
          <TableCell
            style={{
              width: "100px",
              borderLeft: "1px solid gray",
              backgroundColor: "#7939f7",
              color: '#FFFFFF',
              fontWeight: "bold",
            
            }}
            align="center"
          >
            Fitting Type
          </TableCell>
          <TableCell
            style={{ width: "100px", backgroundColor: "#7939f7",
            color: '#FFFFFF', }}
          ></TableCell>
          <TableCell
            style={{
              width: "150px",
              borderRight: "1px solid gray",
              backgroundColor: "#7939f7",
              color: '#FFFFFF',
              fontWeight: "bold",
            }}
            align="center"
          >
            Pressure Loss <br />
            (Pa)
          </TableCell>
          <TableCell style={{ width: "100px", backgroundColor: "#7939f7", }}></TableCell>
        </TableRow>
      </TableHead>
      {/* Modal for additional settings */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Additional Settings</DialogTitle>
        <DialogContent>{/* Your form fields here */}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleCloseModal}>Save</Button>
        </DialogActions>
      </Dialog>
      {/*Define table body*/}
      <TableBody>
        {/*map function to put data into table*/}
        {rows.map((row, index) => {

          return (
          <HVAC_Row
          row = {row}
          index={index}
          handleInputChange={handleInputChange}
          hoveredRow={hoveredRow}
          handleOpenModal={handleOpenModal}
          handleAddRow={handleAddRow}
          handleDeleteRow={handleDeleteRow}
          setHoveredRow={setHoveredRow}
          classes={classes}
          ></HVAC_Row>
        )})}
      </TableBody>
    </Table>
  );
};

export default MyTable;
