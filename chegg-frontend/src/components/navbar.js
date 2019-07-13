import React, {Component} from "react";
import axios from "axios";
import {Dropdown, Icon, Menu} from "semantic-ui-react";


const IconExampleDisabled = () => <Icon name='users'/>;

const IconExampleDisabled2 = () => <Icon name='users'/>;


class Navbar extends Component {

    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this);
    }

    state = {

        setName: false,
        name: '',
        change: false,
        first: true,
        visible: false,
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
            if (localStorage.getItem('chegg-token') === null) {

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
            const options = [
                {key: 1, text: 'صفحه ی من', value: 1, path: '/profile', onClick: this.handleItemClick},
                /*{key: 2, text: 'Choice 2', value: 2},*/
                {key: 2, text: 'خروج', value: 2, onClick: this.handleLogout},
            ];
            if (localStorage.getItem('chegg-token') !== null) {
                const icons = <div><Icon name='user'/> {localStorage.getItem('chegg-username')}</div>
                return (
                    <Dropdown text={icons} options={options} simple item/>

                )
            }
        };


        const fixedMenuItems = () => {
            return (
                <Menu.Menu position={"right"}>
                    <Menu.Item
                        name='سوال بپرسید'
                        path='/questions/submit'
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='سوالات'
                        path='/questions'
                        onClick={this.handleItemClick}
                    />
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
                      style={{height: '100%', fontFamily: 'B Yekan', padding: "0em 1.5em"}}>
                    {UserName_or_Icon()}
                    {Login_Logout()}
                    {fixedMenuItems()}


                </Menu>


            )
        } else {
            return (

                <Menu inverted className='borderless'
                      style={{height: '100%', fontFamily: 'B Yekan', padding: "0em 1.5em"}}>


                    {Login_Logout()}
                    {fixedMenuItems()}


                </Menu>


            )
        }

    }
}

export default Navbar;