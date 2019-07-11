import React, {Component} from 'react'
import {Form, Image, Divider, Grid, Button} from 'semantic-ui-react'
import axios, { put } from "axios";

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {
        return (
            <div>
                <div style={{fontWeight: 'bold', fontSize: '1.5em'}}>
                    <br/>
                    اطلاعات فردی
                </div>
                <Divider section/>
                <Form>
                    <Form.Group>
                        <Form.TextArea label='درباره من' placeholder={this.props.info.bio} width={16}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input style={{float:'right'}} label='نام' placeholder={this.props.info.first_name} width={8}/>
                        <Form.Input label='نام خانوادگی' placeholder={this.props.info.last_name} width={8}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label='نام کاربری' defaultValue={this.props.info.username} width={8} readOnly/>
                        <Form.Input label='رایانامه' defaultValue={this.props.info.email} width={8} readOnly/>
                    </Form.Group>
                    <Button type='submit'>ذخیره</Button>
                </Form>
            </div>
        )
    }
}

export default PersonalInfo
