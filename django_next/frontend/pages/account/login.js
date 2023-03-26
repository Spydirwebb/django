import Layout from '../../components/Layout'
import Link from 'next/link'
import styled from "@emotion/styled"
import { CardContent, Card, Typography, TextField, Button } from '@mui/material'
import { useState, useContext } from 'react'
import AuthenticationContext from '../../context/authenticationContext'

export default function LoginPage(  ) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {login}= useContext(AuthenticationContext)

    const submitHandler = e => {
        e.preventDefault()
        login({username, password})
    }

    return (
      <LoginPageStyled>
      <Layout>
        <div>
            <div className='form'>
                <Typography variant='h3' className='title'>Login</Typography>
                <Card>
                    <CardContent>
                        <form onSubmit={submitHandler}>
                            <div className='input'>
                                <TextField label='Username' fullWidth  onChange={e=> setUsername(e.target.value)} value={username}/>
                            </div>
                            <div className='input'>
                                <TextField label='Password' inputProps={{'type': 'password'}} fullWidth onChange={e=> setPassword(e.target.value)} value={password}/>
                            </div>
                            <div className='input'>
                                <Button variant='contained' color='primary' type="submit">Login</Button>
                            </div>
                            <div className='linkContainer'>
                                <Link href='account/register' className='link'>Don't have an account? Sign Up</Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
      </Layout>
      </LoginPageStyled>
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
const LoginPageStyled = styled("LoginPage")({
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
