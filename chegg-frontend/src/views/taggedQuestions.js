import React, {Component} from "react";
import {Grid, Segment, Button, Checkbox, Form} from 'semantic-ui-react'
import QuestionOfQuestionList from '../components/question/questionOfQuestionList'
import axios from "axios";
import Template from '../components/template/template';
import _ from 'lodash'
import {Search} from 'semantic-ui-react'


const initialState = {isLoading: false, results: [], value: ''}

const source = [
    {
        "title": "لینوکس خوبه",
        "description": "خیلی خیلی خوبه",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
        "price": "$58.98"
    },
    {
        "title": "Terry - Bernier",
        "description": "Multi-layered full-range customer loyalty",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/robergd/128.jpg",
        "price": "$98.43"
    },
    {
        "title": "Kris, Stokes and Runolfsdottir",
        "description": "Optimized explicit workforce",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/curiousoffice/128.jpg",
        "price": "$0.57"
    },
    {
        "title": "Olson LLC",
        "description": "Mandatory 5th generation interface",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/operatino/128.jpg",
        "price": "$19.91"
    },
    {
        "title": "Kuhic, Hoppe and Prohaska",
        "description": "Up-sized value-added customer loyalty",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/samscouto/128.jpg",
        "price": "$73.30"
    }
]


class TaggedQuestions extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.getQuestionsOrEmpty = this.getQuestionsOrEmpty.bind(this);
        this.checkedOrNot = this.checkedOrNot.bind(this);
        this.arrayRemove = this.arrayRemove.bind(this);
        this.checkBoxClick = this.checkBoxClick.bind(this);
        this.state = {
            questions: [],
            tags: [],
            visible_questions: [],
            isLoading: false,
            value: '',
            results: [],
            checkedTags: []
        };
    }

    handleResultSelect = (e, {result}) => {
        this.props.history.push('question/' + result.id);
    };

    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true, value});

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState);

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result.title);

            this.setState({
                isLoading: false,
                results: _.filter(this.state.visible_questions, isMatch),
            })
        }, 300)
    };


    componentDidMount() {
        var taggs = this.props.match.params.tags.split(' ').join(' ')
        console.log(taggs, ' tags from up')
        var initailTags = this.props.match.params.tags.split(' ')
        console.log(' inital tags', initailTags)
        taggs = '?tags=' + taggs;
        console.log(taggs, 'tags');


        axios.get('http://localhost:8000/qa/questions/'+ taggs).then(res1 => {
            console.log(res1.data , ' question')
                axios.get('http://localhost:8000/qa/tags/').then(res2 => {


                        this.setState({
                            questions: res1.data,
                            tags: res2.data,
                            visible_questions: res1.data,
                            checkedTags: initailTags
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
                checked_tags.push(formFields[i].name);
            }
        }


        if (checked_tags.length === 0){
            console.log(checked_tags.length, checked_tags)
            window.location.replace('http://localhost:3000/questions')
            return
        }
        window.location.replace('http://localhost:3000/questions/tagged/' + checked_tags.join(' '))
    }

    checkedOrNot(name) {

        if (this.state.checkedTags.includes(name)) {
            return true
        }
        return false


    }

    getQuestionsOrEmpty() {
        if (this.state.visible_questions.length === 0) {
            return (
                <div style={{marginTop: '0.6vh'}}>سوالی برای نمایش وجود ندارد.</div>
            )
        } else {
            return (
                this.state.visible_questions.map(question => {
                        return (
                            <QuestionOfQuestionList isProfile={0} asker={question.asker} title={question.title}
                                                    description={question.body} tags={question.tags_with_names}
                                                    link={'http://localhost:3000/question/' + question.id}
                                                    is_answered={question.is_answered}
                                                    num_of_replies={question.num_of_replies}
                                                    date={question.date}
                                                    score={question.score}
                                                    style={{'border': '5px'}}
                            />
                        )
                    }
                )
            )
        }
    }

    checkBoxClick(e) {
        console.log(e.target);
        name = e.target.name;
        console.log(name);
        console.log(this.state.checkedTags)
        var checkedTags = this.state.checkedTags;
        if (!this.state.checkedTags.includes(name)) {

            checkedTags.push(name);
            this.setState({
                checkedTags: checkedTags
            });


        } else {
            for (var i = 0; i < checkedTags.length; i++) {
                if (checkedTags[i] === name) {
                    checkedTags.splice(i, 1);
                }
            }
            console.log('checked', checkedTags)
            this.setState({
                checkedTags: checkedTags
            })
        }
    }

    arrayRemove(arr, value) {

        return arr.filter(function (ele) {
            return ele != value;
        });

    }

    render() {

        const TagFilter = () => (
            <Form onSubmit={this.handleChange} style={{height: '100%', overflow: 'auto'}}>
                <Segment style={{
                    maxHeight: '92.6%', overflow: 'auto', border: '0.7px groove',
                    borderRadius: '10px'
                }}>
                    {this.state.tags.map(tag =>
                        <Form.Field>
                            <Checkbox name={tag.name} onClick={this.checkBoxClick} checked={this.checkedOrNot(tag.name)}
                                      style={{color: 'black'}} id={tag.id} label={tag.name}/>
                        </Form.Field>
                    )}
                </Segment>
                <Button style={{fontFamily: 'B Yekan', backgroundColor: 'black', color: 'white'}} fluid={true}
                        floated={'left'} type='submit'>فیلتر</Button>
            </Form>

        );


        return (
            <Template {...this.props}>
                <Grid style={{margin: 'auto', width: '70%', height: '82vh'}}>
                    <Grid.Row columns={2} style={{maxHeight: '100%',}}>
                        <Grid.Column width={13} style={{maxHeight: '100%'}}>


                            <Grid.Row style={{height: '91.7%'}}>
                                <Search
                                    fluid={true}
                                    input={{fluid: true}}
                                    noResultsMessage={'نتیجه‌ای یافت نشد.'}
                                    style={{margin: '10px auto', width: '80%'}}
                                    loading={this.state.isLoading}
                                    onResultSelect={this.handleResultSelect}
                                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                        leading: true,
                                    })}
                                    results={this.state.results}
                                    value={this.state.value}
                                    {...this.props}
                                />
                                <Segment
                                    style={{
                                        border: 'none',
                                        // backgroundImage: 'url("https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-037.jpg")',
                                        margin: 'auto',
                                        maxHeight: '100%',
                                        overflow: 'auto',
                                        width: '100%',

                                    }}>
                                    <Grid style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        flexWrap: 'wrap',
                                        direction: 'rtl'
                                    }}>

                                        {this.getQuestionsOrEmpty()}
                                    </Grid>

                                </Segment>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={3} style={{maxHeight: '100%'}}>
                            {TagFilter()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            </Template>
        )

    }


}

export default TaggedQuestions;