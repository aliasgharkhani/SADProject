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
import UpgradeUserLevel from '../components/upgradeUserLevel';
import MyProfile from '../components/myProfile'
import PublicProfile from '../components/publicProfile'


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
    {
        'name': 'سوالات جواب داده',
        'iconName': 'check circle',
    },
    {
        'name': 'ارتقای سطح کاربری',
        'iconName': 'toggle up',
    },


];


class UserProfile extends Component {


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


    };

    reloadWhenUpgraded = () => {
        this.setState({level: true})

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
        }

    };
    //
    // componentDidMount() {
    //     document.title = "پروفایل";
    //     console.log(localStorage.getItem('chegg-token'));
    //     console.log('mahdi  ', this.props.match.params);
    //
    //     axios.get(`http://localhost:8000/store/books`)
    //         .then(res => {
    //             let numOfChapters = new Array(res.data.length).fill(0);
    //             var headers = {
    //
    //                 'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
    //             };
    //             axios.get(`http://localhost:8000/auth/self/`, {headers: headers})
    //                 .then(res => {
    //
    //                     for (var i = 0; i < res.data.bought_chapters.length; i++) {
    //
    //                         numOfChapters[res.data.bought_chapters[i].book - 1] += 1;
    //
    //                     }
    //                     console.log('data', res.data)
    //                     this.setState(
    //                         {
    //                             numOfChapters: numOfChapters,
    //                             bought_books: res.data.bought_books,
    //                             userInfo: res.data.user_info,
    //                             askedQuestions: res.data.asked_questions,
    //                             books: res.data,
    //                             username: localStorage.getItem('chegg-username'),
    //                             level: res.data.premium,
    //                             answeredQuestions: res.data.user_info.answered_questions,
    //                         }
    //                     );
    //                     var that = this;
    //                 }).catch((error) => {
    //                 console.log(error)
    //             })
    //         });
    //
    // }


    render() {
        var urlParameters = this.props.match.params;
        if (localStorage.getItem('chegg-username') === null) {

            return (
                <PublicProfile urlParameters={urlParameters}/>
            )
        } else {
            return (

                <MyProfile urlParameters={urlParameters}/>


            )
        }
    }


}

export default UserProfile;