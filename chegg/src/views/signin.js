import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Template from "../components/template";
import axios from 'axios';
import {Redirect, withRouter} from 'react-router-dom';


const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};


class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: ''
        };
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })

    }

    handleClick(e) {
        console.log(this)
         e.preventDefault();

        axios.post('http://127.0.0.1:8000/auth/token/', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('cheggtoken', response.data.token)
                    this.setState({
                        message: 'با موفقیت وارد شدید' + response.data.token
                    })

                } else {
                    this.setState({
                        message: 'دوباره امتحان کنید'
                    })
                }

            })
            .catch((error) => {
                this.setState({
                    message: 'دوباره امتحان کنید'
                })
            })

    }

    render() {
        return (
            <Container maxWidth="xs">
                <CssBaseline/>
                <div style={formStyle}>
                    {this.state.message}
                    <Avatar>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ورود
                    </Typography>
                    <form method='post' noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="نام کاربری"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        <TextField

                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="رمز عبور"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            // className={classes.submit}
                            onClick={this.handleClick}
                        >
                            ورود
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="../signup" variant="body2">
                                    ثبت نام
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    فراموشی رمزعبور
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

function SignIn() {
    return (
        <Template>
            <SignInForm/>
        </Template>
    )

}

export default withRouter(SignIn)