import React, {Component} from 'react'
import {Menu, Icon} from 'semantic-ui-react'


export default class SidebarMenu extends Component {
    render() {

        return (
            <Menu fluid={true} vertical style={{direction: 'rtl'}}>
                {this.props.menuItems.map(menuItem =>

                    <Menu.Item name={menuItem.name} active={this.props.activeItem === menuItem.name}
                               onClick={this.props.handleItemClick}>
                        {menuItem.name}
                        <Icon name={menuItem.iconName}/>

                    </Menu.Item>

                )}
            </Menu>
        )
    }
}
