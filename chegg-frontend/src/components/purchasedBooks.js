import React, {Component} from "react";
import {Grid, Menu, Segment} from 'semantic-ui-react'
import BookCard from '../components/bookCard'


class PurchasedBooks extends Component {
    constructor(props){
        super(props);
        this.state = {
            bought_books:[],
            prefix:'',
            numOfChapters:[]
        }
    }
    static getDerivedStateFromProps(props, state) {
        return {
            bought_books: props.bought_books,
            prefix:props.prefix,
            numOfChapters:props.numOfChapters,

        };
    }

    render() {


        return (
                <Segment
                    color='red'
                    style={{
                        backgroundImage: 'url("https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-037.jpg")',
                        margin: 'auto',
                        maxHeight: '48vh',
                        overflow: 'auto',
                    }}>
                    <Grid style={{

                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        flexWrap: 'wrap',
                        margin: 'auto',


                    }}>
                        {this.state.bought_books.map(book =>

                            <BookCard  bookCover={this.state.prefix + book.cover} title={book.title}
                                      author={book.author}
                                      description={book.description} purchased={1}
                                      chaptersPurchased={this.state.numOfChapters[book.id - 1]} price={book.price}
                                      link={'http://localhost:3000/books/' + book.id}/>
                        )}
                    </Grid>

                </Segment>

        )
    }


}

export default PurchasedBooks;