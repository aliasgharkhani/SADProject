import React, {Component} from "react";
import axios from "axios";
import Template from "../components/template";
import {Grid, Segment} from "semantic-ui-react";
import BookCard from "../components/bookCard";
import AskedQuestions from "../components/askedQuestions";
import PurchasedBooks from "../components/purchasedBooks";

const question = [
    {
        'title': 'قلعه ی حیوانات',
        'description': 'کتاب خوبری  بیمتن طاب متیبمتبس  متیب یسب سیبهعهسیب سیب سیمت یبس ایبل سیبم سیب یسلغ سیب کتاب خوبری  بیمتن طاب متیبمتبس  متیب یسب سیبهعهسیب سیب سیمت یبس ایبل سیبم سیب یسلغ سیب کتاب خوبری  بیمتن طاب متیبمتبس  متیب یسب سیبهعهسیب سیب سیمت یبس ایبل سیبم سیب یسلغ سیب ',
        'link': 'google.com',

        'tags': ['java', 'python']
    },
    {
        'title': 'قلعه ی حیوانات',
        'description': 'کتاب بدری بود',
        'link': '',
        'tags': ['mathematics']

    },
    {
        'title': 'قلعه ی حیوانات',
        'description': 'دسکریذتوین',
        'tags': ['cpp'],
        'link': '',

    }, {
        'title': 'قلعه ی حیوانات',
        'description': 'منیم کتاب',
        'tags': ['C', 'C#'],
        'link': '',

    },];


class Profile extends Component {


    state = {
        books: [],
        bought_books: [],
        myQuestions: question,
        numOfChapters: []

    };


    componentWillMount() {
        console.log(localStorage.getItem('chegg-token'))
        axios.get(`http://localhost:8000/store/books`)
            .then(res => {
                this.setState({
                    books: res.data,
                    numOfChapters: new Array(res.data.length).fill(0)
                })


                var headers = {

                    'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
                };
                axios.get(`http://localhost:8000/auth/self/`, {headers: headers})
                    .then(res => {


                        let numOfChapters = new Array(this.state.books.length).fill(0);

                        for (var i = 0; i < res.data.bought_chapters.length; i++) {

                            numOfChapters[res.data.bought_chapters[i].book - 1] += 1;

                        }

                        this.setState(
                            {
                                numOfChapters: numOfChapters,
                                bought_books: res.data.bought_books,
                            }
                        )
                    }).catch((error) => {
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
        console.log("profile")

        return (

            <Template {...this.props}>

                <Grid style={{
                    margin: 'auto',


                }}>
                    <Grid.Row >

                        <PurchasedBooks  bought_books={this.state.bought_books}
                                        numOfChapters={this.state.numOfChapters}/>

                    </Grid.Row>

                    <Grid.Row
                        >
                        <AskedQuestions question={this.state.myQuestions}/>
                    </Grid.Row>

                    <Grid.Row>

                    </Grid.Row>
                </Grid>


            </Template>


        )
    }


}

export default Profile;