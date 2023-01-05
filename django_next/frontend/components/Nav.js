import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const Navigation = () => {
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
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Local Reviews
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      );
    return(
        <div>
            <Appbar position='static'>
                <Toolbar>
                    <IconButton edges='start' className='menuButton' color='inherit' aria-label='menu'>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' className='title'>
                        Local Reviews
                    </Typography>
                </Toolbar>
            </Appbar>
        </div>
    )
}


export default Navigation