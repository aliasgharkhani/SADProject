import React, {Component} from 'react';
import {Message} from 'semantic-ui-react';




class Footer extends Component{
    render() {
        return(
            <Message color='black' dir={'rtl'} style={{textAlign: 'center'}}>
                chegg@ce.sharif.edu <br/>
                تهران، دانشگاه شریف، دانشکده کامپیوتر، طبقه ۹ <br/>
                12345678 21 (98+)<br/>
                تمامی حقوق این سایت متعلق به فناوران شریف میباشد.
            </Message>
        )
    }
}

export default Footer;