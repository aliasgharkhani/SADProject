import React, {Component} from "react";
import {Grid, Menu, Segment, Button, Checkbox, Form, Icon} from 'semantic-ui-react'
import Question from '../components/question'
import axios from "axios";
import Template from '../components/template';


class QuestionList extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.getQuestionsOrEmpty = this.getQuestionsOrEmpty.bind(this);
        this.state = {
            questions: [],
            tags: [],
            visible_questions: []
        };
    }


    componentDidMount() {
        axios.get('http://localhost:8000/qa/questions/').then(res1 => {
                axios.get('http://localhost:8000/qa/tags/').then(res2 => {
                        this.setState({
                            questions: res1.data,
                            tags: res2.data,
                            visible_questions: res1.data
                        })
                    }
                )

            }
        )
    }


    handleChange(e) {
        e.preventDefault();
        const formFields = e.target;
        let checked_tags = [];
        let visible_questions = [];
        for (let i = 0; i < formFields.length - 1; i++) {
            if (formFields[i].checked === true) {
                checked_tags.push(parseInt(formFields[i].id), 10);
            }
        }
        if (checked_tags.length === 0) {
            this.setState({
                visible_questions: this.state.questions
            });
            return;
        }
        for (let i = 0; i < this.state.questions.length; i++) {
            for (let j = 0; j < this.state.questions[i].tags_with_names.length; j++) {
                if (checked_tags.includes(this.state.questions[i].tags_with_names[j].id)) {
                    visible_questions.push(this.state.questions[i]);
                    break;
                }
            }
        }
        this.setState({
            visible_questions: visible_questions,
        })

    }

    getQuestionsOrEmpty() {
        if(this.state.visible_questions.length === 0){
            return (
                <div style={{marginTop:'0.6vh'}}>سوالی برای نمایش وجود ندارد.</div>
            )
        }
        else {
            return (
                this.state.visible_questions.map(question =>
                    <Question isProfile={0} asker={question.asker} title={question.title}
                              description={question.body} tags={question.tags_with_names}
                              link={question.link}
                    />
                )
            )
        }
    }

    render() {
        const TagFilter = () => (
            <Form onSubmit={this.handleChange} style={{height: '100%', overflow: 'auto'}}>
                <Segment style={{maxHeight: '92.6%', overflow: 'auto'}}>
                    {this.state.tags.map(tag =>
                        <Form.Field>
                            <Checkbox id={tag.id} label={tag.name}/>
                        </Form.Field>
                    )}
                </Segment>
                <Button style={{fontFamily: 'B Yekan'}} fluid={true} floated={'left'} type='submit'>فیلتر</Button>
            </Form>

        );


        return (
            <Template {...this.props}>
                <Grid style={{margin: 'auto', width: '70%', height: '100%'}}>
                    <Grid.Row columns={2} style={{padding: '0', maxHeight: '100%',}}>
                        <Grid.Column width={13} style={{maxHeight: '100%'}}>
                            <Segment
                                style={{
                                    backgroundImage: 'url("https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-037.jpg")',
                                    margin: 'auto',
                                    maxHeight: '100%',
                                    overflow: 'auto',

                                }}>
                                <Grid style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    flexWrap: 'wrap',
                                    direction: 'rtl'
                                }}>

                                    {this.getQuestionsOrEmpty()}
                                </Grid>

                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={3} style={{maxHeight: '100%',}}>
                            {TagFilter()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            </Template>
        )

    }


}

export default QuestionList;