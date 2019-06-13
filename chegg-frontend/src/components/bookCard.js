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

                           این کتاب قبلا خریداری شده است.

                        </Grid.Column>

                        <Grid.Column width={7} floated={"left"} style={{textAlign: 'left'}}>
                            <div style={{width: '75%', fontFamily: "B Yekan", backgroundColor: 'rgb(182,227,255)'}} className="ui vertical animated button"
                                 tabIndex="0">
                                <div className="hidden content">
                                    <i className="book icon"></i>
                                </div>
                                <div className="visible content">مشاهده ی کتاب</div>

                            </div>
                        </Grid.Column>
                    </Grid.Row>
                )
            } else {
                return (<Grid.Row>
                        <Grid.Column width={9} floated={"left"} style={{paddingLeft: '0px'}}>
                            تعداد فصل های خریده شده:
                            <strong> {this.props.chaptersPurchased}</strong>


                        </Grid.Column>
                        <Grid.Column width={7} style={{textAlign: 'left'}}>

                            <div style={{ width: '75%', fontFamily: "B Yekan", backgroundColor: '#5a8fff'}} className="ui animated fade button" tabIndex="0">
                                <div className="visible content" style={{padding: '0px'}}>مشاهده و خرید کتاب</div>
                                <div className="hidden content">
                                    {this.props.price} هزار تومان
                                </div>
                            </div>

                        </Grid.Column>


                    </Grid.Row>

                )
            }
        };

        const imgPath = this.props.bookImage;
        return (


            <Card style={{width: '47%', margin: '1em 0', fontSize: '1.5em'}}>
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