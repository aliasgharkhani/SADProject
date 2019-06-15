import React, {Component} from "react";
import Template from '../components/template';
import {Button, Container, Grid, Label, List, Menu, Segment} from 'semantic-ui-react';
import axios from 'axios';


class ProblemList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props !== undefined && this.props.chapter !== undefined) {
            return (
                <List style={{'direction': 'rtl'}}>
                    {this.props.chapter.problems.map((problem) => {
                        return <List.Item as='a'
                                          key={problem.problem_id}>{problem.problem_id + '. ' + problem.body}</List.Item>
                    })}
                </List>

            )
        }
        return (<div></div>)

    }

}

class MenuExampleInvertedSegment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 1,
        };
    }


    handleItemClick = (e, {id}) => {
        console.log(id, 'key')
        this.setState({
            activeItem: id,
        })
    };

    render() {
        // const {activeItem} = 1;
        return (
            <div>
                <Menu attached='top' tabular style={{'direction': 'rtl'}}>
                    {this.props.chapters.map((chapter) => {
                        return <Menu.Item
                            name={'فصل' + chapter.chapter_id}
                            active={this.state.activeItem === chapter.chapter_id}
                            onClick={this.handleItemClick}
                            id={chapter.chapter_id}
                        />
                    })}

                </Menu>

                <Segment attached='bottom'>
                    <Label as='a' color='red' ribbon>
                        {this.props.chapters[this.state.activeItem - 1] ? 'خرید این فصل با ' + this.props.chapters[this.state.activeItem - 1].price + ' تومان' : null}

                    </Label>
                    <ProblemList chapter={this.props.chapters[this.state.activeItem - 1]}/>
                </Segment>
            </div>
        )
    }
}

class Book extends Component {

    constructor(props) {
        super(props);
        this.bookId = this.props.match.params.id
    }

    state = {
        ISBN: '',
        score: '',
        publication_date: '',
        edition: '',
        title: '',
        author: '',
        price: '',
        cover: '',
        description: '',
        chapters: []
    };


    componentWillMount() {
        axios.get(`http://localhost:8000/store/books/${this.bookId}/`)
            .then(res => {
                const chapters = res.data.chapters;
                this.setState({
                    ISBN: res.data.ISBN,
                    score: res.data.score,
                    publication_date: res.data.publication_date,
                    edition: res.data.edition,
                    title: res.data.title,
                    author: res.data.author,
                    price: res.data.price,
                    cover: res.data.cover,
                    description: res.data.description,
                    chapters: chapters
                })
            })
    }

    render() {
        return (
            <Template>
                <Container>
                    <Segment>
                        <Grid columns={2} relaxed={"very"}>
                            <Grid.Row style={{'direction': 'rtl', fontFamily: 'B Yekan'}}>
                                <Grid.Column width={10}>
                                    <h3>{this.state.title}</h3>
                                    {this.state.description}
                                </Grid.Column>
                                <Grid.Column width={6}>

                                    <Grid>
                                        <Grid.Row>
                                            <img className="ui small image"
                                                 src={this.state.cover}/><br/>
                                        </Grid.Row>

                                        {/*<Grid.Row>*/}
                                        {/*    <Grid.Column width={8}>*/}
                                        {/*        امتیاز*/}
                                        {/*    </Grid.Column>*/}
                                        {/*    <Grid.Column width={8}>*/}
                                        {/*        {this.state.score}*/}
                                        {/*    </Grid.Column>*/}
                                        {/*</Grid.Row>*/}
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                نویسنده
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                {this.state.author}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                تاریخ انتشار
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                {this.state.publication_date}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                ویرایش
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                {this.state.edition}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={16}>
                                                <Button style={{fontFamily: 'B Yekan'}}
                                                    content={'خرید کل کتاب به قیمت ' + `${this.state.price}` + ' تومان'}
                                                    primary fluid/>
                                            </Grid.Column>
                                        </Grid.Row>

                                    </Grid>


                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <MenuExampleInvertedSegment chapters={this.state.chapters}/>
                                </Grid.Column>
                            </Grid.Row>


                        </Grid>
                    </Segment>
                </Container>
            </Template>
        )
    }
}

export default Book;