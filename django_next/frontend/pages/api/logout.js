import cookie from 'cookie'

export default async(req, res) => {
    // cookie header to empty string
    res.setHeader('Set-Cookie', cookie.serialize('refresh', '',{
        httpOnly: true,
        secure: false,
        expires: new Date(0),
        sameSite: 'strict',
        path: '/'
    }))
    
    // return something
    res.status(200).json({message: 'User has been logged out'})
}