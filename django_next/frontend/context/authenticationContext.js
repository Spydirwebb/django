import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const AuthenticationContext = createContext()

export const AuthenticationProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [accessToken, setAccessToken] = useState(null)
	const [error, setError] = useState(null)

	const router = useRouter()

	useEffect(() => {
		checkIfUserLoggedIn()
	}, [])

	// Login User
	const login = async({username, password}) => {

        const config = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}

		const body = {
			username,
			password
		}

		try{
			// call nextjs api function to get user access token
			const { data:accessResponse } = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/login/`, body, config)
			
			if(accessResponse && accessResponse.user) {
				setUser(accessResponse.user)
			}
			if(accessResponse && accessResponse.access){
				setAccessToken(accessResponse.access)
			}
			router.push('/')
		} catch(error){
			if (error.response && error.response.data) {
				setError(error.response.data.message)
				return
            } else if (error.request) {
				setError('Something went wrong')
				return
            } else {
				setError('Something went wrong')
				return
            }
		}
    }

	// register a new user
	const register = async({username, email, password}) => {

        const config = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}

		const body = {
			username,
			email,
			password
		}

		try{
			// call nextjs api function to create a user
			await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/register/`, body, config)
			login({ username, password })
			
		} catch(error){
			if (error.response && error.response.data) {
				setError(error.response.data.message)
				return
            } else if (error.request) {
				setError('Something went wrong')
				return
            } else {
				setError('Something went wrong')
				return
            }
		}
    }

	// log out a logged in user
	const logout = async() => {
		try {
			// remove the http only cookie
			await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/logout/`)

			//remove the access token and the user from the state
			setUser(null)
			setAccessToken(null)
		}catch(error){
			if (error.response && error.response.data) {
				setError(error.response.data.message)
				return
            } else if (error.request) {
				setError('Something went wrong')
				return
            } else {
				setError('Something went wrong')
				return
            }
		}
	}

	// check if a user is logged in on render/refresh
	const checkIfUserLoggedIn = async () => {
		try {
			// api request to api/user in nextjs
			const { data } = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/user`)

			// set user and access token in state
			setUser(data.user)
			setAccessToken(data.access)
		} catch(error) {
			if (error.response & error.response.data) {
		  		setError(error.response.data.message)
		  		return      
		    } else if (error.request) {
			    setError('Something went wrong')
			    return  
		    } else {
				setError('Something went wrong')
				return
		    }
		    console.error('Error', error.message);
		    setError('Something went wrong')
		    return
		}
	}

    return (
        <AuthenticationContext.Provider value={{ user, accessToken, error, login, logout, register }}>
            {children}
        </AuthenticationContext.Provider>
    )
    
}

export default AuthenticationContext
