import React, {Component} from "react";
import {Button, Card, Image, Segment, Grid} from 'semantic-ui-react'
import BookCard from '../components/bookCard'
import Template from '../components/template';


const books = [{
    'title': 'قلعه ی حیوانات',
    'author': "جورج",
    'description': 'کتاب خوب',
    "image": './b.png',
    'purchased': 1,
    "chaptersPurchased": 5,
    'price': 15,
    'link' : 'google.com',
},
    {
        'title': 'قلعه ی حیوانات',
        'author': "عطا",
        'description': 'کتاب خوب',
        "image": "./a.jpeg",
        'purchased': 0,
        "chaptersPurchased": 0,
        'price': 10,
        'link' : '',

    },
    {
        'title': 'قلعه ی حیوانات',
        'author': "علی اصغر",
        'description': 'کتاب خوب',
        "image": "./a.jpeg",
        'purchased': 1,
        "chaptersPurchased": 5,
        'price': 20,
        'link' : '',

    }, {
        'title': 'قلعه ی حیوانات',
        'author': "جورج",
        'description': 'کتاب خوب',
        "image": "./a.jpeg",
        'purchased': 1,
        "chaptersPurchased": 5,
        'price': 10,
        'link' : '',

    },];




class BookList extends Component {


    render() {

        return (
            <Template {...this.props}>
                <Segment
                    style={{
                        width: ' 70%',

                        margin: 'auto'
                    }}>
                <Grid style={{

                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        margin: 'auto'
                    }}>
                    {books.map(book =>

                           <BookCard bookImage={book.image} title={book.title} author={book.author}
                                      description={book.description} purchased={book.purchased}
                                      chaptersPurchased={book.chaptersPurchased} price={book.price} link={book.link}/>


                    )}
                </Grid>

                </Segment>

            </Template>


        )
    }


}

export default BookList;