import React, {Component} from "react";
import Template from '../components/template';
import {Grid, Segment} from "semantic-ui-react";
import BookCard from "../components/bookCard";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";

class Main extends Component {

    handleItemClick = (e, {name, path}) => {

        console.log(path);

        window.location.replace(path);
    };
    render() {
        return (
            <Template >
                <Segment style={{width:' 70%', margin: 'auto'}}>

                    <Grid>
                        <Grid.Row  style={{height:' 50vh', margin: 'auto', direction: 'rtl', backgroundImage: "url('https://wallimpex.com/data/out/774/old-book-wallpaper-11223624.jpg')" ,backgroundSize: "cover"}}>
                            <Grid.Column width={6} style={{margin: 'auto 0', padding: 20, color: 'white', fontSize: "2em", lineHeight:'1.3em'}}>
                                دیگر نگران تمرین های سختتان نباشید!! راه حل سوالات و پاسخ نامه ی کتاب ها در در چگ پیدا کنید.
                                <br/>
                                <br/>
                                <a href={'booklist'}  style={{color: '#eb7101'}}> پاسخ نامه ی کتاب ها</a>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Segment>

            </Template>
        )
    }
}

export default Main;