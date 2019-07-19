import React, {Component} from "react";
import {Grid, Menu, Segment} from 'semantic-ui-react'
import BookCard from '../components/bookCard'
import Template from '../components/template';
import axios from "axios";
import Question from "../components/question";
import Ad from '../components/ad'

const books1 = [{
    'title': 'قلعه ی حیوانات',
    'author': "جورج",
    'description': 'کتاب خوب',
    "image": './b.png',
    'purchased': 1,
    "chaptersPurchased": 5,
    'price': 15,
    'link': 'google.com',
},
    {
        'title': 'قلعه ی حیوانات',
        'author': "عطا",
        'description': 'کتاب خوب',
        "image": "./a.jpeg",
        'purchased': 0,
        "chaptersPurchased": 10,
        'price': 10,
        'link': '',

    },
    {
        'title': 'قلعه ی حیوانات',
        'author': "علی اصغر",
        'description': 'کتاب خوب',
        "image": "./a.jpeg",
        'purchased': 1,
        "chaptersPurchased": 5,
        'price': 20,
        'link': '',

    }, {
        'title': 'قلعه ی حیوانات',
        'author': "جورج",
        'description': 'کتاب خوب',
        "image": "./a.jpeg",
        'purchased': 1,
        "chaptersPurchased": 5,
        'price': 10,
        'link': '',

    },];


class BookList extends Component {


    state = {
        books: [],
        bought_books: [],

        numOfChapters: []

    };


    componentDidMount() {
        document.title = "لیست کتاب ها";
        console.log(localStorage.getItem('chegg-token'))
        axios.get(`http://localhost:8000/store/books`)
            .then(res => {
                let books = res.data;
                let numOfChapters = new Array(res.data.length).fill(0);
                var headers = {

                    'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
                };
                axios.get(`http://localhost:8000/auth/self/`, {headers: headers})
                    .then(res => {
                        for (var i = 0; i < res.data.bought_chapters.length; i++) {

                            numOfChapters[res.data.bought_chapters[i].book - 1] += 1;

                        }
                        this.setState(
                            {
                                numOfChapters: numOfChapters,
                                bought_books: res.data.bought_books,
                                books: books,
                            }
                        )
                    }).catch((error) => {
                    this.setState(
                        {
                            books: books,
                        }
                    );
                    console.log(error)
                })
            });


    }


    render() {

        const hasBoughtBook = (book) => {

            for (var i = 0; i < this.state.bought_books.length; i++) {
                if (this.state.bought_books[i].title === book.title) {
                    return 1;
                }
            }
            return 0;
        };

        const chaptersBought = () => {


        };


        return (

            <Template {...this.props}>


                <Grid style={{margin: 'auto', width: '70%', height: '90%'}}>
                    <Grid.Row columns={2} style={{padding: '0', maxHeight: '100%',}}>

                        <Grid.Column width={13} style={{maxHeight: '100%',}}>
                            <Segment
                                color='grey'
                                style={{
                                    backgroundImage: 'url("https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-037.jpg")',
                                    // backgroundColor:'#1c1c1c',
                                    margin: 'auto',

                                    maxHeight: '100%',
                                    overflow: 'auto',


                                }}>
                                <Grid style={{

                                    display: 'flex',
                                    flexDirection: 'row',
                                    // justifyContent: 'space-evenly',
                                    flexWrap: 'wrap',
                                    margin: 'auto',


                                }}>
                                    {this.state.books.map(book =>

                                        <BookCard bookCover={book.cover} title={book.title}
                                                  author={book.author}
                                                  description={book.description} purchased={hasBoughtBook(book)}
                                                  chaptersPurchased={this.state.numOfChapters[book.id - 1]}
                                                  price={book.price}
                                                  link={'http://localhost:3000/books/' + book.id}/>
                                    )}
                                </Grid>

                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={3}>
                           <Ad/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            </Template>


        )
    }


}

export default BookList;