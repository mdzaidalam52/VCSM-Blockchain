import React, { useEffect, useState } from 'react'
import Actors from "./contracts/Actors.json";
import getWeb3 from "./getWeb3";
import Beneficiary from './components/Beneficiary/Beneficiary'
import * as bst from 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Admin from './components/Admin/Admin'
import Manufacturer from './components/Manufacturer/Manufacturer'

function App() {
    const [values, setValues] = useState({ web3: null, accounts: null, contract: null })

    async function loadValues() {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3()

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts()

            // Get the contract instance.
            const networkId = 5777
            const deployedNetwork = Actors.networks[networkId]
            const instance = new web3.eth.Contract(
                Actors.abi,
                deployedNetwork && deployedNetwork.address
            )
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            setValues({ web3, accounts, contract: instance })
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            )
            console.error(error)
        }
    }

    useEffect(() => {
        loadValues()
    }, [])

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
                        </Nav>
                    </Container>
                </Navbar>
                <Container>
                    <Routes>
                        <Route
                            path='beneficiary'
                            element={<Beneficiary values={values}/>}
                            exact
                        />
                        <Route
                            path='admin'
                            element={<Admin values = {values}/>}
                            exact
                        />
                        <Route
                            path='manufacturer'
                            element={<Manufacturer values = {values} />}
                            exact
                        />
                    </Routes>
                </Container>
            </BrowserRouter>
        </>
    )
}

export default App
