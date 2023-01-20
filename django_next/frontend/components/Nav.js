import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, ListItem } from '@mui/material';
import { useState } from 'react';


const Navigation = () => {
  const [toggle, setToggle] = useState(false)

  const toggleDrawer = (value) => (event) => {
    if (event.type == 'keydown' && event.key == 'Tab' || event.key == 'Shift'){
      return 
    }
    else{
      setToggle(value)
    }
  }
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
                <Drawer 
                  anchor={'left'} 
                  open={toggle}
                  onClose={toggleDrawer(!toggle)}
                >
                  <List>
                    <ListItem button onClick={() router.push('/')}
                  </List>
                </Drawer>

              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Local Reviews
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      );
}


export default Navigation