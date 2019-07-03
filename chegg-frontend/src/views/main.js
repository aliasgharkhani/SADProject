import React, {Component} from "react";
import Template from '../components/template';
import {Grid} from "semantic-ui-react";
import './hoverRight.css';
import BackgroundImageOnLoad from 'background-image-on-load';


class Main extends Component {

    handleItemClick = (e, {name, path}) => {

        console.log(path);

        window.location.replace(path);
    };

    state = {
        loaded: 'none'
    };

    render() {
        return (
            <Template>
                <BackgroundImageOnLoad
                    src={'https://wallimpex.com/data/out/774/old-book-wallpaper-11223624.jpg'}
                    onLoadBg={() =>
                        this.setState({
                            loaded: true
                        })}
                    onError={err => console.log('error', err)}
                />


                <Grid style={{width: ' 70%', margin: 'auto', height:'80vh', display: this.state.loaded}}>
                    <Grid.Row style={{
                        minHeight: ' 50vh',
                        // margin: 'auto',
                        direction: 'rtl',
                        backgroundImage: "url('https://wallimpex.com/data/out/774/old-book-wallpaper-11223624.jpg')",
                        backgroundSize: "cover"
                    }}>
                        <Grid.Column width={6} style={{
                            margin: 'auto 0',
                            padding: 20,
                            color: '#e2ccba',
                            fontSize: "2em",
                            lineHeight: '1.3em'
                        }}>
                            دیگر نگران تمرین های سختتان نباشید!! راه حل سوالات و پاسخ نامه ی کتاب
                            ها در در چگ پیدا کنید.
                            <br/>
                            <br/>

                            <a href={'books'} className='myHover'
                               style={{fontSize: '1.5em',}}> پاسخ نامه ی کتاب
                                ها</a>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            </Template>
        )
    }
}

export default Main;