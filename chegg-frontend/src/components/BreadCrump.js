import React, {Component} from 'react'
import {Menu, Icon, Button, Breadcrumb} from 'semantic-ui-react'
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";


export default class BreadCrump extends Component {


    render() {

        return (

            <Breadcrumb>




                <Breadcrumb.Section active>
                    <a href={this.props.book.url}>{this.props.book.name}</a>
                </Breadcrumb.Section>
                 <Breadcrumb.Divider icon='left angle'/>
                 <Breadcrumb.Section active>
                    {this.props.chapter}
                </Breadcrumb.Section>
                 <Breadcrumb.Divider icon='left angle'/>
                 <Breadcrumb.Section active>
                    سوال {this.props.problemId}
                </Breadcrumb.Section>

            </Breadcrumb>
        )
    }
}
