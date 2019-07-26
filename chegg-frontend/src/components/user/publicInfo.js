import React, {Component} from 'react'
import {Form, Image, Divider, Segment, Button, Icon, Modal} from 'semantic-ui-react'

class PublicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: null,
            first_name: null,
            last_name: null,
            username: null,
            email: null,
            user: '',
        };
    }

    componentDidUpdate(prevProps, prevState) {
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

    render() {
        console.log("public info", this.state)
        var bioLabel = 'دباره ی ' + this.state.username
        return (
            <div>

                <div style={{fontWeight: 'bold', fontSize: '1.5em'}}>
                    <br/>
                    اطلاعات فردی
                </div>

                <Divider section/>
                <Form>
                   <Form.Group>
                        <Form.Field width={16}>
                            <label>{bioLabel} </label>
                            <Segment style={{
                                fontFamily: 'Arial',
                                minHeight: '80px',

                            }}>{this.state.bio}</Segment>
                        </Form.Field>

                    </Form.Group>

                    <Form.Group>
                        <Form.Field width={8}>
                            <label>نام</label>
                            <Segment style={{
                                fontFamily: 'Arial',
                                height: '37.6px',
                                'display': 'flex',
                                'justifyContent': 'center',
                                'flexDirection': 'column'
                            }}>{this.state.first_name}</Segment>
                        </Form.Field>
                        <Form.Field width={8}>
                            <label>نام خانوادگی</label>
                            <Segment style={{
                                fontFamily: 'Arial',
                                textAlign: 'right',
                                height: '37.6px',
                                'display': 'flex',
                                'justifyContent': 'center',
                                'flexDirection': 'column'
                            }}>{this.state.last_name}</Segment>
                        </Form.Field>
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

                </Form>
            </div>
        )
    }
}

export default PublicInfo
