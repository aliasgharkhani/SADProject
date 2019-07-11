import React, {Component} from 'react'
import {Form, Image, Divider, Grid, Button, Icon, Modal, Header} from 'semantic-ui-react'
import axios, { put } from "axios";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            modalActive: false,
            modalMessege: "",
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onCloseModal() {
        this.setState({
            modalActive: false,
            memberInfo: null
        });
    }
    handleInput(e) {

        this.setState({
            [e.target.name]: e.target.value
        });

    }

    handleChange(e) {

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
                        modalMessege: response.data
                    })


                } else {

                    this.setState({
                        modalMessege: response.data
                    })
                }

            })
            .catch((error) => {
                this.setState({
                    message: "error"
                })
            })
        this.setState({modalActive: true})
    }

    render() {


        return (

            <div>
                <Modal size={"mini"} onRequestClose={this.onCloseModal.bind(this)} open={this.state.modalActive}>
                    <Icon name="close" onClick={this.onCloseModal.bind(this)}/>

                    <Modal.Content image>

                        <Modal.Description
                            style={{'flexGrow': '1', 'direction': 'rtl', 'textAlign': 'right'}}>

                            <p>
                                {this.state.modalMessege}
                            </p>

                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button style={{fontFamily: "B Yekan"}} emphasis="positive"
                                color='green'
                                onClick={this.onCloseModal.bind(this)}>فهمیدم</Button>



                    </Modal.Actions>
                </Modal>

                <div style={{fontWeight: 'bold', fontSize: '1.5em'}}>
                    <br/>
                    تغییر گذرواژه
                </div>
                <Divider section/>
                <Form>
                    <Form.Group>
                        <Form.Input  label='رمز مورد نظر' width={8}/>
                        <Form.Input onChange={this.handleInput} name={'password'}  label='تکرار رمز وارد شده '  width={8}/>
                    </Form.Group>

                    <Button style={{fontFamily: "B Yekan"}}  onClick={this.handleChange}  type='submit'>ذخیره</Button>
                </Form>
            </div>
        )
    }
}

export default ChangePassword
