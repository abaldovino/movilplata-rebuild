import React, { Component } from 'react'
import bgAuth from './assets/bg-sucursal.png'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
export default class index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      login: true,
      isLoading: false
    }
  }

  modifyState = () => {
    this.setState({ login: !this.state.login })
  }

  setLoading = (status) => {
    this.setState({ isLoading: status })
  }

  render() {
    return (
      <div className="container-fluid p-0 m-0" style={{ backgroundImage: `url(${bgAuth})`,height: '100vh', width:'100%', backgroundSize:'cover' }}>
        <div className="row">
          {this.state.login ?  <LoginForm history={this.props.history} 
                                          location={this.props.location} 
                                          cardState={this.state.login} 
                                          modifyState={this.modifyState} 
                                          isLoading={this.state.isLoading} 
                                          handleLoading={(status) => { this.setLoading(status) }}/> : 
                                          
                                <RegisterForm history={this.props.history} 
                                cardState={this.state.login} 
                                modifyState={this.modifyState}
                                isLoading={this.state.isLoading} 
                                handleLoading={(status) => { this.setLoading(status) }}/> }
        </div>
      </div>
    )
  }
}
