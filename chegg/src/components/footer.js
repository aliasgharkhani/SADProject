import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import MailIcon from '@material-ui/icons/MailOutline';
import Location from '@material-ui/icons/Room';
import Call from '@material-ui/icons/Call';
import CopyRight from '@material-ui/icons/Copyright';
import Box from '@material-ui/core/Box';
import {Typography} from "@material-ui/core";
import IconWithText from "./iconWithText";

const footerStyle = {
    backgroundColor: '#13003d',
    color: '#ffffff',
    padding: '16px',
    textAlign: 'center'
};


class Footer extends Component {
    render() {
        return (
            <Grid container style={footerStyle}>
                <Grid item xs={12}>
                        
                            <IconWithText icon={<MailIcon/>} text={'chegg@ce.sharif.edu'}/>
                            <IconWithText icon={<Location/>} text={'تهران، دانشگاه شریف، دانشکده کامپیوتر، طبقه ۹'}/>
                            <IconWithText icon={<Call/>} text={'12345678 21 (98+)'}/>
                            <IconWithText icon={<CopyRight/>} text={'تمامی حقوق این سایت متعلق به فناوران شریف میباشد.'}/>
                        
                </Grid>
            </Grid>
        )
    }
}

export default Footer;