import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

function Beneficiary() {
  // const [aadharNumber, setAadharNumber] = useState("");
  // const [password, setPassword] = useState("");
 const[statusCode,setStatusCode] = useState(0);


  //   const signIn =(e) =>{
  //     e.preventDefault();
  //     auth
  // .signInWithEmailAndPassword(aadharNumber,password)
  // .then(auth => {
  //   history.push('/')
  // })
  // .catch(error => alert(error.message))

  //   }

  //   const register =(e) =>{
  //     e.preventDefault();
  //     auth
  // .createUserWithAadharNumber(aadharNumber, password)
  // .then((auth) =>{
  //   console.log(auth);
  //   if(auth){
  //     history.push('/')
  //   }
  // })
  // .catch(error => alert(error.message))
  //   }

  const register =() =>{
    setStatusCode();
  }

  const signIn =() =>{
    setStatusCode();
  }

  return (
    <div className="beneficiary_container">
      {/* <h1>I am in beneficiary</h1> */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Aadhar Number</Form.Label>
        <Form.Control type="password" placeholder="Enter you Aadhar Number" />
      </Form.Group>
      <Button onClick={register} variant="primary">
        Register
      </Button>{" "}
      <Button onClick={signIn} variant="primary">
        Sign In
      </Button>
      
      if(statusCode==0){}
      if(statusCode==1){}
      if(statusCode==2){}
     
      <div className="successful_registration">
        <h1>Registration Successful</h1>
      </div>
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
