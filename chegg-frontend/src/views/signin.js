import React from 'react'
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
import Template from '../components/template/template';
import axios from 'axios';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: ''
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    componentDidMount(){
        document.title = "ورود";
    }

    handleLogin(e) {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/auth/token/', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('chegg-token', response.data.token);
                    localStorage.setItem('chegg-username', this.state.username);
                    this.setState({
                        message: 'با موفقیت وارد شدید'
                    })
                    this.props.history.push('../')
                    // window.location.replace('/')

                } else {
                    this.setState({
                        message: 'اطلاعات وارد شده نادرست می باشد'
                    })
                }

            })
            .catch((error) => {
                this.setState({
                    message: 'اطلاعات وارد شده نادرست می باشد'
                })
            })
    }


    render() {
        return (
            <Template>
                <Grid textAlign='center' verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='teal' textAlign='center'>

                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                {this.state.message}
                                <Form.Input fluid icon='user' iconPosition='left' id='username'
                                            placeholder='نام کاربری' onChange={this.handleInput}
                                            name={'username'} value={this.state.username}/>
                                <Form.Input
                                    fluid
                                    id='password'
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='رمز کاربری'
                                    onChange={this.handleInput}
                                    value={this.state.password}
                                    name={'password'}
                                    type='password'
                                />

                                <Button color='black' id='submit' fluid size='large' onClick={this.handleLogin}
                                        style={{fontFamily: 'B Yekan'}}>
                                    ورود
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            <a href='#'>عضویت</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Template>

        )
    };
}


export default SignIn