import React from 'react'
import {
  createStyles,
  makeStyles,
  Theme,
  AppBar,
  Typography,
  Button,
  Toolbar
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    navContainer: {
      position: 'sticky',
      height: '80px',
      flexGrow: 1,
      justifyContent: 'center'
    },
    title: {
      flexGrow: 1,
      fontWeight: 'bold'
    },
    button: {
      fontWeight: 'bold'
    }
  })
)

const Navbar = () => {
  const classes = useStyles()
  return (
    <AppBar classes={{ root: classes.navContainer }}>
      <Toolbar>
        <Typography classes={{ root: classes.title }}>
          Weather App
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
