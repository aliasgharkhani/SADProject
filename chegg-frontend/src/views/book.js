import React, {Component} from "react";
import Template from '../components/template';
import {Container, Grid, Menu, Segment} from 'semantic-ui-react';
import axios from 'axios';

class MenuExampleInvertedSegment extends Component {
    state = {activeItem: 'home'}

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state

        return (
            <Segment inverted>
                <Menu inverted secondary>
                    {this.props.chapters.map(function (chapter) {
                        return <Menu.Item
                            name={chapter.id}
                            active={activeItem === 'messages'}
                        />
                    })}
                    <Menu.Item name='home' active={activeItem === 'home'}
                               onClick={this.handleItemClick}/>
                    <Menu.Item
                        name='messages'
                        active={activeItem === 'messages'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='friends'
                        active={activeItem === 'friends'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
            </Segment>
        )
    }
}

class Book extends Component {

    constructor(props) {
        super(props)
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

    componentDidMount() {
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
        console.log(this.bookId)
        return (
            <Template>
                <Container>
                    <Segment>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    Book info goes here
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <img className="ui small image"
                                         src={this.state.cover}/>
                                    {this.state.ISBN} <br/>
                                    {this.state.score} <br/>
                                    {this.state.publication_date} <br/>
                                    {this.state.edition} <br/>
                                    {this.state.title} <br/>
                                    {this.state.author} <br/>
                                    {this.state.price} <br/>
                                    {this.state.description} <br/>
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