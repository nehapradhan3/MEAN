import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Zone extends Component {
  render(){
    return(


            <div>
              <h2><a href="#">{this.props.name}</a></h2>
              <span>10012</span><br />
              <span>10 comments</span>
            </div>

    )
  }
}
export default Zone;
