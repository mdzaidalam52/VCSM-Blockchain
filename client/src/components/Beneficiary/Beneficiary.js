import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Button, Dropdown } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import getWeb3 from '../../getWeb3'
import Actors from '../../contracts/Actors.json'

function Beneficiary() {
    const [aadhar, setAadhar] = useState('')
    const [signedIn, setSignedIn] = useState(false)
    const [msg, setMsg] = useState('')
    const [adminChosen, setAdminChosen] = useState(false)
    const [centerNumber, setCenterNumber] = useState(0)

    let v = { web3: null, accounts: null, contract: null }
    const connectToBlockchain = async () => {
        try {
            const web3 = await getWeb3()
            const accounts = await web3.eth.getAccounts()
            const networkId = 5777
            const deployedNetwork = Actors.networks[networkId]
            const instance = new web3.eth.Contract(
                Actors.abi,
                deployedNetwork && deployedNetwork.address
            )
            v = { contract: instance, accounts, web3 }
        } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            )
            console.error(error)
        }
    }
    connectToBlockchain()
    console.log(v)

    const register = async (e) => {
        e.preventDefault()
        console.log('register')
        const response = await v.contract.methods
            .createBenefeciary(Number(aadhar))
            .call()
        console.log(response)
        if (response) {
            setMsg('Registeration Successful')
        }
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
