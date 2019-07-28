import React, {Component} from "react";
import {Grid, Segment} from 'semantic-ui-react'
import QuestionOfQuestionList from '../question/questionOfQuestionList'


class AskedQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: [],
            asker:null,
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            question: props.question,
            asker:props.asker,
        };
    }





    render() {


        return (
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
                    {this.state.question.map(question =>

                        <QuestionOfQuestionList isProfile={0} asker={question.asker} title={question.title}
                                                    description={question.body} tags={question.tags_with_names}
                                                    link={'http://localhost:3000/question/' + question.id}
                                                    is_answered={question.is_answered}
                                                    num_of_replies={question.num_of_replies}
                                                    date={question.date}
                                                    score={question.score}
                                                    style={{'border': '5px'}}
                        />
                    )}
                    {/*<Segment color={'teal'}><a href={question.link}> {question.title}</a></Segment>*/}
                </Grid>

            </Segment>

        )
    }


}

export default AskedQuestions;