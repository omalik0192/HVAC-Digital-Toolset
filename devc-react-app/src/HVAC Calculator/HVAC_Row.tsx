import React, {useEffect} from 'react';
import {TableCell, TableRow, MenuItem, Select,TextField, Button, IconButton,} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import IHVAC_Row_Props from "./Interfaces/IHVAC_Row_Props"

const TableRowComponent:React.FC<IHVAC_Row_Props> = ({row, index, handleInputChange, hoveredRow, handleOpenModal, handleAddRow, handleDeleteRow, setHoveredRow, classes}) =>{
    useEffect(() => {
        if(row.ductShape === 'rectangular'&& row.height != null && row.width != null){
          const height = Number(row.height);
          const width = Number(row.width);
          const flowRate = Number(row.flowRate)
          const length = Number(row.length)
          //Step 1 calculate the equivalent diameter
        if (height != 0 && width != 0 && flowRate != 0 && length != 0) {
       
          const equivalentDiameter: number = 1.453 * Math.pow((height * width), 0.6) / Math.pow((2 * (height + width)), 0.2)

          const circularDuctSizes: number[] = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600
            , 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000]
          //Step 2 match the equivalent diameter to the closest duct size. 
          const closestDuctSize: number = circularDuctSizes.reduce((closestSize: number, currentSize: number) => {
            if (Math.abs(currentSize - equivalentDiameter) < Math.abs(closestSize - equivalentDiameter)) {
              return currentSize;
            }
            return closestSize
          }, circularDuctSizes[0])

          //Step 3 calculate the velocity in m/s
          const velocity: number = (4 * row.flowRate) / (3.1416 * Math.pow((closestDuctSize/1000), 2))

          //Step 4 calculate Reynolds number

          const densityAir = 1.22;
          const dynamicViscosityAir = 17.88 / 1000000;
          const equivalentRoughness = 0.075
          let frictionFactor

         const reynoldsNumber: number = (densityAir * velocity * (closestDuctSize / 1000)) / dynamicViscosityAir;

         //Step 5 calculate friction factor

        if (reynoldsNumber <= 2000){
          frictionFactor = 64/reynoldsNumber;
          
        }else{
          frictionFactor = Math.pow(1 / (-1.8 * Math.log((6.9 / reynoldsNumber) + Math.pow((equivalentRoughness / closestDuctSize) / 3.71, 1.11))), 2);
        }

        //Step 6 calculate pressure drop

        const pressureDrop = (8 * Math.pow(flowRate, 2) * densityAir * frictionFactor) / (9.87 * Math.pow(closestDuctSize / 1000, 5));

          console.log(equivalentDiameter)
          console.log(closestDuctSize)
          console.log(row.flowRate)
          console.log(velocity)
          console.log(reynoldsNumber)
          console.log(frictionFactor)
          console.log(pressureDrop)

           
        
        }
         


        }

        else if (row.ductShape === 'round'){
            console.log("Round")
        }else {
            console.log("unselected")
        }
    }, [row.ductShape, row.height, row.width, row.flowRate, row.length]);

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
                <MenuItem value="100">100</MenuItem>
                <MenuItem value="125">150</MenuItem>
                <MenuItem value="160">200</MenuItem>
                <MenuItem value="200">250</MenuItem>
                <MenuItem value="250">300</MenuItem>
                <MenuItem value="315">350</MenuItem>
                <MenuItem value="400">400</MenuItem>
                <MenuItem value="500">450</MenuItem>
                <MenuItem value="630">500</MenuItem>
                <MenuItem value="800">550</MenuItem>
                <MenuItem value="1000">600</MenuItem>
                <MenuItem value="1000">650</MenuItem>
                <MenuItem value="1000">700</MenuItem>
                <MenuItem value="1000">750</MenuItem>
                <MenuItem value="1000">800</MenuItem>
                <MenuItem value="1000">850</MenuItem>
                <MenuItem value="1000">900</MenuItem>
                <MenuItem value="1000">950</MenuItem>
                <MenuItem value="1000">1000</MenuItem>
                <MenuItem value="1000">1100</MenuItem>
                <MenuItem value="1000">1200</MenuItem>
                <MenuItem value="1000">1300</MenuItem>
                <MenuItem value="1000">1400</MenuItem>
                <MenuItem value="1000">1500</MenuItem>
                <MenuItem value="1000">1600</MenuItem>
                <MenuItem value="1000">1700</MenuItem>
                <MenuItem value="1000">1800</MenuItem>
                <MenuItem value="1000">1900</MenuItem>
                <MenuItem value="1000">2000</MenuItem>
                <MenuItem value="1000">2100</MenuItem>
                <MenuItem value="1000">2200</MenuItem>
                <MenuItem value="1000">2300</MenuItem>
                <MenuItem value="1000">2400</MenuItem>
                <MenuItem value="1000">2500</MenuItem>
                <MenuItem value="1000">2600</MenuItem>
                <MenuItem value="1000">2700</MenuItem>
                <MenuItem value="1000">2800</MenuItem>
                <MenuItem value="1000">2900</MenuItem>
                <MenuItem value="1000">3000</MenuItem>
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
           
            <TableCell>
              123
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
