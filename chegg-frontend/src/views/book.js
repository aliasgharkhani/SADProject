import React, {Component} from "react";
import Template from '../components/template';
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Image,
    Label,
    List,
    Menu,
    Modal,
    Segment
} from 'semantic-ui-react';
import axios from 'axios';


class ProblemList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props !== undefined && this.props.chapter !== undefined) {
            return (
                <List style={{'direction': 'rtl'}}>
                    {this.props.chapter.problems.map((problem) => {
                        return <List.Item as='a'
                                          key={problem.problem_id}>{problem.problem_id + '. ' + problem.body}</List.Item>
                    })}
                </List>

            )
        }
        return (<div></div>)

    }

}

class MenuExampleInvertedSegment extends Component {
    constructor(props) {
        super(props);
        this.bookCover = this.props.bookCover;
        this.memberInfo = this.props.memberInfo;
        this.buyChapterLabel = this.buyChapterLabel.bind(this)
        this.hasBoughtChapter = this.hasBoughtChapter.bind(this);
        this.getChapterId = this.getChapterId.bind(this)
        this.state = {
            activeItem: 1,
            modalActive: false
        };
    }


    handleItemClick = (e, {id}) => {
        console.log(id, 'key')
        this.setState({
            activeItem: id,
        })
        this.forceUpdate()
    };

    onCloseModal() {
        this.setState({
            modalActive: false
        });
    }

    getChapterId() {
        let chapter = this.props.chapters.filter((chapter) => {
            return chapter.chapter_id === this.state.activeItem
        });
        return chapter[0].id;

    }

    buyChapter() {
        const token = localStorage.getItem('chegg-token');
        if (token === undefined || token === null) {
            alert('برای خرید باید وارد سایت شوید.')
            return
        }


        axios.post(`http://127.0.0.1:8000/store/chapters/${this.getChapterId()}/buy/`, null,
            {
                headers: {Authorization: 'TOKEN ' + token}
            }
        ).then(response => {
            let done = response.data.done;
            let message = response.data.message;
            if (done === true) {
                alert('خرید با موفقیت انجام شد.')
                window.location.reload()
            } else {
                alert(`
                خطا: 
                ${message}`)
            }
        })
    }

    hasBoughtChapter() {
        if (this.props.memberInfo !== null && this.props.memberInfo !== undefined && this.props.memberInfo.bought_books !== undefined) {
            for (let i = 0; i < this.props.memberInfo.bought_chapters.length; i++) {
                if (this.props.memberInfo.bought_chapters[i].id == this.getChapterId()) {
                    return true
                }
            }
        }
        return false
    }

    buyChapterLabel() {
        if (!this.hasBoughtChapter()) {
            return (
                <Label as='a' color='red' ribbon
                       onClick={() => this.setState({modalActive: true})}>
                    {this.props.chapters[this.state.activeItem - 1] ? 'خرید این فصل با ' + this.props.chapters[this.state.activeItem - 1].price + ' تومان' : null}

                </Label>
            )
        }
        return (
            <Label as='a' color='blue' ribbon>
                شما این فصل را قبلا خریده اید.
            </Label>
        )
    }

    render() {
        if (this.props.chapters === undefined || this.props.chapters[this.state.activeItem - 1] === undefined) {
            return (<div></div>)
        }
        return (
            <div>
                <Modal onRequestClose={this.onCloseModal.bind(this)} open={this.state.modalActive}>
                    <Icon name="close" onClick={this.onCloseModal.bind(this)}/>
                    <Header>Select a photo</Header>
                    <Modal.Content image>
                        <Modal.Description
                            style={{'flexGrow': '1', 'direction': 'rtl', 'textAlign': 'right'}}>
                            {/*<Header>{this.state.title}</Header>*/}
                            <p>
                                شما در حال خرید فصل
                                {this.state.activeItem}
                                به قیمت
                                {this.props.chapters[this.state.activeItem - 1].price}
                                هستید.
                            </p>
                            <p>
                                آیا فصل مورد نظر همین فصل است؟
                            </p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button emphasis="positive"
                                color='red'
                                onClick={this.onCloseModal.bind(this)}>انصراف</Button>
                        <Button emphasis="negative"
                                color='green'
                                onClick={this.buyChapter.bind(this)}>خرید</Button>


                    </Modal.Actions>
                </Modal>
                <Menu attached='top' tabular style={{'direction': 'rtl'}}>
                    {this.props.chapters.map((chapter) => {
                        return <Menu.Item
                            name={'فصل' + chapter.chapter_id}
                            active={this.state.activeItem === chapter.chapter_id}
                            onClick={this.handleItemClick}
                            id={chapter.chapter_id}
                            key={chapter.chapter_id}
                        />
                    })}

                </Menu>

                <Segment attached='bottom'>
                    {this.buyChapterLabel()}
                    <ProblemList chapter={this.props.chapters[this.state.activeItem - 1]}/>
                </Segment>
            </div>
        )
    }
}

class Book extends Component {

    constructor(props) {
        super(props);
        this.bookId = this.props.match.params.id;
        this.hasBoughtBook = this.hasBoughtBook.bind(this);
        this.buyBookSection = this.buyBookSection.bind(this);
    }

