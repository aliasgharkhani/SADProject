import React, {Component} from 'react'
import {Icon, Label, Menu} from 'semantic-ui-react'


export default class SidebarMenu extends Component {
    render() {

        return (
            <Menu fluid={true} vertical style={{direction: 'rtl'}}>
                {this.props.menuItems.map(menuItem => {
                        if (menuItem.label !== undefined) {
                            return (
                                <Menu.Item name={menuItem.name} active={this.props.activeItem === menuItem.name}
                                           onClick={this.props.handleItemClick}>
                                    {menuItem.name}
                                    <Icon name={menuItem.iconName}/>
                                    <Label color='teal' style={{'float': 'left'}}>{this.props.messagesLen}</Label>
                                </Menu.Item>
                            )
                        }
                        else {
                            return (
                                <Menu.Item name={menuItem.name} active={this.props.activeItem === menuItem.name}
                                           onClick={this.props.handleItemClick}>
                                    {menuItem.name}

                                    <Icon name={menuItem.iconName}/>

                                </Menu.Item>
                            )
                        }
                    }
                )}
            </Menu>
        )
    }
}
