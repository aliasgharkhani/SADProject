import React, {Component} from "react";
import axios from "axios";
import Template from "../template/template";
import {Button, Grid, Message} from "semantic-ui-react";
import AskedQuestions from "./askedQuestions";
import PurchasedBooks from "../book/purchasedBooks";
import SidebarMenu from './sidebarMenu'
import PersonalInfo from './personalInfo'
import ChangePassword from './changePassword'
import UpgradeUserLevel from './upgradeUserLevel';
import Messages from '../messages';


let menuItems = [
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
    {
        'name': 'سوالات جواب داده',
        'iconName': 'check circle',
    },
    {
        'name': 'ارتقای سطح کاربری',
        'iconName': 'toggle up',
    },
    {
        'name': 'پیام ها',
        'iconName': 'envelope',
        'label': '0'
    }


];
class MyProfile extends Component {


    state = {
        books: [],
        bought_books: [],
        numOfChapters: [],
        activeItem: 'مشخصات کاربری',
        username: '',
        userInfo: {},
        allow: false,
        askedQuestions: [],
        answeredQuestions: [],
        level: false,
        messages: [],
        banned: false
    };

    reloadWhenUpgraded = () => {
        this.setState({level: true})

    };
    reloadWhenPerssonalChanged = (e) => {
        this.setState({userInfo: e})
    };


    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name});
    }
    getPageContent = () => {
        if (this.state.activeItem === 'مشخصات کاربری') {
            return (
                <PersonalInfo handler={this.reloadWhenPerssonalChanged} info={this.state.userInfo}/>
            )
        } else if (this.state.activeItem === 'کتاب‌های خریداری شده') {
            if (this.state.bought_books.length === 0) {
                return (
                    <a href={'/books'}><Button style={{fontFamily: 'B Yekan'}}>مشاهد‌ه‌ی لیست کتاب ها</Button></a>
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
                    <a href={'/questions/submit'}><Button style={{fontFamily: 'B Yekan'}}>ایجاد سوال</Button></a>
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
        } else if (this.state.activeItem === 'سوالات جواب داده') {
            console.log(this.state.answeredQuestions, ' answered questions myProfile')
            if (this.state.answeredQuestions.length === 0) {
                return (
                    <p style={{fontSize: '2em'}}> هنوز به سوالی جواب نداده اید.</p>
                )
            } else {
                return (
                    <AskedQuestions isProfile={0} asker={this.state.username} question={this.state.answeredQuestions}/>
                )
            }
        } else if (this.state.activeItem === 'ارتقای سطح کاربری') {
            if (this.state.level) {
                return (
                    <p style={{fontSize: '2em'}}> حساب کاربری شما ارتقا یافته است.</p>
                )
            } else {
                return (
                    <UpgradeUserLevel handler={this.reloadWhenUpgraded}/>

                )
            }
        } else if (this.state.activeItem === 'پیام ها') {
            if (this.state.messages.length === 0) {
                return (
                    <p style={{fontSize: '2em'}}>پیامی برای مشاهده وجود ندارد</p>
                )
            } else {
                return (
                    <Messages messages={this.state.messages} readMessages={this.readMessages}/>
                )
            }
        }

    };

    readMessages = () => {

        var headers = {

            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
        };
        axios.get('http://localhost:8000/auth/self/', {headers: headers})
            .then(res => {
                this.setState(
                    {
                        messages: res.data.messages
                    }
                );
                var that = this;
            }).catch((error) => {
            console.log(error)
        })

    }

    componentDidMount() {
        document.title = "پروفایل";
        console.log(localStorage.getItem('chegg-token'));
        axios.get(`http://localhost:8000/store/books`)
            .then(res => {
                var numOfChapters = new Array(res.data.length).fill(0);
                var headers = {

                    'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
                };
                axios.get('http://localhost:8000/auth/self/', {headers: headers})
                    .then(res => {
                        for (var i = 0; i < res.data.bought_chapters.length; i++) {
                            numOfChapters[res.data.bought_chapters[i].book - 1] += 1;
                        }
                        var questions = []
                        var questionIds = []

                        for (var i = 0; i < res.data.replies.length; i++) {
                            if (!questionIds.includes(res.data.replies[i].qestion)) {
                                questionIds.push(res.data.replies[i].qestion)
                                console.log(res.data.replies[i].qestion, ' foring replies')
                                axios.get('http://localhost:8000/qa/questions/' + res.data.replies[i].question + '/',)
                                    .then(res2 => {

                                        questions.push(res2.data)


                                    }).catch((error) => {

                                })
                            }

                        }

                        this.setState(
                            {
                                numOfChapters: numOfChapters,
                                bought_books: res.data.bought_books,
                                userInfo: res.data.user_info,
                                askedQuestions: res.data.asked_questions,
                                books: res.data,
                                username: localStorage.getItem('chegg-username'),
                                level: res.data.premium,
                                answeredQuestions: questions,
                                messages: res.data.messages,
                                questions: questions,

                            }
                        );


                        var that = this;
                    }).catch((error) => {
                    this.setState({
                        banned: true
                    })
                })
            });

    }


    render() {
        if (this.state.banned) {
            return (
                <Template {...this.props}>
                    <Message negative style={{'direction': 'rtl', 'textAlign': 'center'}}>
                        <Message.Header>حساب کاربری شما مسدود شده است.</Message.Header>
                    </Message>
                </Template>
            )
        }

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

                    <Grid style={{margin: 'auto', direction: 'rtl', width: '70%', height: '82vh'}}>
                        <Grid.Row columns={2}>
                            <Grid.Column width={3}>
                                <SidebarMenu activeItem={this.state.activeItem}
                                             messagesLen={this.state.messages.filter((message) => !message.read).length}
                                             menuItems={menuItems}
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

export default MyProfile;