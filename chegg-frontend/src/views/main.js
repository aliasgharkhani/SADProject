import React, {Component} from "react";
import Template from '../components/template/template';
import {Grid} from "semantic-ui-react";
import './hoverRight.css';
import BackgroundImageOnLoad from 'background-image-on-load';
import Slider from "react-slick";


class Main extends Component {

    handleItemClick = (e, {name, path}) => {

        console.log(path);
        this.props.history.push('../' + path)
        // window.location.replace(path);
    };

    state = {
        loaded: 'none'
    };

    componentDidMount() {
        document.title = "chegg";
    }

    render() {

        var settings = {
            adaptiveHeight: true,
            autoplay: true,
            infinite: true,
            speed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            rtl: false,
            accessibility: true,
            arrows: true,
            dots: true,
        };
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

                <Slider {...settings}>
                    <Grid style={{width: ' 70%', margin: 'auto', display: this.state.loaded}}>


                        <Grid.Row style={{
                            // minHeight: ' 50vh',
                            // margin: 'auto',
                            height: '86.3vh',
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
                    <Grid style={{width: ' 70%', margin: 'auto', display: this.state.loaded}}>


                        <Grid.Row style={{
                            // minHeight: ' 50vh',
                            // margin: 'auto',
                            height: '86.3vh',
                            direction: 'rtl',
                            backgroundImage: "url('https://www.loginradius.com/blog/wp-content/uploads/2019/01/ask-blackboard-356079-1024x620.jpg')",
                            backgroundSize: "cover"
                        }}>


                            <Grid.Column width={6} style={{
                                margin: 'auto 0',
                                padding: 20,
                                color: '#e2ccba',
                                fontSize: "2em",
                                lineHeight: '1.3em'
                            }}>
                                آیا سوالی دارید که جوابش را نمیدانید؟
                                <br/>
                                <br/>

                                <a href={'questions'} className='myHover'
                                   style={{fontSize: '1.5em',}}>لیست سوالات
                                </a>
                            </Grid.Column>

                        </Grid.Row>


                    </Grid>
                    <Grid style={{width: ' 70%', margin: 'auto', display: this.state.loaded}}>


                        <Grid.Row style={{
                            // minHeight: ' 50vh',
                            // margin: 'auto',
                            height: '86.3vh',
                            direction: 'rtl',
                            backgroundImage: "url('https://d2ijzc5gfl7fbn.cloudfront.net/cache/94/b1/94b1e52655d8c80f803799c7fa974405.jpg')",
                            backgroundSize: "cover"
                        }}>

                            <Grid.Column width={10}>
                                <div/>
                            </Grid.Column>
                            <Grid.Column width={6} style={{
                                margin: 'auto 0',
                                padding: 20,
                                color: '#e2ccba',
                                fontSize: "2em",
                                lineHeight: '1.3em'
                            }}>

                                <a href={'questions/submit'} className='myHover'
                                   style={{fontSize: '1.5em',}}>پرسیدن سوال در سایت
                                </a>
                            </Grid.Column>

                        </Grid.Row>


                    </Grid>
                </Slider>
            </Template>

        )
    }
}

// console.log(document.getElementsByClassName('slick-slider'));

export default Main;
