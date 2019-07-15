import React, {Component} from "react";
import axios from "axios";
import Template from "../components/template";
import {Grid, Loader, Dimmer, Segment, Button} from "semantic-ui-react";
import BookCard from "../components/bookCard";
import AskedQuestions from "../components/askedQuestions";
import PurchasedBooks from "../components/purchasedBooks";
import SidebarMenu from '../components/sidebarMenu'
import PersonalInfo from '../components/personalInfo'
import ChangePassword from '../components/changePassword'


const menuItems = [
    {
        'name': 'مشخصات کاربری',
        'iconName': 'user',
    },
    {
        'name': 'تغییر گذرواژه',
        'iconName': 'lock',
    },
    {
        'name': 'کتاب‌های خریداری شده',
        'iconName': 'book',
    },

    {
        'name': 'سوالات پرسیده شده',
        'iconName': 'question circle',
    },
];


class Profile extends Component {


    state = {
        books: [],
        bought_books: [],
        numOfChapters: [],
        activeItem: 'مشخصات کاربری',
        username: '',
        userInfo: {},
        allow: false,
        askedQuestions: []
    };

    handleItemClick = (e, {name}) => this.setState({activeItem: name});
    getPageContent = () => {
        if (this.state.activeItem === 'مشخصات کاربری') {
            console.log('personal info', this.state.userInfo)
            return (
                <PersonalInfo info={this.state.userInfo}/>
            )
        } else if (this.state.activeItem === 'کتاب‌های خریداری شده') {
            if (this.state.bought_books.length === 0) {
                return (
                    <a href={'/books'}><Button>مشاهد‌ه‌ی لیست کتاب ها</Button></a>
                )
            } else {
                return (
                    <PurchasedBooks prefix={'http://localhost:8000'} bought_books={this.state.bought_books}
                                    numOfChapters={this.state.numOfChapters}/>
                )
            }
        } else if (this.state.activeItem === 'سوالات پرسیده شده') {
            if (this.state.askedQuestions.length === 0) {
                return (
                    <a href={'/questions/submit'}><Button>ایجاد سوال</Button></a>
                )
            } else {
                return (
                    <AskedQuestions isProfile={1} asker={this.state.username} question={this.state.askedQuestions}/>
                )
            }
        } else if (this.state.activeItem === 'تغییر گذرواژه') {
            return (
                <ChangePassword/>
            )
        }

    };

    componentDidMount() {
        document.title = "پروفایل";
        console.log(localStorage.getItem('chegg-token'));
        axios.get(`http://localhost:8000/store/books`)
            .then(res => {
                let numOfChapters = new Array(res.data.length).fill(0);
                var headers = {

                    'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
                };
                axios.get(`http://localhost:8000/auth/self/`, {headers: headers})
                    .then(res => {

                        for (var i = 0; i < res.data.bought_chapters.length; i++) {

                            numOfChapters[res.data.bought_chapters[i].book - 1] += 1;

                        }
                        console.log('data', res.data.asked_questions)
                        this.setState(
                            {
                                numOfChapters: numOfChapters,
                                bought_books: res.data.bought_books,
                                userInfo: res.data.user_info,
                                askedQuestions: res.data.asked_questions,
                                books: res.data,
                                username: localStorage.getItem('chegg-username')
                            }
                        );
                        var that = this;
                    }).catch((error) => {
                    console.log(error)
                })
            });

    }


    render() {
        if (localStorage.getItem('chegg-username') === null) {
            return (
                <div style={{textAlign: 'center', marginTop: '300px', fontFamily: 'B Yekan', fontSize: '2em'}}>
                    صفحه مورد نظر یافت نشد
                    <br/>
                    <br/>
                    <a href={'/'}>صفحه اصلی</a>
                </div>
            )
        }
        // if (!this.state.allow) {
        //     return (
        //
        //         <Dimmer active>
        //             <Loader size='massive' style={{textAlign: 'center', fontFamily: 'B Yekan'}}>
        //                 در حال بارگذاری
        //             </Loader>
        //
        //         </Dimmer>
        //     )
        // }
        else {
            return (

                <Template {...this.props}>

                    <Grid style={{margin: 'auto', direction: 'rtl', width: '70%', height: '80%'}}>
                        <Grid.Row columns={2}>
                            <Grid.Column width={3}>
                                <SidebarMenu activeItem={this.state.activeItem} menuItems={menuItems}
                                             handleItemClick={this.handleItemClick}/>
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


}

export default Profile;