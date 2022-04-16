import React, { useEffect, useState } from 'react'
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./getWeb3";
import Beneficiary from './components/Beneficiary/Beneficiary'
import * as bst from 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Admin from './components/Admin/Admin'
import Manufacturer from './components/Manufacturer/Manufacturer'

function App() {
    // const [values, setValues] = useState({ storageValue: 0, web3: null, accounts: null, contract: null })

    // const componentDidMount = async () => {
    //   try {
    //     // Get network provider and web3 instance.
    //     const web3 = await getWeb3();

    //     // Use web3 to get the user's accounts.
    //     const accounts = await web3.eth.getAccounts();

    //     // Get the contract instance.
    //     const networkId = 5777;
    //     const deployedNetwork = SimpleStorageContract.networks[networkId];
    //     const instance = new web3.eth.Contract(
    //       SimpleStorageContract.abi,
    //       deployedNetwork && deployedNetwork.address,
    //     );

    //     // Set web3, accounts, and contract to the state, and then proceed with an
    //     // example of interacting with the contract's methods.
    //     setValues({...values, contract: instance, accounts, web3});
    //   } catch (error) {
    //     // Catch any errors for any of the above operations.
    //     alert(
    //       `Failed to load web3, accounts, or contract. Check console for details.`,
    //     );
    //     console.error(error);
    //   }
    // };

    // const runExample = async () => {
    //   const { accounts, contract } = values;
    //   if(!contract)
    //     return
    //   console.log(contract)

    //   // Stores a given value, 5 by default.
    //   await contract.methods.set(29).send({ from: accounts[0] });

    //   // Get the value from the contract to prove it worked.
    //   const response = await contract.methods.get().call();

    //   // Update state with the result.
    //   setValues({...values,  storageValue: response });
    // };

    // useEffect(runExample, [values])

    // if (!values.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
        <>
            <BrowserRouter>
                <Navbar bg='primary' variant='dark'>
                    <Container>
                        <Navbar.Brand href='#home'>VSCM</Navbar.Brand>
                        <Nav className='me-auto'>
                            <Nav.Link>
                                <Link to='/beneficiary' className='link'>
                                    Beneficiary
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to='/admin' className='link'>
                                    Admin
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to='/manufacturer' className='link'>
                                    Manufacturer
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to='/delivery' className='link'>
                                    Delivery
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Container>
                    <Routes>
                        <Route
                            path='beneficiary'
                            element={<Beneficiary />}
                            exact
                        />
                        <Route
                            path='admin'
                            element={<Admin />}
                            exact
                        />
                        <Route
                            path='manufacturer'
                            element={<Manufacturer />}
                            exact
                        />
                    </Routes>
                </Container>
            </BrowserRouter>
        </>
    )
}

export default App
