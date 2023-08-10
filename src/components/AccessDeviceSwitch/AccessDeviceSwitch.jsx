import React from "react";
import { styled } from "@mui/material/styles";
import { CheckCircle, Cancel } from "@mui/icons-material";
import Switch from "@mui/material/Switch";
import { renderToStaticMarkup } from "react-dom/server";

const primaryDark = "#1D394F";
const primaryPale = "#F6F8F8";
const primaryLight = "#E0E7EB";

const convertSvg = (svg) => {
  const markup = renderToStaticMarkup(svg);
  const encoded = encodeURIComponent(markup);
  const dataUri = `url('data:image/svg+xml;utf8,${encoded}')`;
  return dataUri;
};

const CheckCircleSvg = (
  <svg xmlns="http://www.w3.org/2000/svg">
    <CheckCircle />
  </svg>
);

const CancelSvg = (
  <svg xmlns="http://www.w3.org/2000/svg">
    <Cancel />
  </svg>
);

const BaseSwitch = styled(Switch)({
    width: 45,
    height: 22,
    padding: 0,
    display: "flex",
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(23px)",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: primaryPale,
        },
      },
    },
    "& .MuiSwitch-thumb": {
      width: 18,
      height: 18,
      borderRadius: "25px",
      backgroundColor: primaryDark,
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      borderRadius: "25px",
      border: `1px solid ${primaryLight}`,
      backgroundColor: primaryPale,
      boxSizing: "border-box",
    },
  });

const SwitchWithIcons = styled(BaseSwitch)({
  "& .MuiSwitch-track": {
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
      top: 11,
    },
    "&:before": {
      backgroundImage: convertSvg(CheckCircleSvg),
      left: 3,
    },
    "&:after": {
      backgroundImage: convertSvg(CancelSvg),
      right: 3,
    },
  },
});

function AccessDeviceSwitch(props) {
    return <SwitchWithIcons {...props} />;
  }
  

export default AccessDeviceSwitch;
