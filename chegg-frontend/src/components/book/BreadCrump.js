import React, {Component} from 'react'
import {Menu, Icon, Button, Breadcrumb} from 'semantic-ui-react'



export default class BreadCrump extends Component {


    render() {
        return (

            <Breadcrumb style={{fontSize:'1.2em'}}>


                <Breadcrumb.Section active  >
                    سوال{this.props.problemId}
                </Breadcrumb.Section>

                <Breadcrumb.Divider icon='left angle'/>


                <Breadcrumb.Section active>
                    فصل{this.props.chapter}
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon='left angle'/>

                <Breadcrumb.Section active>
                    <a href={this.props.book.url}>{this.props.book.name}</a>
                </Breadcrumb.Section>
            </Breadcrumb>
        )
    }
}
