import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'

function Admin() {
    const [signedIn, setSignedIn] = useState(false)
    const [center, setCenter] = useState('')
    const [availableStocks, setAvailableStocks] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
    })
    const [orderedStocks, setOrderedStocks] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
    })
    const [registeredStocks, setRegisteredStocks] = useState({})

    const register = (e) => {}

    const signIn = (e) => {}

    const table = (data) => {
        return (
            <Table>
                <tr>
                    <th>Vaccine A</th>
                    <th>Vaccine B</th>
                    <th>Vaccine C</th>
                    <th>Vaccine D</th>
                </tr>
                <tr>
                    <td>{data['1']}</td>
                    <td>{data['1']}</td>
                    <td>{data['1']}</td>
                    <td>{data['1']}</td>
                </tr>
            </Table>
        )
    }

    const userProfile = () => {
        return (
            <>
                <div>
                    <h1>Center No: {center}</h1>
                    <h1>Available Stocks</h1>
                    {table(availableStocks)}
                    <h1>Ordered Stocks</h1>
                    {table(orderedStocks)}

                    <h1>Registered Stocks</h1>

                    <h1>Vaccination Done</h1>
                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>Aadhar Number</Form.Label>
                        <Form.Control
                            onClick={(e) => console.log(e.target.value)}
                            type='number'
                            placeholder='Enter Aadhar Number'
                        />
                    </Form.Group>
                    <Button onClick={(e) => register(e)} variant='primary'>
                        Done
                    </Button>
                </div>
            </>
        )
    }

    const form = () => {
        return (
            <>
                <Button onClick={(e) => register(e)} variant='primary'>
                    Register
                </Button>{' '}
                <Button onClick={(e) => signIn(e)} variant='primary'>
                    Sign In
                </Button>
            </>
        )
    }
    return <>{signedIn ? userProfile() : form()}</>
}

export default Admin
