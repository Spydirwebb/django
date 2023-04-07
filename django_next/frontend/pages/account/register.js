import Layout from '../../components/Layout'
import Link from 'next/link'
import styled from "@emotion/styled"
import { CardContent, Card, Typography, TextField, Button } from '@mui/material'
import { useState, useContext } from 'react'
import AuthenticationContext from '../../context/authenticationContext'

export default function RegisterPage(  ) {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const {register}= useContext(AuthenticationContext)

    const submitHandler = e => {
        e.preventDefault()
        //login({username, password})
        if (password !=password2){
            console.error("Password do not match")
        }
        register({username, email, password})
        console.log(email)
        console.log(username)
        console.log(password)
        console.log(password2)
    }

    return (
      <RegisterPageStyled>
      <Layout>
        <div>
            <div className='form'>
                <Typography variant='h3' className='title'>Register</Typography>
                <Card>
                    <CardContent>
                        <form onSubmit={submitHandler}>
                            <div className='input'>
                                <TextField label='Email' fullWidth  onChange={e=> setEmail(e.target.value)} value={email}/>
                            </div>
                            <div className='input'>
                                <TextField label='Username' fullWidth  onChange={e=> setUsername(e.target.value)} value={username}/>
                            </div>
                            <div className='input'>
                                <TextField label='Password' inputProps={{'type': 'password'}} fullWidth onChange={e=> setPassword(e.target.value)} value={password}/>
                            </div>
                            <div className='input'>
                                <TextField label='Confirm Password' inputProps={{'type': 'password'}} fullWidth onChange={e=> setPassword2(e.target.value)} value={password2}/>
                            </div>
                            <div className='input'>
                                <Button variant='contained' color='primary' type="submit">Register</Button>
                            </div>
                            <div className='linkContainer'>
                                <Link href='/account/login' className='link'>Already have an account? Sign In</Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
      </Layout>
      </RegisterPageStyled>
    )
  }
  
  /*
  export async function getServerSideProps() {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/categories`)
  
    return {
      props: {
        categories: data
      }
    }
  }
*/
const RegisterPageStyled = styled("RegisterPage")({
    '.form': {
        marginTop: '35px',
        width: '50%',
        margin: '0 auto'
    },
    '.title': {
        marginBottom: '8px'
    },
    '.input': {
        margin: '15px 0'
    },
    '.linkContainer':{
        margin: '15px 0'
    },
    '.link':{
        color: '#0645AD',
        transition: '0.3s',
        '&:hover': {
            color: '#3366BB',
            transition: '0.3s',
        }
    },
    '@media only screen and (max-width: 768px)':{
        '.form': {
            width: '100%',
            padding: '0 10px',
        }
    }
    
    
})
