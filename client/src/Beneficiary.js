import React from "react";
import Card from "react-bootstrap/Card";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Beneficiary() {
  return (
    <div className="beneficiary">
      {/* <h1>I am in beneficiary</h1> */}
      <Card className="text-center">
        <Card.Header>Beneficiary Page</Card.Header>
        <Card.Body>
          <Card.Title>Beneficiary Name</Card.Title>
          <Card.Text>Aadhar Number</Card.Text>
          <Button variant="primary">Dose 1</Button>{" "}
          <Button variant="primary">Dose 2</Button> <Dropdown.Divider />
          <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            <Dropdown.Item href="#/action-1">Vaccine A</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Vaccine B</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Vaccine C</Dropdown.Item>
          </DropdownButton>
        </Card.Body>
        <Card.Footer className="text-muted">Register</Card.Footer>
      </Card>
    </div>
  );
}
export default Beneficiary;
