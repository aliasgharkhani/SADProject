import React, {Component} from 'react'
import {Form, Image, Divider, Grid, Button, Icon, Modal, Header} from 'semantic-ui-react'
import axios, { put } from "axios";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            modalActive: false,
            modalMessage: "",
            equal: true,
            pass: "",
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.passSave = this.passSave.bind(this)
    }

    onCloseModal() {
        this.setState({
            modalActive: false,
            memberInfo: null
        });
    }
    handleInput(e) {
        if (this.state.pass === e.target.value) {
            this.setState({equal: true})
        } else
            this.setState({equal: false})
        this.setState({
            [e.target.name]: e.target.value
        });

    }
      passSave(event) {
        this.setState({pass: event.target.value})
    }

    handleChange(e) {
        e.preventDefault()

         var headers = {

                    'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
                };
        axios.post('http://127.0.0.1:8000/auth/self/edit/', {

            password: this.state.password
        }, {headers: headers})
            .then(response => {

                if (response.status === 200) {
                    console.log(response.data)

                    this.setState({
                        modalMessage: response.data
                    })


                } else {

                    this.setState({
                        modalMessage: response.data
                    })
                }

            })
            .catch((error) => {
                this.setState({
                    modalMessage:  "رمز عبور باید حداقل ۶ کاراکتر باشد."
                })
            })
        this.setState({modalActive: true})
    }

    render() {


        return (

            <div>
                <Modal  size={"mini"} onRequestClose={this.onCloseModal.bind(this)} open={this.state.modalActive}>
                    <Icon name="close" onClick={this.onCloseModal.bind(this)}/>

                    <Modal.Content image>

                        <Modal.Description
                            style={{'flexGrow': '1', 'direction': 'rtl', 'textAlign': 'right'}}>

                            <p style={{fontFamily: "B Yekan"}}>
                                {this.state.modalMessage}
                            </p>

                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button style={{fontFamily: "B Yekan"}} emphasis="positive"
                                color='green'
                                onClick={this.onCloseModal.bind(this)}>بستن</Button>



                    </Modal.Actions>
                </Modal>

                <div style={{fontWeight: 'bold', fontSize: '1.5em'}}>
                    <br/>
                    تغییر گذرواژه
                </div>
                <Divider section/>
                <Form>
                    <Form.Group>
                        <Form.Input onChange={this.passSave} label='رمز جدید' width={8}/>
                        <Form.Input  error={!this.state.equal} onChange={this.handleInput} name={'password'}  label='تایید رمز'  width={8}/>
                    </Form.Group>

                    <Button style={{fontFamily: "B Yekan"}}  onClick={this.handleChange}  type='submit'>ذخیره</Button>
                </Form>
            </div>
        )
    }
}

export default ChangePassword
