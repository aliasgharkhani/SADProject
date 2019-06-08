import _ from "lodash";
import React, { Component } from "react";
import axios from "axios";
import { render } from "react-dom";
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive,
  Dropdown
} from "semantic-ui-react";


const IconExampleDisabled = () => <Icon  name='users' />;





class Navbar extends Component {

    state = {

        setName: false,
        name: '',
        change: false,
        first: true
    };



    handleItemClick = (e, {name, path}) => {


            window.location.replace( path);
    };

    handleLogout = (e) => {
        localStorage.removeItem("chegg-token");
        localStorage.removeItem("chegg-username");
        this.setState({
            name: ''
        });
    };

    render() {
        if (localStorage.getItem('username') !== null && !this.state.setName) {
            this.setState({setName: true, name: localStorage.getItem('username')})
        }
        const Logout = () => {
            // let url = window.location.href;
            let userAuth = false;
            // url = url.replace('3', '8');
            axios.defaults.withCredentials = true;
            let self = this;
            // let bodyFormData = new FormData();
            // bodyFormData.set('username', localStorage.getItem('username'));
            axios.get('http://localhost:8000/sport3/logout').then(function (response) {
                localStorage.removeItem('username');
                localStorage.removeItem('Authorization');
                self.setState({change: !self.state.change});
                window.location.reload()
            });

        };
        const Login_Logout = () => {
            if (localStorage.getItem('chegg-token') !== null) {

                return (



                        <Menu.Item
                            onClick = {this.handleLogout}
                            name= "خروج"
                            path='/sport3/login'
                            position={"left"}
                        />


                )
            } else {
                return (
                    <Menu.Item
                    name='ورود'
                    path='/signin'
                    position={"left"}
                    onClick={this.handleItemClick}

                    />

                )
            }
        };
        const UserName_or_Icon = () => {
            if (localStorage.getItem('chegg-token') !== null) {

                return (
                        <Menu.Item

                            name= {localStorage.getItem('chegg-username')}
                            path='/sport3/login'

                        />


                )
            }
        };


        const fixedMenuItems = () => {
            return(
                <Menu.Item
                    name='صفحه ی اصلی'
                    path=''
                    onClick={this.handleItemClick}
                    style={{padding: '20px'}}
                />
            )
        };

        if (localStorage.getItem('chegg-token') !== null){
            return (

            <Menu inverted style={{height: '100%', direction: 'rtl', fontFamily: 'B Yekan'}}>
                <i aria-hidden="true" className="users icon"/>

                {UserName_or_Icon()}
                 <Menu.Item
                    name='ثبت نام'
                    path='/signup'
                    onClick={this.handleItemClick}
                />
                {fixedMenuItems()}



                {Login_Logout()}




            </Menu>


        )
        }
        else {
            return (

            <Menu inverted style={{height: '100%', direction: 'rtl', fontFamily: 'B Yekan'}}>
                <i aria-hidden="true" className="users icon"/>

                <Menu.Item
                    name='ثبت نام'
                    path='/signup'
                    onClick={this.handleItemClick}
                />
                {fixedMenuItems()}




                {Login_Logout()}
            </Menu>


        )
        }

    }
}

export default Navbar;