import {AppBar, 
  Drawer,
  Box, 
  Toolbar,
  IconButton, 
  Typography,
  List,  
  ListItem, 
  ListItemIcon,
  ListItemText } from '@mui/material' 

import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {styled} from '@mui/system';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import AuthenticationContext from '../context/authenticationContext';


const Nav = () => {
  const [toggle, setToggle] = useState(false)
  const router = useRouter()

  const {user}= useContext(AuthenticationContext)

  const toggleDrawer = (value) => (event) => {
  	if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  		return
  	}
  	setToggle(value)
  }
    return (
      <NavStyled>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static'>
    		    <Toolbar>
    			    <IconButton edge='start' className='menuButton' color='inherit' aria-label='menu' onClick={toggleDrawer(true)}>
    				    <MenuIcon />
    			    </IconButton>
    				  <Drawer
    					  anchor={'left'}
    					  open={toggle}
    					  onClose={toggleDrawer(!toggle)}
    				  >
    				    <div className='list'>
    					    <List >
    						    <ListItem onClick={() => router.push('/')} className='listItem'>
    							    <ListItemIcon><HomeIcon /></ListItemIcon>
    							    <ListItemText primary='Home' />
    						    </ListItem>
								{user ? (
									<ListItem onClick={() => router.push('/account/logout')}>
    							    	<ListItemIcon><AccountCircleIcon /></ListItemIcon>
    							    	<ListItemText primary='Sign Out' />
    						    	</ListItem>
								): (
									<ListItem onClick={() => router.push('/account/login')}>
    							    	<ListItemIcon><AccountCircleIcon /></ListItemIcon>
    							    	<ListItemText primary='Sign In' />
    						    	</ListItem>
								)}
								
    					    </List>
    				    </div>
    				  </Drawer>
    			    <Typography variant='h6' className='title'>
    				  Local Reviews
    			    </Typography>
    		    </Toolbar>
    	    </AppBar>
        </Box>
      </NavStyled>
    );
}

const NavStyled = styled('Nav')({
    ".list": {
        color: 'red'
    },
    ".listItem": {
        cursor: 'pointer'
	}
})

export default Nav