import React, { useState } from 'react'
import { Form, Button, Table } from 'react-bootstrap'

function Manufacturer(props) {
    const [signedIn, setSignedIn] = useState(false)
    const [msg, setMsg] = useState('')
    const [addQty, setAddQty] = useState(0)
    const [addVaccine, setAddVaccine] = useState(1)
    const [addMsg, setAddMsg] = useState('')
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
    const [vaccinePrice, setVaccinePrice] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
    })

    const register = async (e) => {
        e.preventDefault()
        const response = await props.values.contract.methods
            .createManufacturer()
            .send({ from: props.values.accounts[0] })
        setMsg(
            response.events.Success.returnValues.success
                ? 'Registered Successfully'
                : 'This address is already registered as Manufacturer'
        )
    }

    const changePriceA = (e) => {
        setVaccinePrice({ ...vaccinePrice, 1: e })
    }
    const changePriceB = (e) => {
        setVaccinePrice({ ...vaccinePrice, 2: e })
    }
    const changePriceC = (e) => {
        setVaccinePrice({ ...vaccinePrice, 3: e })
    }
    const changePriceD = (e) => {
        setVaccinePrice({ ...vaccinePrice, 4: e })
    }

    const changeVaccinePrice = async () => {
        const response = await props.values.contract.methods
            .manufacturerSetPrice(
                Number(vaccinePrice['1']),
                Number(vaccinePrice['2']),
                Number(vaccinePrice['3']),
                Number(vaccinePrice['4'])
            )
            .send({ from: props.values.accounts[0] })
        console.log(response)
        // console.log(vaccinePrice)
    }

    const signIn = async (e) => {
        e.preventDefault()
        const response = await props.values.contract.methods
            .getManufacturerInfo()
            .send({ from: props.values.accounts[0] })
        console.log(response.events.ManufacturerInfo.returnValues)
        if (
            response.events.ManufacturerInfo.returnValues['0'][0] ===
            '0x0000000000000000000000000000000000000000'
        ) {
            setMsg('You are not registered with us as a manufacturer')
            return
        }
        setAvailableStocks({
            1: response.events.ManufacturerInfo.returnValues['0'][1][0],
            2: response.events.ManufacturerInfo.returnValues['0'][1][1],
            3: response.events.ManufacturerInfo.returnValues['0'][1][2],
            4: response.events.ManufacturerInfo.returnValues['0'][1][3],
        })
        setOrderedStocks({
            1: response.events.ManufacturerInfo.returnValues['0'][2][0],
            2: response.events.ManufacturerInfo.returnValues['0'][2][1],
            3: response.events.ManufacturerInfo.returnValues['0'][2][2],
            4: response.events.ManufacturerInfo.returnValues['0'][2][3],
        })
        setOutForDeliveryStocks({
            1: response.events.ManufacturerInfo.returnValues['0'][3][0],
            2: response.events.ManufacturerInfo.returnValues['0'][3][1],
            3: response.events.ManufacturerInfo.returnValues['0'][3][2],
            4: response.events.ManufacturerInfo.returnValues['0'][3][3],
        })
        setVaccinePrice({
            1: response.events.ManufacturerInfo.returnValues['0'][4],
            2: response.events.ManufacturerInfo.returnValues['0'][5],
            3: response.events.ManufacturerInfo.returnValues['0'][6],
            4: response.events.ManufacturerInfo.returnValues['0'][7],
        })
        setSignedIn(true)
    }

    const addStock = async () => {
        const response = await props.values.contract.methods
            .manufacturerAddStock(Number(addVaccine), Number(addQty))
            .send({ from: props.values.accounts[0] })
        setAddMsg(
            response.events.Success.returnValues.success
                ? 'Added Successfully'
                : 'There was some problem in adding the stocks'
        )
        if (response.events.Success.returnValues.success) {
            setAvailableStocks({
                ...availableStocks,
                [addVaccine]:
                    Number(addQty) + Number(availableStocks[addVaccine]),
            })
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
                    <h1>Available Stocks</h1>
                    {table(availableStocks)}
                    <h1>Ordered Stocks</h1>
                    {table(orderedStocks)}
                    <h1>Out for Delivery Stocks</h1>
                    {table(outForDeliveryStocks)}
                    <h1>Add Stocks</h1>
                    <h3>{addMsg}</h3>
                    <Form.Group className='mb-3'>
                        <Form.Label>Select Vaccine Type</Form.Label>
                        <Form.Select
                            onChange={(e) => setAddVaccine(e.target.value)}
                        >
                            <option value={'1'}>A</option>
                            <option value={'2'}>B</option>
                            <option value={'3'}>C</option>
                            <option value={'4'}>D</option>
                        </Form.Select>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            onKeyUp={(e) => setAddQty(e.target.value)}
                            type='number'
                            placeholder='Enter Quantity of Vaccine'
                        />
                        <br />
                        <Button onClick={(e) => addStock(e)} variant='primary'>
                            Add
                        </Button>
                    </Form.Group>
                    <h1>Change Stocks Price</h1>
                    <Form.Group className='mb-3'>
                        <Form.Label>Price of vaccine A</Form.Label>
                        <Form.Control
                            onKeyUp={(e) => changePriceA(e.target.value)}
                            type='number'
                            defaultValue={vaccinePrice['1']}
                        />
                        <br />
                        <Button
                            onClick={(e) => changeVaccinePrice(e)}
                            variant='primary'
                        >
                            Save
                        </Button>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Price of vaccine B</Form.Label>
                        <Form.Control
                            onKeyUp={(e) => changePriceB(e.target.value)}
                            type='number'
                            defaultValue={vaccinePrice['2']}
                        />
                        <br />
                        <Button
                            onClick={(e) => changeVaccinePrice(e)}
                            variant='primary'
                        >
                            Save
                        </Button>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Price of vaccine C</Form.Label>
                        <Form.Control
                            onKeyUp={(e) => changePriceC(e.target.value)}
                            type='number'
                            defaultValue={vaccinePrice['3']}
                        />
                        <br />
                        <Button
                            onClick={(e) => changeVaccinePrice(e)}
                            variant='primary'
                        >
                            Save
                        </Button>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Price of vaccine D</Form.Label>
                        <Form.Control
                            onKeyUp={(e) => changePriceD(e.target.value)}
                            type='number'
                            defaultValue={vaccinePrice['4']}
                        />
                        <br />
                        <Button
                            onClick={(e) => changeVaccinePrice(e)}
                            variant='primary'
                        >
                            Save
                        </Button>
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

export default Manufacturer
