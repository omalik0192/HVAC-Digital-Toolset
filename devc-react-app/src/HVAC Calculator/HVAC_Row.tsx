import React, {useEffect} from 'react';
import {TableCell, TableRow, MenuItem, Select,TextField, Button, IconButton,} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import IHVAC_Row_Props from "./Interfaces/IHVAC_Row_Props"

const TableRowComponent:React.FC<IHVAC_Row_Props> = ({row, index, handleInputChange, hoveredRow, handleOpenModal, handleAddRow, handleDeleteRow, setHoveredRow, classes}) =>{
    useEffect(() => {
        if(row.ductShape === 'rectangular'){
          console.log("Rectangular")  
        }else if (row.ductShape === 'round'){
            console.log("Round")
        }else {
            console.log("unselected")
        }
    }, [row.ductShape]);

    return (
        <TableRow key={row.id} 
          onMouseEnter={() => setHoveredRow(index)} 
          onMouseLeave={() => setHoveredRow(null)}>
            <TableCell align="center">
              <Select
                value={row.ductShape}
                onChange={(event) =>
                  handleInputChange(event, index, "ductShape")
                }
                displayEmpty
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="rectangular">Rectangular</MenuItem>
                <MenuItem value="round">Round</MenuItem>
              </Select>
            </TableCell>
            <TableCell align="center">
              <Select
                name="width"
                value={row.width}
                onChange={(event) => handleInputChange(event, index, "width")}
                disabled={row.ductShape === "round"}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="200">200</MenuItem>
                <MenuItem value="250">250</MenuItem>
                <MenuItem value="300">300</MenuItem>
                <MenuItem value="400">400</MenuItem>
                <MenuItem value="500">500</MenuItem>
                <MenuItem value="600">600</MenuItem>
                <MenuItem value="800">800</MenuItem>
                <MenuItem value="1000">1000</MenuItem>
                <MenuItem value="1200">1200</MenuItem>
                <MenuItem value="1400">1400</MenuItem>
                <MenuItem value="1600">1600</MenuItem>
                <MenuItem value="1800">1800</MenuItem>
                <MenuItem value="2000">2000</MenuItem>
              </Select>
            </TableCell>
            <TableCell align="center">
              <Select
                name="height"
                value={row.height}
                onChange={(event) => handleInputChange(event, index, "height")}
                disabled={row.ductShape === "round"}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="200">200</MenuItem>
                <MenuItem value="250">250</MenuItem>
                <MenuItem value="300">300</MenuItem>
                <MenuItem value="400">400</MenuItem>
                <MenuItem value="500">500</MenuItem>
                <MenuItem value="600">600</MenuItem>
                <MenuItem value="800">800</MenuItem>
                <MenuItem value="1000">1000</MenuItem>
                <MenuItem value="1200">1200</MenuItem>
                <MenuItem value="1400">1400</MenuItem>
                <MenuItem value="1600">1600</MenuItem>
                <MenuItem value="1800">1800</MenuItem>
                <MenuItem value="2000">2000</MenuItem>
              </Select>
            </TableCell>
            <TableCell align="center">
              <Select
                name="diameter"
                value={row.diameter}
                onChange={(event) =>
                  handleInputChange(event, index, "diameter")
                }
                disabled={row.ductShape === "rectangular"}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="63">63</MenuItem>
                <MenuItem value="80">80</MenuItem>
                <MenuItem value="100">100</MenuItem>
                <MenuItem value="125">125</MenuItem>
                <MenuItem value="160">160</MenuItem>
                <MenuItem value="200">200</MenuItem>
                <MenuItem value="250">250</MenuItem>
                <MenuItem value="315">315</MenuItem>
                <MenuItem value="400">400</MenuItem>
                <MenuItem value="500">500</MenuItem>
                <MenuItem value="630">630</MenuItem>
                <MenuItem value="800">800</MenuItem>
                <MenuItem value="1000">1000</MenuItem>
                <MenuItem value="1000">1250</MenuItem>
              </Select>
            </TableCell>

            <TableCell align="center">
              <TextField
                type="number"
                InputProps={{
                  inputProps: {
                    style: { textAlign: "center", marginTop: "22px" },
                    min: 0, // if you want to enforce a minimum value
                  },
                }}
                error={isNaN(row["length"]) || row["length"] < 0} // Validate the input here.
                helperText={
                  isNaN(row["length"]) || row["length"] < 0
                    ? "Invalid number"
                    : " "
                } // Display an error message if the input is invalid.
                onChange={(event) => handleInputChange(event, index, "length")} // Update the inputValue state whenever the input changes.
              />
            </TableCell>
            <TableCell align="center">
            <TextField
                type="number"
                InputProps={{
                  inputProps: {
                    style: { textAlign: "center", marginTop: "22px" },
                    min: 0, // if you want to enforce a minimum value
                  },
                }}
                error={isNaN(row["flowRate"]) || row["flowRate"] < 0} // Validate the input here.
                helperText={
                  isNaN(row["flowRate"]) || row["flowRate"] < 0
                    ? "Invalid number"
                    : " "
                } // Display an error message if the input is invalid.
                onChange={(event) => handleInputChange(event, index, "flowRate")} // Update the inputValue state whenever the input changes.
              />
            </TableCell>
           Data 7
            <TableCell>
              
            </TableCell>
            <TableCell
              style={{
                borderLeft: "1px solid gray",
                backgroundColor: hoveredRow === index ? '#FFFACD' : "#f5f5f5",
              }}
              align="center"
            >
              Data 8
            </TableCell>
            <TableCell style={{ backgroundColor: hoveredRow === index ? '#FFFACD' : "#f5f5f5" }} align="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenModal(index)}
                className={classes.button}
              >
                Configure
              </Button>
            </TableCell>
            <TableCell
              style={{
                borderRight: "1px solid gray",
                backgroundColor: hoveredRow === index ? '#FFFACD' : "#f5f5f5",
              }}
              align="center"
            >
              Data 9
            </TableCell>
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

    )
}

export default TableRowComponent
