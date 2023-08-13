import React from "react";
import Box from "@mui/material/Box";

// Create Circle shape as React functional component
const Circle = ({ fontSize, collapsed }) => (
  <div
    style={{
      width: collapsed ? 36 : 48,
      height: collapsed ? 36 : 48,
      borderRadius: "50%",
      backgroundColor: "#e0e0e0",
      transition: "0.2s",
    }}
  />
);

// Create Word shape as React functional component
const Word = (props) => (
  <div
    style={{
      height: props.height || 16,
      width: "100%",
      borderRadius: props.borderRadius || 1,
      backgroundColor: "#e0e0e0",
    }}
  />
);

function SideNavUserInfo({ collapsed, ...props }) {
  return (
    <Box
      sx={{
        borderRadius: 1,
        bgcolor: "grey.50",
        p: 1.5,
        display: "flex",
        alignItems: "center",
        ...props.sx,
      }}
      {...props}
    >
      <Circle collapsed={collapsed} />
      {!collapsed && (
        <Box sx={{ ml: 1.5 }}>
          <Word />
          <Word sx={{ height: 12, borderRadius: 2 }} />
        </Box>
      )}
    </Box>
  );
}


export default SideNavUserInfo;
