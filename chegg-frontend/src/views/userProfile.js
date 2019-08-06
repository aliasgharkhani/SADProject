import React, {Component} from "react";
import MyProfile from '../components/user/myProfile'
import PublicProfile from '../components/user/publicProfile'

class UserProfile extends Component {


    state = {
        level: false,


    };

    reloadWhenUpgraded = () => {
        this.setState({level: true})

    };

    render() {
        var urlParameters = this.props.match.params;
        var username = urlParameters.username;

        if (localStorage.getItem('chegg-username') === username) {

            return (
                <MyProfile urlParameters={urlParameters}/>
            )
        } else {
            return (
                <PublicProfile urlParameters={urlParameters}/>


            )
        }
    }


}

export default UserProfile;