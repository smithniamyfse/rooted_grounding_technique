import React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

// Create shapes as React functional components
const Circle = () => (
  <div
    style={{
      width: 24,
      height: 24,
      borderRadius: "50%",
      backgroundColor: "#e0e0e0",
    }}
  />
);
const Pill = (props) => (
  <div
    style={{
      height: 16,
      width: props.width,
      borderRadius: 1,
      backgroundColor: "#e0e0e0",
    }}
  />
);

// Helper function
const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const IconList = ({ count = 4 }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <ListItem key={index}>
        <ListItemIcon>
          <Circle />
        </ListItemIcon>
        <ListItemText primary={<Pill width={randomBetween(56, 136)} />} />
      </ListItem>
    ))}
  </>
);

const InsetList = ({ count = 4 }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <ListItem key={index}>
        <ListItemText inset primary={<Pill width={randomBetween(56, 136)} />} />
      </ListItem>
    ))}
  </>
);

function NavSidebar() {
  return (
    <>
      <List>
        <IconList count={2} />
      </List>
      <Divider />
      <List>
        <IconList count={1} />
        <InsetList count={2} />
      </List>
      <Divider />
      <List>
        <IconList count={1} />
        <InsetList count={2} />
      </List>
    </>
  );
}

export default NavSidebar;

// export { NavSidebarMockup, InsetList, IconList };
