import React, { useState } from 'react'
import { Form, Button, Table } from 'react-bootstrap'

function Manufacturer() {
    const [signedIn, setSignedIn] = useState(false)
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
    const [outForDeliveryStocks, setOutForDeliveryStocks] = useState({
      1: 0,
      2: 0,
      3: 0,
      4: 0,
  })

    const register = (e) => {
        e.preventDefault()
    }

    const signIn = (e) => {
        e.preventDefault()
    }

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
                    <h1>Available Stocks</h1>
                    {table(availableStocks)}
                    <h1>Ordered Stocks</h1>
                    {table(orderedStocks)}
                    <h1>Out for Delivery Stocks</h1>
                    {table(outForDeliveryStocks)}
                    <h1>Dispatch Order</h1>
                    
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

export default Manufacturer
