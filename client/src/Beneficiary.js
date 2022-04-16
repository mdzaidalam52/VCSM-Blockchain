import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Button, DropdownButton, Dropdown } from 'react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'

function Beneficiary() {
    const [aadhar, setAadhar] = useState('')
    const [signedIn, setSignedIn] = useState(false)
    const [msg, setMsg] = useState('')

    const register = (e) => {
        e.preventDefault()
        console.log('register')
    }

    const signIn = (e) => {
        e.preventDefault()
        console.log('signin')
    }

    const userProfile = () => {
        return (
            <Card className='text-center'>
                <Card.Header>Beneficiary Page</Card.Header>
                <Card.Body>
                    <Card.Title>{aadhar}</Card.Title>
                    <Button variant='primary'>Dose 1</Button>{' '}
                    <Button variant='primary'>Dose 2</Button>{' '}
                    <Dropdown.Divider />
                    <Form.Select id='disabledSelect'>
                        <option>Vaccine A</option>
                        <option>Vaccine B</option>
                        <option>Vaccine C</option>
                        <option>Vaccine D</option>
                    </Form.Select>
                </Card.Body>
            </Card>
        )
    }

    const form = () => {
        return (
            <>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Aadhar Number</Form.Label>
                    <Form.Control
                        onClick={(e) => setAadhar(e.target.value)}
                        type='number'
                        placeholder='Enter you Aadhar Number'
                    />
                </Form.Group>
                <Button onClick={e => register(e)} variant='primary'>
                    Register
                </Button>{' '}
                <Button onClick={e => signIn(e)} variant='primary'>
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
