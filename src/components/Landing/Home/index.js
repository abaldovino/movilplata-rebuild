import React, { Component, Fragment } from 'react'
import Navbar from './components/Navbar'
import SlideShow from './components/SlideShow'
import Content from './components/Content'

export default class index extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <SlideShow />
        <Content />
      </Fragment>
    )
  }
}
