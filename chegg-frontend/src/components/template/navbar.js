import React, {Component} from "react";
import axios from "axios";
import {Dropdown, Icon, Label, Menu, Popup} from "semantic-ui-react";


const IconExampleDisabled = () => <Icon name='users'/>;

const IconExampleDisabled2 = () => <Icon name='users'/>;


class Navbar extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            setName: false,
            name: '',
            change: false,
            first: true,
            visible: false,
            messages: []
        }
    }

    componentDidMount() {
        var headers = {

            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
        };
        axios.get('http://localhost:8000/auth/self/', {headers: headers})
            .then(res => {
                console.log('sadi  ',res.data.messages);
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


    handleItemClick = (e, {name, path}) => {

        this.setState({
            messages: []
        });

        window.location.replace(path);
    };


    handleLogout = (e) => {
        axios.get('http://localhost:8000/auth/logout');
        localStorage.removeItem("chegg-token");
        localStorage.removeItem("chegg-username");
        window.location.replace("http://localhost:3000/");
    };


    render() {

        if (localStorage.getItem('username') !== null && !this.state.setName) {
            this.setState({setName: true, name: localStorage.getItem('username')})
        }


        const Login_Logout = () => {
            if (localStorage.getItem('chegg-token') === null) {

                return (
                    <Menu.Menu style={{marginRight: 'auto'}}>
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
                {
                    key: 1,
                    text: 'صفحه ی من',
                    value: 1,
                    path: '/profile/' + localStorage.getItem('chegg-username'),
                    onClick: this.handleItemClick
                },
                /*{key: 2, text: 'Choice 2', value: 2},*/
                {key: 2, text: 'خروج', value: 2, onClick: this.handleLogout},
            ];
            let unread_messages_number = this.state.messages.filter((message) => !message.read).length;
            if (localStorage.getItem('chegg-token') !== null) {
                const icons = <div><Icon name='user'/> {localStorage.getItem('chegg-username')}</div>
                return (
                    <Menu.Menu style={{marginRight: 'auto', padding: '0'}}>

                        <Menu.Item path={'/profile/' + localStorage.getItem('chegg-username') + '/message/'}
                                   onClick={this.handleItemClick}>
                            <Popup style={{fontFamily: 'B Yekan'}}
                                   content={'برای مشاهده‌ی پیام‌ها کلیک کنید'}
                                   trigger={unread_messages_number === 0 ?
                                       <Label>{unread_messages_number}</Label> : unread_messages_number < 10 ?
                                           <Label color='teal'>{unread_messages_number}</Label> :
                                           <Label>9+</Label>}/>


                        </Menu.Item>
                        <Dropdown style={{margin: '0'}} text={icons} options={options} item/>
                    </Menu.Menu>

                )
            }
        };


        const fixedMenuItems = () => {
            return (
                <Menu.Menu>
                    <Menu.Item
                        name='صفحه ی اصلی'
                        path='http://localhost:3000/'
                        onClick={this.handleItemClick}
                        style={{padding: '20px'}}

                    />
                    <Menu.Item
                        name='کتاب ها'
                        path='/books'
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='سوالات'
                        path='/questions'
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='سوال بپرسید'
                        path='/questions/submit'
                        onClick={this.handleItemClick}
                    />


                </Menu.Menu>
            )
        };


        if (localStorage.getItem('chegg-token') !== null) {
            return (


                <Menu inverted className='borderless'
                      style={{height: '100%', fontFamily: 'B Yekan', padding: "0em 1.5em"}}>
                    {fixedMenuItems()}
                    {UserName_or_Icon()}


                </Menu>


            )
        } else {
            return (

                <Menu inverted className='borderless'
                      style={{height: '100%', fontFamily: 'B Yekan', padding: "0em 1.5em"}}>


                    {fixedMenuItems()}
                    {Login_Logout()}


                </Menu>


            )
        }

    }
}

export default Navbar;