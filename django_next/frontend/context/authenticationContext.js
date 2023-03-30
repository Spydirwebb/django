import { createContext, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const AuthenticationContext = createContext()

export const AuthenticationProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [accessToken, setAccessToken] = useState(null)
	const [error, setError] = useState(null)

	const router = useRouter()

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

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/login/`, body, config)

    }
    return (
        <AuthenticationContext.Provider value={{ user, accessToken, error, login }}>
            {children}
        </AuthenticationContext.Provider>
    )
    
}

export default AuthenticationContext
