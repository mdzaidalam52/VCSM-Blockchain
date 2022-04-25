import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Button, Dropdown, Table } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

function Beneficiary(props) {
    const [aadhar, setAadhar] = useState(0)
    const [signedIn, setSignedIn] = useState(false)
    const [msg, setMsg] = useState('')
    const [adminChosen, setAdminChosen] = useState(false)
    const [centerNumber, setCenterNumber] = useState(1)
    const [adminArray, setAdminArray] = useState([])
    const [BeneficiaryInfo, setBeneficiaryInfo] = useState({
        vaccine: 0,
        numberOfDoses: 0,
    })

    const register = async (e) => {
        e.preventDefault()
        const response = await props.values.contract.methods
            .createBenefeciary(Number(aadhar))
            .send({ from: props.values.accounts[0] })
        setMsg(
            response.events.Success.returnValues.success
                ? 'Registered Successfully'
                : 'Aadhar Number is already registered'
        )
    }

    const signIn = async (e) => {
        e.preventDefault()
        const response = await props.values.contract.methods
            .getBeneficiaryInfo(Number(aadhar))
            .send({ from: props.values.accounts[0] })
        if (response.events.BeneficiaryInfo.returnValues.info[1] == 10) {
            setMsg('This Aadhar is not registered with us')
            return
        }
        setBeneficiaryInfo({
            vaccine: response.events.BeneficiaryInfo.returnValues.info[1],
            numberOfDoses: response.events.BeneficiaryInfo.returnValues.info[0],
        })
        getAllAdmins()
        setSignedIn(true)
    }

    const getAllAdmins = async () => {
        const response = await props.values.contract.methods
            .getAllAdmins()
            .send({ from: props.values.accounts[0] })
        const data = response.events.AllAdminsInfo.returnValues['0']
        const arr = []
        for (let i = 0; i < data.length; i++) {
            arr.push({
                address: data[i][0],
                center_no: data[i][1],
                1: data[i][2][0],
                2: data[i][2][1],
                3: data[i][2][2],
                4: data[i][2][3],
            })
        }
        setAdminArray(arr)
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
        else return null
    }

    const getInfoAdmin = (center) => {
    }

    const changeCenterNumber = (e) => {
        setCenterNumber(e.target.value)
    }

    const changeAadhar = (e) => {
        setAadhar(e.target.value)
    }

    const adminList = () => {
        return adminArray.map(admin => {
            return <option value={admin.center_no} key={admin.center_no}>{admin.center_no}</option>
        })
    }
    const userProfile = () => {
        return (
            <>
                <Card.Header>{aadhar}</Card.Header>
                <Card.Body>
                    <Card.Title>Aadhar Number: {aadhar}</Card.Title>
                    <Form.Group className='mb-3'>
                        <Form.Label>Center Number</Form.Label>
                        <Form.Select
                            onSelect={(e) =>
                                setCenterNumber(e.target.value)
                            }
                        >
                            {adminList()}
                        </Form.Select>
                    </Form.Group>
                    {table(adminArray[Number(centerNumber) - 1])}
                    <Form.Select>
                        <option>Vaccine A</option>
                        <option>Vaccine B</option>
                        <option>Vaccine C</option>
                        <option>Vaccine D</option>
                    </Form.Select>
                    <Dropdown.Divider />
                    <Button variant='primary'>Dose 1</Button>{' '}
                    <Button variant='primary'>Dose 2</Button>{' '}
                </Card.Body>
            </>
        )
    }

    const form = () => {
        return (
            <>
                <Form.Group className='mb-3'>
                    <Form.Label>Aadhar Number</Form.Label>
                    <Form.Control
                        onChange={(e) => changeAadhar(e)}
                        type='number'
                        placeholder='Enter your Aadhar Number'
                    />
                </Form.Group>
                <Button onClick={(e) => register(e)} variant='primary'>
                    Register
                </Button>{' '}
                <Button onClick={(e) => signIn(e)} variant='primary'>
                    Sign In
                </Button>
                <h1>{msg}</h1>
            </>
        )
    }
    return (
        <div className='beneficiary_container'>
            {signedIn ? userProfile() : form()}
        </div>
    )
}
export default Beneficiary