    onCloseModal() {
        this.setState({
            modalActive: false,
            memberInfo: null
        });
    }

    buyBook() {
        const token = localStorage.getItem('chegg-token');
        if (token === undefined || token === null) {
            alert('برای خرید باید وارد سایت شوید.')
            return
        }


        axios.post(`http://127.0.0.1:8000/store/books/${this.bookId}/buy/`, null,
            {
                headers: {Authorization: 'TOKEN ' + token}
            }
        ).then(response => {
            let done = response.data.done;
            let message = response.data.message;
            if (done === true) {
                alert('خرید با موفقیت انجام شد.')
                window.location.reload()
            } else {
                alert(`
                خطا: 
                ${message}`)
            }
        })
    }

    state = {
        ISBN: '',
        score: '',
        publication_date: '',
        edition: '',
        title: '',
        author: '',
        price: '',
        cover: '',
        description: '',
        chapters: [],
        modalActive: false,
        book: '',
        memberInfo: ''
    };

    componentDidMount() {
        axios.get(`http://localhost:8000/store/books/${this.bookId}/`)
            .then(res => {
                const chapters = res.data.chapters;
                this.setState({
                    ISBN: res.data.ISBN,
                    score: res.data.score,
                    publication_date: res.data.publication_date,
                    edition: res.data.edition,
                    title: res.data.title,
                    author: res.data.author,
                    price: res.data.price,
                    cover: res.data.cover,
                    description: res.data.description,
                    chapters: chapters,
                    book: res.data
                })
            })
        let token = localStorage.getItem('chegg-token');
        if (token !== undefined) {
            axios.get('http://localhost:8000/auth/self/', {
                headers: {Authorization: 'TOKEN ' + token}
            }).then(response => {
                if (response.status === 200) {
                    this.setState({
                        memberInfo: response.data
                    })
                }
            })
        }


    }

    hasBoughtBook() {
        if (this.state.memberInfo !== null && this.state.memberInfo !== undefined && this.state.memberInfo.bought_books !== undefined) {
            for (let i = 0; i < this.state.memberInfo.bought_books.length; i++) {
                if (this.state.memberInfo.bought_books[i].id == this.bookId) {
                    return true
                }
            }
        }
        return false;
    }

    buyBookSection() {
        if (this.hasBoughtBook()) {
            return (<Button primary fluid> شما این کتاب را خریده اید.</Button>)
        }
        return (
            <Button
                onClick={() => this.setState({modalActive: true})}
                content={'خرید کل کتاب به قیمت ' + `${this.state.price}` + ' تومان'}
                primary fluid/>
        )
    }

    render() {
        return (
            <Template>
                <Modal onRequestClose={this.onCloseModal.bind(this)} open={this.state.modalActive}>
                    <Icon name="close" onClick={this.onCloseModal.bind(this)}/>
                    <Header>Select a photo</Header>
                    <Modal.Content image>
                        <Image size="medium" wrapComponent
                               src={this.state.cover}/>
                        <Modal.Description
                            style={{'flexGrow': '1', 'direction': 'rtl', 'textAlign': 'right'}}>
                            <Header>{this.state.title}</Header>
                            <p>
                                شما در حال خرید این کتاب به قیمت
                                {this.state.price}
                                هستید.
                            </p>
                            <p>
                                آیا کتاب مورد نظر همین کتاب است؟
                            </p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button emphasis="positive"
                                color='red'
                                onClick={this.onCloseModal.bind(this)}>انصراف</Button>
                        <Button emphasis="negative"
                                color='green'
                                onClick={this.buyBook.bind(this)}>خرید</Button>


                    </Modal.Actions>
                </Modal>
                <Container>
                    <Segment>
                        <Grid columns={2} relaxed={"very"}>
                            <Grid.Row style={{'direction': 'rtl', fontFamily: 'B Yekan'}}>
                                <Grid.Column width={10}>
                                    <h3>{this.state.title}</h3>
                                    {this.state.description}
                                </Grid.Column>
                                <Grid.Column width={6}>

                                    <Grid>
                                        <Grid.Row>
                                            <img className="ui small image"
                                                 src={this.state.cover}/><br/>
                                        </Grid.Row>

                                        {/*<Grid.Row>*/}
                                        {/*    <Grid.Column width={8}>*/}
                                        {/*        امتیاز*/}
                                        {/*    </Grid.Column>*/}
                                        {/*    <Grid.Column width={8}>*/}
                                        {/*        {this.state.score}*/}
                                        {/*    </Grid.Column>*/}
                                        {/*</Grid.Row>*/}
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                نویسنده
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                {this.state.author}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                تاریخ انتشار
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                {this.state.publication_date}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                ویرایش
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                {this.state.edition}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={16}>
                                                {this.buyBookSection()}
                                            </Grid.Column>
                                        </Grid.Row>

                                    </Grid>


                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    {console.log(this.state.memberInfo)}
                                    <MenuExampleInvertedSegment bookCover={this.state.cover}
                                                                chapters={this.state.chapters}
                                                                memberInfo={this.state.memberInfo}/>
                                </Grid.Column>
                            </Grid.Row>


                        </Grid>
                    </Segment>
                </Container>
            </Template>
        )
    }
}

export default Book;