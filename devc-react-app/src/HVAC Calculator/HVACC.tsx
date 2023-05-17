import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const MyTable = () => {
    const [rows, setRows] = useState([{ id: 1, ductShape: '', diameter: '', height: '', width: '' }]);

  const handleAddRow = (index) => {
    const newRow = { id: rows.length + 1, ductShape: '' };
    const updatedRows = [...rows];
    updatedRows.splice(index + 1, 0, newRow);
    setRows(updatedRows);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleDuctShapeChange = (event, index) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, ductShape: event.target.value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleInputChange = (event, index) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, [event.target.name]: event.target.value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell >Duct Shape</TableCell>
          <TableCell style={{ width: '100px' }}>Height (mm)</TableCell>
          <TableCell style={{ width: '100px' }}>Width (mm)</TableCell>
          <TableCell style={{ width: '100px' }}>Diameter (mm)</TableCell>
          <TableCell style={{ width: '100px' }}>Length (mm)</TableCell>
          <TableCell style={{ width: '100px' }}>Volume Flow Rate (m3/s)</TableCell>
          
          <TableCell>Pressure Loss (Pa)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
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
    disabled={row.ductShape === 'round'}
    variant="filled"
    style={{ backgroundColor: row.ductShape === 'round' ? 'lightgrey' : 'white' }} 
  />
</TableCell>
<TableCell>
  <TextField 
    name="width" 
    value={row.width} 
    onChange={(event) => handleInputChange(event, index)} 
    disabled={row.ductShape === 'round'}
    variant="filled"
    style={{ backgroundColor: row.ductShape === 'round' ? 'lightgrey' : 'white' }} 
  />
</TableCell>
<TableCell>
  <TextField 
    name="diameter" 
    value={row.diameter} 
    onChange={(event) => handleInputChange(event, index)} 
    disabled={row.ductShape === 'rectangular'}
    variant="filled"
    style={{ backgroundColor: row.ductShape === 'rectangular' ? 'lightgrey' : 'white' }} 
  />
</TableCell>

            <TableCell>Data 5</TableCell>
            <TableCell>Data 6</TableCell>
            <TableCell>Data 7</TableCell>
            <TableCell>
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
