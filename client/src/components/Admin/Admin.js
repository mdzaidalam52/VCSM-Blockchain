import React, {useState} from 'react'
import { Button, Form,  } from 'react-bootstrap'

function Admin() {
    const [signedIn, setSignedIn] = useState(false)

    const register = (e) => {
        e.preventDefault()
    }

    const signIn = (e) => {
        e.preventDefault()
    }

    const userProfile = () => {
      return (
        <>
          <div>
            <h1>Center No</h1>
            <h1>Available Stocks</h1>
            <h1>Ordered Stocks</h1>
            <h1>Vaccination Done</h1>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Aadhar Number</Form.Label>
                    <Form.Control
                        onClick={e => console.log(e.target.value)}
                        type='number'
                        placeholder='Enter you Aadhar Number'
                    />
                </Form.Group>
                <Button onClick={e => register(e)} variant='primary'>
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
    return <>{signedIn ? form() : userProfile()}</>
}

export default Admin
