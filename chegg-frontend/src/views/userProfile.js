import React, {Component} from "react";
import MyProfile from '../components/myProfile'
import PublicProfile from '../components/publicProfile'

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
        console.log('username ', localStorage.getItem('chegg-username'))
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