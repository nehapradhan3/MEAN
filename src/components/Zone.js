import React, { Component } from 'react'

import styles from './styles'

class Zone extends Component {

  render(){
  const zoneStyle = styles.zone
    return(

            <div style={zoneStyle.container}>
              <h2 style={zoneStyle.header}>
              <a style={zoneStyle.title} href="#">{this.props.currentZone.name}</a>
              </h2>
              <span className="detail">{this.props.currentZone.aCode}</span><br />
              <span>{this.props.currentZone.numComments} Comments</span>
            </div>

    )
  }
}


export default Zone;
