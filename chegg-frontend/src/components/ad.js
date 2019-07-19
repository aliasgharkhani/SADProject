import React, {Component} from "react";




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
            <div  style={{ width: '100%', height: '100%',backgroundSize: 'contain', backgroundImage : 'url("https://cdn.zoomg.ir/2019/3/4db9f81a-8796-431d-9ef0-80fbc174257c.gif")'}} />

        )
    }


}

export default Ad;






















