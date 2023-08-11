import React from 'react';
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function FooterRooted() {
  return <footer><NaturePeopleIcon/>  &nbsp; Rooted From Within</footer>;
}

export default FooterRooted;
