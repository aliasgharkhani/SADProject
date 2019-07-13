import React, {Component} from 'react'
import {Form, Image, Divider, Segment, Button, Icon, Modal} from 'semantic-ui-react'
import axios, {put} from "axios";

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false,
            modalMessage: "",
            info:'',
        };
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
        e.preventDefault();
        const formFields = e.target;
        console.log('salam  ', formFields[1].value === '')

        var headers = {

            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
        };
        var bio = formFields[0].placeholder;
        var firstName = formFields[1].placeholder;
        var lastName = formFields[2].placeholder;
        if(formFields[0].value !== ''){
            bio = formFields[0].value
        }
        if(formFields[1].value !== ''){
            firstName = formFields[1].value
        }
        if(formFields[2].value !== ''){
            lastName = formFields[2].value
        }
        axios.post('http://127.0.0.1:8000/auth/self/edit/', {
            bio: bio,
            first_name: firstName,
            last_name:lastName,
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
                    modalMessage: "error"
                })
            });
        this.setState({modalActive: true})
    }
    // componentWillMount(){
    //     this.setState({
    //         info:this.props.info.first_name
    //     })
    // }

    render() {
        console.log(this.props.info)
        console.log('jaidid ', this.props.info.email, ' bura')
        return (
            <div>
                <Modal size={"mini"} onRequestClose={this.onCloseModal.bind(this)} open={this.state.modalActive}>
                    <Icon name="close" onClick={this.onCloseModal.bind(this)}/>

                    <Modal.Content image>

                        <Modal.Description
                            style={{flexGrow: '1', direction: 'rtl',textAlign: 'right', fontFamily:'B Yekan'}}>

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
                <div style={{fontWeight: 'bold', fontSize: '1.5em'}}>
                    <br/>
                    اطلاعات فردی
                </div>
                <Divider section/>
                <Form onSubmit={this.handleChange}>
                    <Form.Group>
                        <Form.TextArea label='درباره من' style={{fontFamily:'B Yekan'}} defaultValue={this.props.info.bio} width={16}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.TextArea style={{resize: 'none', height:'39px', overflow:'hidden', fontFamily:'B Yekan'}} label='نام' defaultValue={this.props.info.first_name} width={8}/>
                        <Form.TextArea style={{resize: 'none', height:'39px', overflow:'hidden', fontFamily:'B Yekan'}} label='نام خانوادگی' defaultValue={this.props.info.last_name} width={8}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={8}>
                            <label>نام کاربری</label>
                            <Segment style={{fontFamily:'Arial',height:'37.6px', 'display': 'flex', 'justifyContent': 'center', 'flexDirection': 'column'}}>{this.props.info.username}</Segment>
                        </Form.Field>
                        <Form.Field width={8}>
                            <label>رایانامه</label>
                            <Segment style={{fontFamily:'Arial', textAlign:'left', height:'37.6px', 'display': 'flex', 'justifyContent': 'center', 'flexDirection': 'column'}}>{this.props.info.email}</Segment>
                        </Form.Field>
                    </Form.Group>
                    <Button type='submit' style={{'fontFamily': 'B Yekan'}}>ذخیره</Button>
                </Form>
            </div>
        )
    }
}

export default PersonalInfo
