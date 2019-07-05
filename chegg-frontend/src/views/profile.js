import React, {Component} from "react";
import axios from "axios";
import Template from "../components/template";
import {Grid, Segment} from "semantic-ui-react";
import BookCard from "../components/bookCard";
import AskedQuestions from "../components/askedQuestions";
import PurchasedBooks from "../components/purchasedBooks";
import SidebarMenu from '../components/sidebarMenu'

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


const menuItems=[
    {
        'name' : 'مشخصات کاربری'
    },
    {
        'name' : 'کتاب‌های خریداری شده'
    },
    {
        'name' : 'سوالات پرسیده شده'
    },
];

class Profile extends Component {


    state = {
        books: [],
        bought_books: [],
        myQuestions: question,
        numOfChapters: [],
        activeItem: 'مشخصات کاربری',

    };

    handleItemClick = (e, {name}) => this.setState({activeItem: name});
    getPageContent = () => {
        if(this.state.activeItem === 'مشخصات کاربری'){
            return(
                <div>نام</div>
            )
        }
        else if(this.state.activeItem === 'کتاب‌های خریداری شده'){
            return(
                <PurchasedBooks bought_books={this.state.bought_books}
                                        numOfChapters={this.state.numOfChapters}/>
            )
        }
        else if(this.state.activeItem === 'سوالات پرسیده شده'){
            return(
                <AskedQuestions question={this.state.myQuestions}/>
            )
        }
    }
    componentWillMount() {
        console.log(localStorage.getItem('chegg-token'));
        axios.get(`http://localhost:8000/store/books`)
            .then(res => {
                this.setState({
                    books: res.data,
                    numOfChapters: new Array(res.data.length).fill(0)
                });


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
        return (

            <Template {...this.props}>

                <Grid style={{margin: 'auto',direction:'rtl', width:'70%', height:'80%'}}>
                    <Grid.Row columns={2}>
                        <Grid.Column width={3}>
                            <SidebarMenu activeItem={this.state.activeItem} menuItems={menuItems} handleItemClick={this.handleItemClick}/>
                        </Grid.Column>
                        <Grid.Column width={13}>
                           {this.getPageContent()}
                       </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Template>


        )
    }


}

export default Profile;