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
                    <Grid>
                        <Grid.Row style={{textAlign: 'center'}}>
                            <div style={{margin: 'auto'}}>
                            {this.props.title}<br/>
                            این کتاب قبلا خریداری شده است.
                            </div>


                        </Grid.Row>

                        <Grid.Row   style={{textAlign: 'center'}}>
                            <a href={this.props.link}  style={{ margin: 'auto'}}>
                            <div style={{ fontFamily: "B Yekan"}}
                                 className="ui vertical animated button"
                                 tabIndex="0">
                                <div className="hidden content">
                                    <i className="book icon"></i>
                                </div>
                                <div className="visible content">مشاهده ی کتاب</div>

                            </div>
                            </a>
                        </Grid.Row>
                    </Grid>
                )
            } else {
                return (<Grid>
                        <Grid.Row  style={{paddingLeft: '0px', textAlign: 'center'}}>
                            <div style={{margin: 'auto'}}>
                            {this.props.title}<br/>
                            تعداد فصل های خریده شده:
                            {this.props.chaptersPurchased}
                            </div>


                        </Grid.Row>
                        <Grid.Row  style={{textAlign: 'center'}}>
                            <a href={this.props.link} style={{ margin: 'auto'}}>
                                <div style={{fontFamily: "B Yekan" }}
                                     className="ui animated fade button" tabIndex="0">
                                    <div className="visible content" style={{padding: '0px'}}>مشاهده و خرید کتاب</div>
                                    <div className="hidden content">
                                        {this.props.price} هزار تومان
                                    </div>
                                </div>
                            </a>
                        </Grid.Row>


                    </Grid>

                )
            }
        };

        return (


            <Grid style={{width: '24%' , height: '40vh', margin: '1em 0', fontSize: '1.5em', }} >

                <Grid.Row>
                     <img style={{width: "70%", height: "25vh",margin: 'auto'}}
                         src={this.props.bookCover}/>
                </Grid.Row>



                 <Grid.Row style={{direction:'rtl', fontSize: '0.7em'}}>

                            {this.renderRedirect()}

                            {priceOrPurchased()}
                 </Grid.Row>
            </Grid>

        )
    }


}

export default BookCard;