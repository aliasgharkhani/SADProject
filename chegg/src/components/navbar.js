import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appbar: {
        // backgroundColor: '#13003d'
    }
}));

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <AppBar position="static" className={this.props.classes.appbar}>
                    <Toolbar>
                        <IconButton edge="start" className={this.props.classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={this.props.classes.title}>
                        </Typography>
                        <Button color="inherit" href={'/signup'}>عضویت</Button>
                        <Button color="inherit" href={'/signin'}>ورود</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

}

function Navbar() {
    const classes = useStyles();
    return (
        <NavbarComponent classes={classes}/>
    );
}

export default Navbar;