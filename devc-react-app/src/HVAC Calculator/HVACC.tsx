// Importing necessary modules and components from react and material-ui library
import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import IRow from "./Interfaces/IRow";
import DuctShape from "./enums/DuctShape";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    textTransform: 'none',
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
    },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  // Function to add a new row to the table
  const handleAddRow = (index: number) => {
    // Create new row object
    const newRow: IRow = {
      id: rows.length + 1,
      ductShape: DuctShape.Unselected,
    };
    // Clone rows array
    const updatedRows: IRow[] = [...rows];
    updatedRows.splice(index + 1, 0, newRow);
    // Update state with the new array
    setRows(updatedRows);
  };
  // Function to delete a row from the table
  const handleDeleteRow = (index: number) => {
    // Filter out the row at the given index
    const updatedRows = rows.filter((_, i) => i !== index);
    // Update state with the new array
    setRows(updatedRows);
  };
  //Function to handle changes in the input fields
  const handleDuctShapeChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    index: number
  ) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, ductShape: event.target.value as DuctShape };
      }
      return row;
    });
    //Update state with new row
    setRows(updatedRows);
  };
  //Function to handle changes in the input
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    //Update the property (name of the input field) of the row at the given index value with the new value
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, [event.target.name]: event.target.value };
      }
      return row;
    });
    //Update the state with the new array
    setRows(updatedRows);
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
    <Table style={{ width: "1500px", margin: "0px" }}>
      {/*Define table headers*/}
      <TableHead>
        <TableRow>
          <TableCell style={{ width: "100px", fontWeight: 'bold' }} align="left">Duct Shape</TableCell>
          <TableCell style={{ width: "100px", fontWeight: 'bold' }} align="center">Height <br/>(mm)</TableCell>
          <TableCell style={{ width: "100px", fontWeight: 'bold' }} align="center">Width  <br/>(mm)</TableCell>
          <TableCell style={{ width: "100px", fontWeight: 'bold' }} align="center">Diameter  <br/>(mm)</TableCell>
          <TableCell style={{ width: "120px", fontWeight: 'bold' }} align="center">Length  <br/>(mm)</TableCell>
          <TableCell style={{ width: "150px", fontWeight: 'bold' }} align="center">
            Flow Rate <br/>(m<sup>3</sup>/s)
          </TableCell>
          <TableCell style={{ width: "150px", fontWeight: 'bold' }} align="center">Pressure Loss <br/>(Pa)</TableCell>
          <TableCell style={{ width: "100px", borderLeft: '1px solid gray', backgroundColor: '#f5f5f5', fontWeight: 'bold' }} align="center">Fitting Type</TableCell>
          <TableCell style={{ width: "100px",backgroundColor: '#f5f5f5' }}></TableCell>
          <TableCell style={{ width: "150px", borderRight: '1px solid gray', backgroundColor: '#f5f5f5', fontWeight: 'bold' }} align="center">Pressure Loss <br/>(Pa)</TableCell>
          <TableCell style={{ width: "100px" }}></TableCell>
          
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
        {rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>
              <Select
                value={row.ductShape}
                onChange={(event) => handleDuctShapeChange(event, index)}
                displayEmpty
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="rectangular">Rectangular</MenuItem>
                <MenuItem value="round">Round</MenuItem>
              </Select>
            </TableCell>
            <TableCell>
              <TextField
                name="height"
                value={row.height}
                onChange={(event) => handleInputChange(event, index)}
                disabled={row.ductShape === "round"}
                variant="filled"
                style={{
                  backgroundColor:
                    row.ductShape === "round" ? "lightgrey" : "white",
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                name="width"
                value={row.width}
                onChange={(event) => handleInputChange(event, index)}
                disabled={row.ductShape === "round"}
                variant="filled"
                style={{
                  backgroundColor:
                    row.ductShape === "round" ? "lightgrey" : "white",
                }}
              />
            </TableCell>
            <TableCell align="center">
              <TextField
                name="diameter"
                value={row.diameter}
                onChange={(event) => handleInputChange(event, index)}
                disabled={row.ductShape === "rectangular"}
                variant="filled"
                style={{
                  backgroundColor:
                    row.ductShape === "rectangular" ? "lightgrey" : "white",
                }}
              />
            </TableCell>

            <TableCell align="center">Data 5</TableCell>
            <TableCell align="center">Data 6</TableCell>
            <TableCell align="center">Data 7</TableCell>
            <TableCell style={{borderLeft: '1px solid gray', backgroundColor: '#f5f5f5' }} align="center">Data 8</TableCell>
            <TableCell style={{backgroundColor: '#f5f5f5' }} align="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenModal(index)}
                className={classes.button}
              >
                Configure
              </Button>
            </TableCell>
            <TableCell style={{borderRight: '1px solid gray', backgroundColor: '#f5f5f5'  }} align="center">Data 9</TableCell>
            <TableCell style={{ width: "140px" }} align="center">
              {index === 0 ? (
                <IconButton onClick={() => handleAddRow(index)}>
                  <AddIcon />
                </IconButton>
              ) : (
                <React.Fragment>
                  <IconButton onClick={() => handleAddRow(index)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteRow(index)}>
                    <DeleteIcon />
                  </IconButton>
                </React.Fragment>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MyTable;
