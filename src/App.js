import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import { Input, TextField } from '@material-ui/core';

function App() {

  const [data, setData] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
  ]
  )

  function Table({ data, color, value, fillCells, draw }) {

    return (
      <table className='table'>
        <tbody>
          {draw ? fillCells(data, color, value) : fillCells(data)}
        </tbody>
      </table>
    )
  }

  function Form({ data }) {
    const [value, setValue] = useState('');
    const [color, setColor] = useState('#234567');
    const [draw, setDraw] = useState(false);

    const fillCells = (data, color = '#fff', value = -1) => {
      let counter = 0;
      return data.map((elem, index) =>
        <tr key={index} >
          {elem.map((item, i) => {
            counter++
            return counter === +value ?
              <td key={i} className='table__column' >{item}</td> :
              <td key={i} className='table__column' style={{ backgroundColor: color }}>{item}</td>
          }
          )}
        </tr>)
    }

    return (
      <form className='form'>
        <Table data={data} value={value} color={color} draw={draw} fillCells={fillCells}></Table>
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          onChange={(e) => { setDraw(false); setValue(e.target.value) }} inputProps={{ min: 1, max: 12 }}
          variant="outlined"
        />
        <Input type='color' onChange={(e) => { setDraw(false); setColor(e.target.value) }} value={color}></Input>
        <Button variant="contained" disabled={!value} color="primary" onClick={() => { setDraw(true) }}>
          Fill cells
      </Button>
      </form>
    )
  }

  return (
    <div className="App">
      <Form data={data}></Form>
    </div>
  );
}

export default App;