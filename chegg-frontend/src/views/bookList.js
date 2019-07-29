import React, {Component} from "react";
import {Grid, Icon, Image, Menu, Search, Segment} from 'semantic-ui-react'
import BookCard from '../components/book/bookCard'
import Template from '../components/template/template';
import axios from "axios";
import Ad from '../components/ad'
import _ from "lodash";
const initialState = {isLoading: false, results: [], value: ''}

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
        isLoading: false,
        value: '',
        results: [],
        numOfChapters: []

    };

    handleResultSelect = (e, {result}) => {
        this.props.history.push('books/' + result.id);
    };

    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true, value});

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState);

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result.title);

            this.setState({
                isLoading: false,
                results: _.filter(this.state.books, isMatch),
            })
        }, 300)
    };

    searchResultRenderer = ({price, title}) => [
        <Grid key='content' className='content'>
            <Grid.Row columns={2}>
                <Grid.Column width={4} style={{textAlign:'left'}}>
                    <div className='price'>{price}</div>&nbsp;:قیمت
                </Grid.Column>
                <Grid.Column style={{fontFamily: 'B Yekan', color:'#4183c4', textAlign:'right'}} width={12}>
                    {title}
                </Grid.Column>

            </Grid.Row>
        </Grid>,
    ];
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
                            <Search
                                resultRenderer={this.searchResultRenderer}
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
                            <div
                                style={{
                                    // backgroundImage: 'url("data:image/jpeg;base64,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")',
                                    backgroundColor: 'none',
                                    margin: 'auto',
                                    maxHeight: '100%',
                                    overflow: 'auto',


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

                            </div>
                        </Grid.Column>
                        <Grid.Column style={{height:'80vh'}} width={3}>
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