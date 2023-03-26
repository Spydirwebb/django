import { useEffect } from 'react'
import '../styles/globals.css'
import { AuthenticationProvider } from '../context/authenticationContext'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  },[])
  return (
    <AuthenticationProvider>
      <Component {...pageProps} />
    </AuthenticationProvider>
    
  )
}
