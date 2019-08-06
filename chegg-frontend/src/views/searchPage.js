import React, {Component} from "react";
import {Grid, Segment, Button, Checkbox, Form, Icon} from 'semantic-ui-react'
import QuestionOfQuestionList from '../components/question/questionOfQuestionList'
import axios from "axios";
import Template from '../components/template/template';
import _ from 'lodash'
import {Search} from 'semantic-ui-react'


const initialState = {isLoading: false, results: [], value: ''}


class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.getQuestionsOrEmpty = this.getQuestionsOrEmpty.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            visible_questions: [],
            isLoading: false,
            value: '',
            results: []
        };
    }
    searchResultRenderer = ({asker, title, is_answered}) => [
        <Grid key='content' className='content'>
            <Grid.Row columns={2}>
                <Grid.Column width={4} style={{textAlign: 'left'}}>
                    {asker}:نویسنده
                    &nbsp;&nbsp;
                    {is_answered ? <Icon style={{width: '100%', margin: 'auto', display: 'inline'}} size={"large"}
                                         name={"check circle outline"} color={"green"}/> : <div/>}
                </Grid.Column>
                <Grid.Column style={{fontFamily: 'B Yekan', color: '#4183c4', textAlign: 'right'}} width={12}>
                    {title}
                </Grid.Column>

            </Grid.Row>
        </Grid>,
    ];
    handleResultSelect = (e, {result}) => {
        this.props.history.push('../question/' + result.id);
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

    handleClick(){

        window.location.replace('http://localhost:3000/search/'+this.state.value);
    }

    componentDidMount() {
        let urlParameters = this.props.match.params;
        axios.get('http://localhost:8000/qa/questions/').then(res1 => {
                const re = new RegExp(_.escapeRegExp(urlParameters.title), 'i');
                const isMatch = result => re.test(result.title);
                this.setState({
                    visible_questions: _.filter(res1.data, isMatch),
                });


            }
        )
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

    render() {


        return (
            <Template {...this.props}>
                <Grid style={{margin: 'auto', width: '70%', height: '82vh'}}>
                    <Grid.Row columns={2} style={{maxHeight: '100%',}}>
                        <Grid.Column width={13} style={{maxHeight: '100%'}}>


                            <Grid style={{height:'100%'}}>
                                <Grid.Row style={{paddingBottom:'0'}}>
                                    <Grid.Column width={2} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                        <Button onClick={this.handleClick}  basic color='red' fluid={true}>جستجو</Button>
                                    </Grid.Column>
                                    <Grid.Column width={14} style={{paddingLeft:'0'}}>
                                        <Search
                                            resultRenderer={this.searchResultRenderer}
                                            fluid={true}
                                            input={{fluid: true}}
                                            noResultsMessage={'.نتیجه‌ای یافت نشد'}
                                            style={{margin: '10px auto', width: '100%'}}
                                            loading={this.state.isLoading}
                                            onResultSelect={this.handleResultSelect}
                                            onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                                leading: true,
                                            })}
                                            results={this.state.results}
                                            value={this.state.value}
                                            {...this.props}
                                        />
                                    </Grid.Column>

                                </Grid.Row>
                                <Grid.Row style={{height: '93%', paddingTop:'0', display:'flex', flexDirection:'row', alignContent:'flex-start'}}>
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
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={3} style={{maxHeight: '100%'}}>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            </Template>
        )

    }


}

export default SearchPage;