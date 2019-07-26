import React, {Component} from "react";
import {Grid, Menu, Segment} from 'semantic-ui-react'
import BookCard from '../components/book/bookCard'
import Template from '../components/template/template';
import axios from "axios";
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


                <Grid style={{margin: 'auto', width: '70%', height: '100%'}}>
                    <Grid.Row columns={2} style={{maxHeight: '100%',}}>

                        <Grid.Column width={13} style={{maxHeight: '100%',}}>
                            <Segment
                                style={{
                                    backgroundImage: 'url("https://wallpaperplay.com/walls/full/d/0/d/70300.jpg")',
                                    // backgroundColor:'#000000',
                                    margin: 'auto',
                                    maxHeight: '100%',
                                    overflow: 'auto',
                                    border: '0.7px groove',
                                    borderRadius: '10px'

                                }}>
                                <Grid style={{

                                    display: 'flex',
                                    flexDirection: 'row-reverse',
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
                            <Ad ad1={"https://cdn.zoomg.ir/2019/3/4db9f81a-8796-431d-9ef0-80fbc174257c.gif"}
                                ad2={"https://cdn.zoomg.ir/2019/3/4db9f81a-8796-431d-9ef0-80fbc174257c.gif"}
                                ad3={"https://cdn.zoomg.ir/2019/3/4db9f81a-8796-431d-9ef0-80fbc174257c.gif"}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            </Template>


        )
    }


}

export default BookList;