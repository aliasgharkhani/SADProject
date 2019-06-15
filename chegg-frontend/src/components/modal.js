import React, {Component} from 'react'
import {Button, Header, Image, Modal} from 'semantic-ui-react'

class ModalExampleTopAligned extends Component {
    render() {
        return (

            <Modal size={"small"} open={open} onClose={this.close} centered={false}>
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>No</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' />
          </Modal.Actions>
        </Modal>

        )
    };


}

export default ModalExampleTopAligned