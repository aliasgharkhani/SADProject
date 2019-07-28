import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }

const source = [
  {
    "title": "لینوکس خوبه",
    "description": "خیلی خیلی خوبه",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
    "price": "$58.98"
  },
  {
    "title": "Terry - Bernier",
    "description": "Multi-layered full-range customer loyalty",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/robergd/128.jpg",
    "price": "$98.43"
  },
  {
    "title": "Kris, Stokes and Runolfsdottir",
    "description": "Optimized explicit workforce",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/curiousoffice/128.jpg",
    "price": "$0.57"
  },
  {
    "title": "Olson LLC",
    "description": "Mandatory 5th generation interface",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/operatino/128.jpg",
    "price": "$19.91"
  },
  {
    "title": "Kuhic, Hoppe and Prohaska",
    "description": "Up-sized value-added customer loyalty",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/samscouto/128.jpg",
    "price": "$73.30"
  }
]

export default class SearchExampleStandard extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  };

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={6} style={{fontFamily:'B Yekan'}}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(source, null, 2)}
            </pre>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}