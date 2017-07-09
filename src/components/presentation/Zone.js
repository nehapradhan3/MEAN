import React, { Component } from 'react'

import styles from './styles'

class Zone extends Component {

  render(){
  const zoneStyle = styles.zone
  const aCode = this.props.currentZone.aCodes[0]
    return(

            <div style={zoneStyle.container}>
              <h2 style={zoneStyle.header}>
              <a style={zoneStyle.title} href="#">{this.props.currentZone.name}</a>
              </h2>
              <span className="detail">{aCode}</span><br />
              <span className="detail">{this.props.currentZone.numComments} Comments</span>
            </div>

    )
  }
}


export default Zone;
