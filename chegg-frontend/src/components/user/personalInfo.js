import React, {Component} from 'react'
import {Form, Image, Divider, Segment, Button, Icon, Modal} from 'semantic-ui-react'
import axios, {put} from "axios";

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false,
            modalMessage: "",
            bio: null,
            first_name: null,
            last_name: null,
            username: null,
            email: null,
            user: '',
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
        var headers = {

            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
        };
        var bio = formFields[0].placeholder;
        var firstName = formFields[1].placeholder;
        var lastName = formFields[2].placeholder;
        if (formFields[0].value !== '') {
            bio = formFields[0].value
        }
        if (formFields[1].value !== '') {
            firstName = formFields[1].value
        }
        if (formFields[2].value !== '') {
            lastName = formFields[2].value
        }
        axios.post('http://127.0.0.1:8000/auth/self/edit/', {
            bio: bio,
            first_name: firstName,
            last_name: lastName,
        }, {headers: headers})
            .then(response => {

                if (response.status === 200) {
                    console.log(response.data)
                    var info = this.state.user
                    info.bio = bio
                    info.first_name = firstName
                      info.last_name = lastName
                    console.log(info.first_name, "info . first name")
                    this.props.handler(info)

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
    //
    componentDidUpdate(prevProps, prevState) {
        console.log('ali bia ali bia');
        if (this.props !== prevProps) {
            this.setState({
                bio: this.props.info.bio,
                first_name: this.props.info.first_name,
                last_name: this.props.info.last_name,
                username: this.props.info.username,
                email: this.props.info.email,
                user: this.props.info,
            })
        }
    }

    componentDidMount() {
        this.setState({
            bio: this.props.info.bio,
                first_name: this.props.info.first_name,
                last_name: this.props.info.last_name,
                username: this.props.info.username,
                email: this.props.info.email,
                user: this.props.info,
        })
    }


    // static getDerivedStateFromProps(props, state) {
    //     console.log('getdrive ali ');
    //     return {
    //
    //     };
    // }

    //
    // // componentDidMount(){
    // //
    // // }

    render() {
        console.log('ataata  ', this.props);
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
                <div style={{fontWeight: 'bold', fontSize: '1.5em'}}>
                    <br/>
                    اطلاعات فردی
                </div>
                <Divider section/>
                <Form onSubmit={this.handleChange}>
                    <Form.Group>
                        <Form.TextArea  label='درباره من' style={{fontFamily: 'B Yekan'}}
                                       onChange={e => this.setState({bio: e.target.value})}
                                       value={this.state.bio}
                                       ref={node => {
                                           this.textarea = node;
                                       }}
                                       width={16}/>

                    </Form.Group>
                    <Form.Group>
                        <Form.Input  style={{fontFamily: 'B Yekan', textAlign:'right'}} label='نام'
                                    defaultValue={this.state.first_name} width={8}/>
                        <Form.Input style={{fontFamily: 'B Yekan'}} label='نام خانوادگی'
                                    defaultValue={this.state.last_name} width={8}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={8}>
                            <label>نام کاربری</label>
                            <Segment style={{
                                fontFamily: 'Arial',
                                height: '37.6px',
                                'display': 'flex',
                                'justifyContent': 'center',
                                'flexDirection': 'column'
                            }}>{this.state.username}</Segment>
                        </Form.Field>
                        <Form.Field width={8}>
                            <label>رایانامه</label>
                            <Segment style={{
                                fontFamily: 'Arial',
                                textAlign: 'left',
                                height: '37.6px',
                                'display': 'flex',
                                'justifyContent': 'center',
                                'flexDirection': 'column'
                            }}>{this.state.email}</Segment>
                        </Form.Field>
                    </Form.Group>
                    <Button type='submit' style={{'fontFamily': 'B Yekan'}}>ذخیره</Button>
                </Form>
            </div>
        )
    }
}

export default PersonalInfo
