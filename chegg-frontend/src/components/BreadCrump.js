import React, {Component} from 'react'
import {Menu, Icon, Button} from 'semantic-ui-react'
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";


export default class BreadCrump extends Component {


    render() {

        return (

            <Breadcrumb>




                <Breadcrumb.Section active>
                    <a href='#'>{this.props.book}</a>
                </Breadcrumb.Section>
                 <Breadcrumb.Divider icon='left angle'/>
                 <Breadcrumb.Section active>
                    {this.props.chapter_id}
                </Breadcrumb.Section>
                 <Breadcrumb.Divider icon='left angle'/>
                 <Breadcrumb.Section active>
                    سوال {this.props.problem_id}
                </Breadcrumb.Section>

            </Breadcrumb>
        )
    }
}
