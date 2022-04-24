import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Button, Dropdown } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

function Beneficiary(props) {
    const [aadhar, setAadhar] = useState(0)
    const [signedIn, setSignedIn] = useState(false)
    const [msg, setMsg] = useState('')
    const [adminChosen, setAdminChosen] = useState(false)
    const [centerNumber, setCenterNumber] = useState(0)
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
        if(response.events.BeneficiaryInfo.returnValues.info[1] == 10){
            setMsg("This Aadhar is not registered with us")
            return
        }
        setBeneficiaryInfo({
            vaccine: response.events.BeneficiaryInfo.returnValues.info[1],
            numberOfDoses: response.events.BeneficiaryInfo.returnValues.info[0],
        })
        console.log(response)
        setSignedIn(true)
    }

    const getAllAdmins = async () => {}

    const getInfoAdmin = (center) => {
        console.log(center)
    }

    const changeCenterNumber = (e) => {
        setCenterNumber(e.target.value)
        console.log(centerNumber)
    }

    const changeAadhar = (e) => {
        setAadhar(e.target.value)
        console.log(aadhar)
    }

    return (
        <div className='beneficiary_container'>
            <div hidden={signedIn}>
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
            </div>

            <Card hidden={!signedIn} className='text-center'>
                <Card.Header>{aadhar}</Card.Header>
                <Card.Body>
                    <Card.Title>Aadhar Number: {aadhar}</Card.Title>
                    <Form.Group className='mb-3'>
                        <Form.Label>Center Number</Form.Label>
                        <Form.Control
                            onKeyUp={(e) => changeCenterNumber(e)}
                            type='number'
                            placeholder='Enter Center Number'
                        />
                    </Form.Group>
                    <Button onClick={(e) => getInfoAdmin(e)} variant='primary'>
                        Search
                    </Button>
                    {() => {
                        if (adminChosen) {
                            return (
                                <>
                                    <Form.Select>
                                        <option>Vaccine A</option>
                                        <option>Vaccine B</option>
                                        <option>Vaccine C</option>
                                        <option>Vaccine D</option>
                                    </Form.Select>
                                    <Dropdown.Divider />
                                    <Button variant='primary'>
                                        Dose 1
                                    </Button>{' '}
                                    <Button variant='primary'>Dose 2</Button>{' '}
                                </>
                            )
                        }
                    }}
                </Card.Body>
            </Card>
        </div>
    )
}
export default Beneficiary
