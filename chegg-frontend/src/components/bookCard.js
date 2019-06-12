import React, {Component} from "react";
import {Button, Card, Image, Menu} from 'semantic-ui-react'
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import {Redirect} from "react-router-dom";


class BookCard extends Component {


    constructor(props) {

        super(props);
        this.routeChange = this.routeChange.bind(this);
    }

    state = {
        redirect: false,
        path: '',
    }


    routeChange = (e) => {
        this.setState({
            redirect: true,
            path: e,

        })
    };

    renderRedirect = () => {

        if (this.state.redirect) {

            return <Redirect to={this.state.path}/>
        }
    }

    render() {
        const priceOrPurchased = () => {
            if (this.props.purchased === 1) {

                return (
                    <Grid.Row>
                        <Grid.Column width={9}>

                            <strong>این کتاب قبلا خریداری شده است.</strong>

                        </Grid.Column>

                        <Grid.Column width={7} floated={"left"}>
                            <Button onClick={() => this.routeChange('' + this.props.link)} floated={"left"}
                                    style={{fontFamily: "B Yekan"}}> مشاهده ی کتاب</Button>
                        </Grid.Column>
                    </Grid.Row>
                )
            } else {
                return (<Grid.Row>
                        <Grid.Column width={9}>

                            <strong>قیمت خرید: {this.props.price}</strong>

                        </Grid.Column>

                        <Grid.Column width={7} floated={"left"}>
                            <Button onClick={() => this.routeChange('' + this.props.link)} floated={"left"}
                                    style={{fontFamily: "B Yekan"}}> خرید</Button>
                        </Grid.Column>
                    </Grid.Row>

                )
            }
        };

        const imgPath = this.props.bookImage;
        return (


            <Card style={{width: '47%', margin: '1em 0'}}>
                <Card.Content style={{direction: "rtl"}}>

                    <img style={{width: "65px", height: "88px", float: "right", marginLeft: "1em"}}
                         src={require('' + imgPath)}/>

                    <Card.Header style={{fontFamily: "B Yekan", marginTop: '0.5em'}}>{this.props.title}</Card.Header>
                    <Card.Meta>{this.props.author}</Card.Meta>
                    <Card.Description>
                        <Grid>
                            <Grid.Row style={{padding: "1rem", height: '10vh'}}>
                                {this.props.description}
                            </Grid.Row>
                            {this.renderRedirect()}
                            {priceOrPurchased()}
                        </Grid>
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }


}

export default BookCard;