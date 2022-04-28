import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'

function Admin(props) {
    const [signedIn, setSignedIn] = useState(false)
    const [aadharChosen, setAadharChosen] = useState(0)
    const [center, setCenter] = useState('')
    const [msg, setMsg] = useState('')
    const [orderVaccine, setOrderVaccine] = useState(1)
    const [orderQty, setOrderQty] = useState(0)
    const [orderMsg, setOrderMsg] = useState('')
    const [manufacturerSelected, setManufacturerSelected] = useState(-1)
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
    const [allManufacturers, setAllManufacturers] = useState([])
    const [weiValue, setWeiValue] = useState(0)

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
            response.events.AdminInfo.returnValues['0'][0] ===
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
            const manufacturers = await props.values.contract.methods
                .getAllManufacturers()
                .send({ from: props.values.accounts[0] })
            const data =
                manufacturers.events.AllManufacturersInfo.returnValues['0']
            console.log('Result', data)
            const arr = []
            for (let i = 0; i < data.length; i++) {
                arr.push({
                    address: data[i][0],
                    1: data[i][1][0],
                    2: data[i][1][1],
                    3: data[i][1][2],
                    4: data[i][1][3],
                    _1: data[i][4],
                    _2: data[i][5],
                    _3: data[i][6],
                    _4: data[i][7],
                })
            }
            setAllManufacturers(arr)
            setManufacturerSelected(arr.length > 0 ? 0 : '')
            setSignedIn(true)
        }
    }

    const table = (data) => {
        if (data)
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
        return null
    }
    const priceList = () => {
        if (allManufacturers)
            return (
                <>
                    <h4>Price</h4>
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
                                <td>
                                    {Number(
                                        allManufacturers[
                                            Number(manufacturerSelected)
                                        ]['_1']
                                    ) / 1000000000}
                                </td>
                                <td>
                                    {Number(
                                        allManufacturers[
                                            Number(manufacturerSelected)
                                        ]['_2']
                                    ) / 1000000000}
                                </td>
                                <td>
                                    {Number(
                                        allManufacturers[
                                            Number(manufacturerSelected)
                                        ]['_3']
                                    ) / 1000000000}
                                </td>
                                <td>
                                    {Number(
                                        allManufacturers[
                                            Number(manufacturerSelected)
                                        ]['_4']
                                    ) / 1000000000}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </>
            )
        return null
    }

    const manufacturerList = () => {
        let k = 0
        return allManufacturers.map((manufacturer) => {
            return (
                <option value={k++} key={k++}>
                    {manufacturer.address}
                </option>
            )
        })
    }

    const changeManufacturerSelected = (e) => {
        setManufacturerSelected(e.target.value)
    }

    const changeQty = (e) => {
        setOrderQty(e.target.value)
    }

    const changeVaccine = (e) => {
        setOrderVaccine(e.target.value)
    }

    const orderStock = async (e) => {
        e.preventDefault()
        console.log(orderVaccine, orderQty)
        console.log(
            allManufacturers[Number(manufacturerSelected)][String(orderVaccine)]
        )
        if (
            Number(orderQty) >
            Number(
                allManufacturers[Number(manufacturerSelected)][
                    String(orderVaccine)
                ]
            )
        ) {
            setOrderMsg(
                'This manufacturer does not have that many vaccines available with it'
            )
        } else {
            const response = await props.values.contract.methods
                .adminCreateOrder(
                    Number(orderVaccine),
                    Number(orderQty),
                    allManufacturers[Number(manufacturerSelected)].address
                )
                .send({
                    from: props.values.accounts[0],
                    value:
                        Number(orderQty) *
                        Number(
                            allManufacturers[Number(manufacturerSelected)][
                                '_' + orderVaccine
                            ]
                        ),
                })
            console.log(response)
            setOrderedStocks({
                ...orderedStocks,
                [String(orderVaccine)]:
                    Number(orderedStocks[String(orderVaccine)]) +
                    Number(orderQty),
            })
            const arr = []
            for (let i = 0; i < allManufacturers.length; i++) {
                if (i == Number(manufacturerSelected)) {
                    arr.push({
                        ...allManufacturers,
                        [String(orderVaccine)]:
                            allManufacturers[i][String(orderVaccine)] -
                            orderQty,
                    })
                } else {
                    arr.push({ ...allManufacturers })
                }
            }
            setAllManufacturers(arr)
        }
    }

    const vaccinationDone = async () => {
        const response = await props.values.contract.methods
            .adminVaccinationDone(aadharChosen)
            .send({ from: props.values.accounts[0] })
        console.log(response)
    }

    const userProfile = () => {
        return (
            <>
                <div>
                    <h1>Center No: {center}</h1>
                    <div className='card'>
                        <h1>Available Stocks</h1>
                        {table(availableStocks)}
                    </div>
                    <div className='card'>
                        <h1>Ordered Stocks</h1>
                        {table(orderedStocks)}
                    </div>
                    <div className='card'>
                        <h1>Registered Stocks</h1>
                        {table(registeredStocks)}
                    </div>
                    <div className='card'>
                        <h1>Order Vaccines</h1>
                        <br />
                        <Form.Group className='mb-3'>
                            <Form.Label>Select Manufacturer</Form.Label>
                            <Form.Select
                                onSelect={(e) =>
                                    changeManufacturerSelected(e.target.value)
                                }
                            >
                                {manufacturerList()}
                            </Form.Select>
                        </Form.Group>
                        <h4>Quantity Available</h4>
                        {table(allManufacturers[Number(manufacturerSelected)])}
                        {priceList()}
                        <Form.Group className='mb-3'>
                            <Form.Label>Select Vaccine Type</Form.Label>
                            <Form.Select onChange={(e) => changeVaccine(e)}>
                                <option value={'1'}>A</option>
                                <option value={'2'}>B</option>
                                <option value={'3'}>C</option>
                                <option value={'4'}>D</option>
                            </Form.Select>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                onKeyUp={(e) => changeQty(e)}
                                type='number'
                                placeholder='Enter Quantity of Vaccine'
                            />
                            <br />
                            <Button
                                onClick={(e) => orderStock(e)}
                                variant='primary'
                            >
                                Pay{' '}
                                {(Number(orderQty) *
                                    Number(
                                        allManufacturers[
                                            Number(manufacturerSelected)
                                        ]['_' + orderVaccine]
                                    )) /
                                    100000000}{' '}
                                Gwei
                            </Button>
                            <h4>{orderMsg}</h4>
                        </Form.Group>
                    </div>
                    <div className='card'>
                        <h1>Complete Vaccination Procedure</h1>
                        <br />
                        <Form>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                onKeyUp={(e) => setAadharChosen(e.target.value)}
                                type='number'
                                placeholder='Enter Aadhar of the beneficiary'
                            />
                            <br />
                            <Button onClick={(e) => vaccinationDone()}>
                                Done
                            </Button>
                        </Form>
                    </div>
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
