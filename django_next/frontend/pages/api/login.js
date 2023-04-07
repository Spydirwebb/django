import axios from 'axios'
import cookie from 'cookie'

export default async (req, res) => {
    let accessToken = null

    if (req.method === 'POST'){
        const {username, password} = req.body

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
            // call backend using user credentials to get tokens
            const {data: accessResponse} = await axios.post(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/token/`, body, config)
            accessToken = accessResponse.access
            
            res.setHeader('Set-Cookie', cookie.serialize('refresh', accessResponse.refresh, {
                httpOnly:true,      // blocks client side script from getting the cookie 
                secure: false,      // in production change secure to true (sent of https)
                sameSite: 'strict', // have to be on same origin
                maxAge: 60*60*24,   // 24 hours in seconds
                path:'/'            // make this accessible over entire site
            }
            ))
        } catch(error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
                return res.status(401).json({message: error.response.data.detail})
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.error(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
            console.error(error.config);
            return res.status(500).json({message: 'Something went wrong'})
        }

        if (accessToken) {
            const userConfig = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
            const {data:userData} = await axios.get(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/user/`, userConfig)
            console.log(userData)
            res.status(200).json({user:userData, access: accessToken})
        }
        
    } else{
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `Method ${req.method} is not allowed`})
    }
    
}