import React, {Component} from 'react'
import {Button, Form, Grid, Segment} from 'semantic-ui-react'
import Template from '../components/template'
import {findDOMNode} from 'react-dom';
import axios from "axios";


class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)
        this.passConfirmCheck = this.passConfirmCheck.bind(this)
        this.passSave = this.passSave.bind(this)
        this.error= this.error.bind(this)

    }

    state = {
        equal: true,
        pass: null,
        errors: null
    };

    componentDidMount(){
        document.title = "ثبت نام";
    }


    handleSubmit(event) {
        event.preventDefault();

        let self = this
        let url = 'http://localhost:8000/auth/signup/';


        let bodyFormData = new FormData();
        bodyFormData.set('username', event.target.username.value);
        bodyFormData.set('password', event.target.password.value);
        bodyFormData.set('first_name', event.target.first_name.value);
        bodyFormData.set('last_name', event.target.last_name.value);
        bodyFormData.set('email', event.target.email.value);
        bodyFormData.set('confirm_pass', event.target.confirm_pass.value);
        bodyFormData.set('rules', event.target.rules.value);


        axios({
            method: 'post',
            url: url,
            data: bodyFormData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        }).then(function (response) {

            console.log('maman   ', response);
            if (response.status === 200) {
                console.log('ghghfhgfjhgfjhgf')
                // this.props.history.push('../signin');
                window.location.replace("http://localhost:3000/signin");
            }
            else if(response.status === 203) {
                var error = ""
                for (var key in response.data){
                    if (key === "email"){
                       error += " این ایمیل قبلاْ انتخاب شده است. "

                    }
                    if(key === "username"){
                        error += " این نام کاربری قبلاْ انتخاب شده است. \n"

                    }
                    if (key === "password") {
                        error += " رمز عبور حداقل باید 8 کاراکتر باشد. \n"

                    }

                }
                self.setState({
                    errors: error
                })
            }
        }).catch(function ( error) {

             console.log(error)
             self.setState({
                    errors:<div>ایمیل یا نام کاربری موجود می باشد.</div>
                });
        });
    }

    error() {
        return <div>{this.state.errors}</div>;
    }

    passConfirmCheck(event) {
        if (this.state.pass === event.target.value) {
            this.setState({equal: true})
        } else
            this.setState({equal: false})
    }

    passSave(event) {
        this.setState({pass: event.target.value})
    }

    render() {
        return (
            <Segment>
                <div>{this.error()}</div>
                <Form onSubmit={this.handleSubmit}>

                    <Form.Input name="first_name" fluid label='نام' required/>
                    <Form.Input name="last_name" fluid label='نام خانوادگی' required/>
                    <Form.Input name="username" fluid label='نام کاربری' required/>
                    <Form.Input name="password" fluid label='رمز عبور' required onChange={this.passSave}
                                type="password"/>
                    <Form.Input name="confirm_pass" fluid label='تایید رمز عبور' required
                                onChange={this.passConfirmCheck} error={!this.state.equal} type="password"/>
                    <Form.Input name="email" fluid label='ایمیل' placeholder='Email@example.com' type="email" required/>
                    {/*<Form.Checkbox name="rules" label='قوانین و شرایط را قبول دارم' required/>*/}
                    <label htmlFor="other">قوانین و شرایط را قبول دارم</label>
                    <Form.Input type="checkbox" name="rules" id="other" ref="rule" required/>

                    <Button color='black' fluid type='submit' style={{fontFamily: 'B Yekan'}}>تایید</Button>
                </Form>
            </Segment>
        )
    }


};


class App extends Component {
    render() {
        console.log("APP")
        const body =
            <Grid verticalAlign='middle' textAlign='center' style={{width: '100%', height: '100%'}}>
                <Grid.Row>
                    <Grid.Column style={{maxWidth: '30vw'}}>
                        <SignupForm/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>;
        return (
            <Template>{body}</Template>
        );
    }
}

export default App;
