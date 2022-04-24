import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'

function Admin(props) {
    const [signedIn, setSignedIn] = useState(false)
    const [center, setCenter] = useState('')
    const [msg, setMsg] = useState('')
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
    const [registeredStocks, setRegisteredStocks] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
    })

    const register = async (e) => {
        e.preventDefault()
        const response = await props.values.contract.methods
            .createAdmin()
            .send({ from: props.values.accounts[0] })
        setMsg(
            response.events.Success.returnValues.success
                ? 'Registered Successfully'
                : 'This address is already registered as admin'
        )
    }

    const signIn = async (e) => {
        e.preventDefault()
        const response = await props.values.contract.methods
            .getAdminInfo()
            .send({ from: props.values.accounts[0] })
        if (
            response.events.AdminInfo.returnValues['0'][0] ==
            '0x0000000000000000000000000000000000000000'
        ) {
            setMsg('You are not registered with us')
        } else {
            console.log(response.events.AdminInfo.returnValues)
            setCenter(response.events.AdminInfo.returnValues['0'][1])
            setAvailableStocks({
                1: response.events.AdminInfo.returnValues['0'][2][0],
                2: response.events.AdminInfo.returnValues['0'][2][1],
                3: response.events.AdminInfo.returnValues['0'][2][2],
                4: response.events.AdminInfo.returnValues['0'][2][3],
            })
            setOrderedStocks({
                1: response.events.AdminInfo.returnValues['0'][3][0],
                2: response.events.AdminInfo.returnValues['0'][3][1],
                3: response.events.AdminInfo.returnValues['0'][3][2],
                4: response.events.AdminInfo.returnValues['0'][3][3],
            })
            setRegisteredStocks({
                1: response.events.AdminInfo.returnValues['0'][4][0],
                2: response.events.AdminInfo.returnValues['0'][4][1],
                3: response.events.AdminInfo.returnValues['0'][4][2],
                4: response.events.AdminInfo.returnValues['0'][4][3],
            })
            setSignedIn(true)
        }
    }

    const table = (data) => {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Vaccine A</th>
                        <th>Vaccine B</th>
                        <th>Vaccine C</th>
                        <th>Vaccine D</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data['1']}</td>
                        <td>{data['2']}</td>
                        <td>{data['3']}</td>
                        <td>{data['4']}</td>
                    </tr>
                </tbody>
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
                    {table(registeredStocks)}

                    <h1>Order Vaccines</h1>
                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>Select Manufacturer</Form.Label>
                        
                    </Form.Group>
                </div>
            </>
        )
    }

    const form = () => {
        return (
            <>
                <h1>{msg}</h1>
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
