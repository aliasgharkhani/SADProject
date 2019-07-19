import React, {Component} from "react";
import axios from "axios";
import {Button, Container, Form, Grid, Icon, Modal, Segment} from "semantic-ui-react";
import Template from "../components/template";
import MultiSelect from "@khanacademy/react-multi-select";
import BookCard from "../components/bookCard";
import Ad from "../components/ad";


class QuestionCreate extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: null,
            body: null,
            allow: false,
            tags: null,
            selectedTags: [],
        };
    }


    componentWillMount() {
        axios.get('http://localhost:8000/qa/tags/').then(res => {
            console.log(res.data, "sfsdfqqqq")
            this.setState({
                tags: res.data,
                allow: true,
            })
        });
        console.log(this.state.tags, "sdfsdf")

    }

    onCloseModal() {
        this.setState({
            modalActive: false,
            memberInfo: null
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        const formFields = e.target;
        const title = formFields[0].value;
        const body = formFields[1].value;
        const tags = this.state.selectedTags;
        const headers = {
            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
        };
        const data = {
            title: title,
            body: body,
            tags: tags,
        }
        axios.post('http://127.0.0.1:8000/qa/questions/', data, {headers: headers})
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    this.setState({
                        modalMessage: " موفقیت آمیز"
                    })
                } else {
                    this.setState({
                        modalMessage: "سوال شما با موفقیت ایجاد شد"
                    })
                    setTimeout(() => {
                        window.location.replace("http://localhost:3000/questions")
                    }, 2000)
                }
            })
            .catch((error) => {
                console.log("error", error)
                this.setState({
                    modalMessage: "خطا"
                })
            });
        this.setState({modalActive: true})
    }


    render() {
        let token = localStorage.getItem('chegg-token');
        if (this.state.allow && token !== null && token !== undefined) {
            return (
                <Template {...this.props}>

                    <Grid style={{margin: 'auto', width: '70%', height: '90%'}}>
                    <Grid.Row columns={2} style={{padding: '0', maxHeight: '100%',}}>

                        <Grid.Column width={13} style={{maxHeight: '100%',}}>
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
                    <Container  style={{height:'90%'}}>
                        <Segment>
                            <Form onSubmit={this.handleSubmit} style={{'direction': 'rtl'}}>
                                <Form.Group>
                                    <Form.TextArea width={16} required
                                                   style={{
                                                       resize: 'none',
                                                       height: '37.6px',
                                                       overflow: 'hidden',
                                                       fontFamily: 'B Yekan'
                                                   }}
                                                   label='عنوان'/>

                                </Form.Group>
                                <Form.Group>
                                    <Form.TextArea label='متن' style={{fontFamily: 'B Yekan'}} required
                                                   width={16}/>
                                </Form.Group>
                                برچسب ها
                                <MultiSelect overrideStrings={{
                                    selectSomeItems: "انتخاب کنید",
                                    allItemsAreSelected: "همه انتخاب شدند",
                                    selectAll: "انتخاب همه",
                                    search: "جستوجو",
                                }}
                                             options={this.state.tags.map(tag => {
                                                 return {
                                                     label: tag.name,
                                                     value: tag.id
                                                 }
                                             })}
                                             selected={this.state.selectedTags}
                                             onSelectedChanged={selectedTags => this.setState({selectedTags})}
                                />
                                <br/>
                                <Button type='submit' style={{'fontFamily': 'B Yekan'}}>ایجاد</Button>
                            </Form>

                        </Segment>
                    </Container>
                        </Grid.Column>
                        <Grid.Column width={3}>
                           <Ad/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>




















                </Template>
            )
            // return <MultiSelect
            //     options={this.state.tags.map(tag => {
            //         return {
            //             label: tag.name,
            //             value: tag.id
            //         }
            //     })}
            //     selected={this.state.selectedTags}
            //     onSelectedChanged={selectedTags => this.setState({selectedTags})}
            // />
        } else {
            if (token === null || token === undefined) {
                alert('برای پرسش سوال باید وارد سایت شوید');
                window.location.replace('http://localhost:3000/signin');
            }
            return (<div></div>)
        }
    }


}

export default QuestionCreate;