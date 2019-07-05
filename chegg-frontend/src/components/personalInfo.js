import React, {Component} from 'react'
import {Form, Image, Divider, Grid, Button} from 'semantic-ui-react'
import axios, { put } from "axios";

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
    }

    fileInputRef = React.createRef();

    onFormSubmit = e => {
        e.preventDefault(); // Stop form submit
        this.fileUpload(this.state.file).then(response => {
            console.log(response.data);
        });
    };

    fileChange = e => {
        this.setState({file: e.target.files[0]}, () => {
            console.log("File chosen --->", this.state.file);
        });
    };

    // Import datasources/schemas Tab 1
    fileUpload = file => {
        const url = "/some/path/to/post";
        const formData = new FormData();
        formData.append("file", file);
        const config = {
            headers: {
                "Content-type": "multipart/form-data"
            }
        };
        return put(url, formData, config);
    };

    // Export Schedules Tab 2
    fileExport = file => {
        // handle save for export button function
    };

    render() {
        return (
            <div>
                <div style={{fontWeight: 'bold', fontSize: '1.5em'}}>
                    تصویر کاربر
                </div>
                <Divider section/>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column width={3}>
                            <Image src={this.props.info.avatar} size='small'/>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Form onSubmit={this.onFormSubmit}>
                                <Form.Field>
                                    <Button
                                        content="انتخاب عکس"
                                        labelPosition="left"
                                        icon="file"
                                        onClick={() => this.fileInputRef.current.click()}
                                    />
                                    <input
                                        ref={this.fileInputRef}
                                        type="file"
                                        hidden
                                        onChange={this.fileChange}
                                    />
                                </Form.Field>
                                <Button type="submit">آپلود</Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div style={{fontWeight: 'bold', fontSize: '1.5em'}}>
                    <br/>
                    اطلاعات فردی
                </div>
                <Divider section/>
                <Form>
                    <Form.Group>
                        <Form.Input label='نام' placeholder={this.props.info.firstName} width={8}/>
                        <Form.Input label='نام خانوادگی' placeholder={this.props.info.lastName} width={8}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label='نام کاربری' defaultValue={this.props.info.username} width={8} readOnly/>
                        <Form.Input label='رایانامه' defaultValue={this.props.info.email} width={8} readOnly/>
                    </Form.Group>
                    <Button type='submit'>ذخیره</Button>
                </Form>
            </div>
        )
    }
}

export default PersonalInfo
