import React, {Component} from "react";
import axios from "axios";
import {Icon, Menu} from "semantic-ui-react";


const IconExampleDisabled = () => <Icon name='users'/>;

const IconExampleDisabled2 = () => <Icon name='users'/>;


class Navbar extends Component {

    state = {

        setName: false,
        name: '',
        change: false,
        first: true
    };


    handleItemClick = (e, {name, path}) => {

        console.log(path);

        window.location.replace(path);
    };


    handleLogout = (e) => {
        axios.get('http://localhost:8000/auth/logout');
        localStorage.removeItem("chegg-token");
        localStorage.removeItem("chegg-username");
        window.location.reload();
    };

    render() {
        if (localStorage.getItem('username') !== null && !this.state.setName) {
            this.setState({setName: true, name: localStorage.getItem('username')})
        }


        const Login_Logout = () => {
            if (localStorage.getItem('chegg-token') !== null) {

                return (
                    <Menu.Item
                        onClick={this.handleLogout}
                        name="خروج"
                        path='/sport3/login'
                        position={"LEFT"}
                    />


                )
            } else {
                return (
                    <Menu.Menu position='left'>
                        <Menu.Item
                            name='ورود'
                            path='/signin'
                            onClick={this.handleItemClick}

                        />
                        <Menu.Item
                            name='ثبت نام'
                            path='/signup'
                            onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                )
            }
        };
        const UserName_or_Icon = () => {
            if (localStorage.getItem('chegg-token') !== null) {

                return (
                    <Menu.Item
                        name={localStorage.getItem('chegg-username')}
                        path='/sport3/login'
                    />


                )
            }
        };


        const fixedMenuItems = () => {
            return (
                <Menu.Menu position={"right"}>
                    <Menu.Item
                        name='کتاب ها'
                        path='/books'
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='صفحه ی اصلی'
                        path='http://localhost:3000/'
                        onClick={this.handleItemClick}
                        style={{padding: '20px'}}

                    />

                </Menu.Menu>
            )
        };


        if (localStorage.getItem('chegg-token') !== null) {
            return (

                <Menu inverted className='borderless'
                      style={{height: '100%', fontFamily: 'B Yekan' , padding: "0em 1.5em"}}>

                    {Login_Logout()}
                    {fixedMenuItems()}
                    {UserName_or_Icon()}
                    {/*<Menu.Item>*/}
                    {/*    <Icon name='list'/>*/}
                    {/*</Menu.Item>*/}

                </Menu>


            )
        } else {
            return (

                <Menu inverted className='borderless' style={{height: '100%', fontFamily: 'B Yekan', padding: "0em 1.5em"}}>


                    {Login_Logout()}
                    {fixedMenuItems()}
                    <Menu.Item>
                        <Icon name='user'/>
                    </Menu.Item>

                </Menu>


            )
        }

    }
}

export default Navbar;