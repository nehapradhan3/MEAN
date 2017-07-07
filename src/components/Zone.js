import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Zone extends Component {

  render(){
    return(


            <div>
              <h2><a href="#">{this.props.currentZone.name}</a></h2>
              <span>{this.props.currentZone.aCode}</span><br />
              <span>{this.props.currentZone.numComments} Comments</span>
            </div>

    )
  }
}
export default Zone;
