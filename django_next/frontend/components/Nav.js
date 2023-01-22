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

import {styled} from '@mui/system';
import { useState } from 'react';
import { useRouter } from 'next/router'


const Nav = () => {
  const [toggle, setToggle] = useState(false)
  const router = useRouter()

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
    						    <ListItem onClick={() => router.push('/')}>
    							    <ListItemIcon><HomeIcon /></ListItemIcon>
    							    <ListItemText primary='Home' />
    						    </ListItem>
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

const NavStyled = styled('nav')({
  '.list': {
		minWidth: '400'
	}
})

export default Nav