import Nav from './Nav'
import styles from './Layout.module.css'

const Layout = ({children}) => {
    return (
        <div className={styles.container}>
            <Nav />
            {children}
        </div>
    )
}

export default Layout