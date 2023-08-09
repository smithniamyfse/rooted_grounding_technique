import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';



function distressValueText(value) {
    return `${value}`;
}

function FilterViewAll() {
  const [open, setOpen] = useState(false);
  const [distressValue, setDistressValue] = useState([2, 5]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDistressChange = (event, newDistressValue) => {
    setDistressValue(newDistressValue);
  }

  return (
    <>
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open filter dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filter Options</DialogTitle>
        <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'MobileDatePicker',
        ]}
      >
        <DemoItem label="Mobile variant">
          {/* <MobileDatePicker defaultValue={dayjs('2022-04-17')} /> */}
          <MobileDatePicker />
        </DemoItem>
        </DemoContainer>
    </LocalizationProvider>
          {/* Autocomplete component for the location filter goes here */}
          <Slider
          getAriaLabel={() => 'Distress Rating Range'}
          value={distressValue}
          onChange={handleDistressChange}
            valueLabelDisplay="auto"
            getAriaValueText={distressValueText}
            step={1}
            min={0}
            max={10}
          />
          {/* Select or Autocomplete component for the sense items filter goes here */}
          <Select
            defaultValue="morning"
          >
            <MenuItem value="morning">Morning</MenuItem>
            <MenuItem value="afternoon">Afternoon</MenuItem>
            <MenuItem value="evening">Evening</MenuItem>
          </Select>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
}

export default FilterViewAll;


{/* <div className="filter-section">
    <label>
        Location:
        <input type="text" onChange={handleLocationFilterChange} />
    </label>
    <label>
        Date:
        <input type="date" onChange={handleDateFilterChange} />
    </label>
    <label>
        Time:
        <input type="time" onChange={handleTimeFilterChange} />
    </label>
    <label>
        Min Distress Rating:
        <select onChange={handleMinDistressRatingChange}>
            <option value="0">0</option>
            <option value="1">1</option>
            ... (and so on till 10)
        </select>
    </label>
    <label>
        Max Distress Rating:
        <select onChange={handleMaxDistressRatingChange}>
            <option value="0">0</option>
            <option value="1">1</option>
            ... (and so on till 10)
        </select>
    </label>
    <label>
        Sense Item:
        <input type="text" onChange={handleSenseItemFilterChange} />
    </label>
    <button onClick={applyFilters}>Filter</button>
</div>  */}
  