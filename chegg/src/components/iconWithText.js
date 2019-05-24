import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';


class IconWithText extends Component {
    render() {
        return (
            <div>
                <Grid container spacing={1} justify={'center'}>
                    <Grid item>
                        {this.props.icon}
                    </Grid>

                    <Grid item>
                        {this.props.text}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default IconWithText