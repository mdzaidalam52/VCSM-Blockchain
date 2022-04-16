import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Button, DropdownButton, Dropdown } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

function Beneficiary() {
    const [aadhar, setAadhar] = useState('')
    const [signedIn, setSignedIn] = useState(true)
    const [msg, setMsg] = useState('')
    const [adminChosen, setAdminChosen] = useState(false)
    const [centerNumber, setCenterNumber] = useState(0)

    const register = (e) => {
        e.preventDefault()
        console.log('register')
    }

    const signIn = (e) => {
        e.preventDefault()
        console.log('signin')
    }

    const getInfoAdmin = (center) => {
        console.log()
    }

    const changeCenterNumber = (e) => {
        setCenterNumber(e.target.value)
        console.log(centerNumber)
    }

    const userProfile = () => {
        return (
            <Card className='text-center'>
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
        )
    }

    const form = () => {
        return (
            <>
                <Form.Group className='mb-3'>
                    <Form.Label>Aadhar Number</Form.Label>
                    <Form.Control
                        onClick={(e) => setAadhar(e.target.value)}
                        type='number'
                        placeholder='Enter you Aadhar Number'
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
