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

        const {data: accessResponse} = await axios.post(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/token/`, body, config)
        accessToken = accessResponse.accessResponse

        if (accessToken) {
            const userConfig = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
            const {data:userData} = await axios.get(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/user/`, userConfig)
            res.status(200).json({user:userData, access: accessToken})
        }
        
        console.log(data)
    } else{
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `Method ${req.method} is not allowed`})
    }
    
}