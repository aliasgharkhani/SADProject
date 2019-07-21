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
        console.log('username ', localStorage.getItem('chegg-username'))
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