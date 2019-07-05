import React, {Component} from "react";
import {Grid, Menu, Segment} from 'semantic-ui-react'
import BookCard from '../components/bookCard'


class PurchasedBooks extends Component {
        render() {


        return (
                <Segment
                    color='red'
                    style={{
                       backgroundColor:'#e0e6ff',
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
                        {this.props.bought_books.map(book =>

                            <BookCard  bookCover={book.cover} title={book.title}
                                      author={book.author}
                                      description={book.description} purchased={1}
                                      chaptersPurchased={this.props.numOfChapters[book.id - 1]} price={book.price}
                                      link={'http://localhost:3000/books/' + book.id}/>
                        )}
                    </Grid>

                </Segment>

        )
    }


}

export default PurchasedBooks;