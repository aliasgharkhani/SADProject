import React, {Component} from 'react'
import {Comment, Divider, Segment} from 'semantic-ui-react'
import axios from "axios";

class Message extends Component {

    render() {
        return (
            <Comment.Group style={{'max-width': '100%'}}>
                <Comment>
                    <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/steve.jpg'/>
                    <Comment.Content>
                        <Comment.Author as='a'> مدیر سایت </Comment.Author>
                        <Comment.Metadata>
                            <div>{this.props.message.date}</div>
                        </Comment.Metadata>
                        <Comment.Text>{this.props.message.text}</Comment.Text>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        )
    }
}


class Messages extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        var headers = {
            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
        };

        axios.post('http://127.0.0.1:8000/auth/self/read/', {},
            {headers: headers})
            .then(response => {
                console.log(response)
                this.props.readMessages()
            })
            .catch((error) => {
            });
    }


    render() {
        return (
            <Segment style={{'direction': 'rtl'}}>
                {this.props.messages.map((message) => {
                    return (
                        <div>
                            <Message message={message}/>
                            <Divider/>
                        </div>
                    )
                })}
            </Segment>
        )
    }
}

export default Messages
