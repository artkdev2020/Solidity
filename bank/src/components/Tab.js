import React from "react";
import { Tab as BootstrapTab } from "react-bootstrap";

const Tab = ({ eventKey, title, children }) => (
  <BootstrapTab eventKey={eventKey} title={title}>
    {children}
  </BootstrapTab>
);

export default Tab;
