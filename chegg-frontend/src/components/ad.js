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





class Ad extends Component {


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

    render() {
        return(
            <div  style={{ width: '90%', height: '100%',backgroundSize: 'contain', backgroundImage : 'url("https://cdn.zoomg.ir/2019/3/4db9f81a-8796-431d-9ef0-80fbc174257c.gif")'}} />

        )
    }


}

export default Ad;






















