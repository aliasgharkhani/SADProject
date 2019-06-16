import React, {Component} from "react";
import {Grid, Menu, Segment} from 'semantic-ui-react'
import BookCard from '../components/bookCard'
import Template from '../components/template';
import axios from "axios";


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

        bought_books : [],
    };


    componentWillMount() {
        console.log(localStorage.getItem('chegg-token'))
        axios.get(`http://localhost:8000/store/books`)
            .then(res => {
                this.setState({
                    books: res.data
                })
                console.log(this.state.books)
            });

        var headers = {

            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
        };
        axios.get(`http://localhost:8000/auth/self/`, {headers: headers})
            .then(res => {
                this.setState({
                    bought_books: res.data.bought_books

                });
                console.log(this.state.bought_books)
            }).catch((error) => {
                console.log(error)
            })
    }


    render() {

        const hasBoughtBook = (book) => {

            for (var i = 0; i < this.state.bought_books.length; i++){
                if (this.state.bought_books[i].title === book.title){
                    return this.state.bought_books[i].chapters.length;
                }
            }
            return 0;

        };

        const chaptersBought = (book) => {

            for (var i = 0; i < this.state.bought_books.length; i++){
                if (this.state.bought_books[i].title === book.title){
                    return 1;
                }
            }
            return 0;


        };

        return (
            <Template {...this.props}>
                <Segment
                    style={{
                        width: ' 70%',
                        backgroundColor: '#020039',
                        margin: 'auto'
                    }}>
                    <Grid style={{

                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        margin: 'auto'
                    }}>
                        {this.state.books.map(book =>

                            <BookCard bookCover={book.cover} title={book.title}
                                      author={book.author}
                                      description={book.description} purchased={hasBoughtBook(book)}
                                      chaptersPurchased={chaptersBought(book)} price={book.price}
                                      link={'http://localhost:3000/books/' + book.id}/>
                        )}
                    </Grid>

                </Segment>

            </Template>


        )
    }


}

export default BookList;