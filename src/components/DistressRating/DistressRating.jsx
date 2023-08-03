import React from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}`;
}

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
];

function DistressRating() {
  return (
    <Stack sx={{ height: 300, display: 'flex', justifyContent: 'center' }} spacing={1} direction="row">
      <Slider
        sx={{ width: "10px" }}
        aria-label="DistressRating"
        orientation="vertical"
        getAriaValueText={valuetext}
        valueLabelDisplay="on"
        defaultValue={0}
        step={1}
        min={0}
        max={10}
        marks={marks}
      />
    </Stack>
  );
}

export default DistressRating;
