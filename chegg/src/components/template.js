import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import Navbar from './navbar';
import Footer from './footer';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const templateStyle = {
    height: '100%',
    fontFamily: 'B Yekan',
    display: 'flex',
    flexDirection: 'column',
};

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'B Yekan',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    // palette: {
    //     primary: {
    //         main: '#f1f2f3'
    //     }
    // },
});


class Template extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div dir='rtl' style={templateStyle}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Navbar/>
                        </Grid>
                    </Grid>
                    <Grid container justify={'center'} style={{height:'100%'}} alignContent={'center'}>
                        <Grid item>
                            {this.props.body}
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Footer/>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Template;