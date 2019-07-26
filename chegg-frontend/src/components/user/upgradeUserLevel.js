import React, {Component} from 'react'
import {Form, Image, Divider, Segment, Button, Icon, Modal} from 'semantic-ui-react'
import axios, {put} from "axios";

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false,
            modalMessage: "",
            upgraded: false,

        };
        this.handleChange = this.handleChange.bind(this);
    }

    onCloseModal() {
        this.setState({
            modalActive: false,
            memberInfo: null
        });

        if (this.state.upgraded){
             this.props.handler();
        }

    }


    handleChange(e) {
        e.preventDefault();
        const formFields = e.target;
        var headers = {

            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
        };

        axios.post('http://127.0.0.1:8000/auth/self/edit/',
            {headers: headers})
            .then(response => {

                if (response.status === 200) {
                    console.log(response.data)

                    this.setState({
                        modalMessage: "حساب کاربری شما ارتقا یافت.",
                        upgraded: true

                    })



                } else {

                    this.setState({
                        modalMessage: "مشکلی رخ داد،دوباره تلاش کنید."
                    })

                }

            })
            .catch((error) => {
                this.setState({
                    modalMessage: "مشکلی رخ داد،دوباره تلاش کنید."
                })

            });
        this.setState({modalActive: true})
    }





    render() {
        return (
            <div>
                <Modal size={"mini"} onRequestClose={this.onCloseModal.bind(this)} open={this.state.modalActive}>
                    <Icon name="close" onClick={this.onCloseModal.bind(this)}/>

                    <Modal.Content image>

                        <Modal.Description
                            style={{flexGrow: '1', direction: 'rtl', textAlign: 'right', fontFamily: 'B Yekan'}}>

                            <p>
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
                  <Button onClick={this.handleChange} style={{fontFamily: 'B Yekan'}}>ارتقای سطح کاربری</Button>
            </div>
        )
    }
}

export default PersonalInfo
