  import React, { Component } from 'react'

import styles from './styles'

class Zone extends Component {

  render(){
  const zoneStyle = styles.zone
  const zipCode = this.props.currentZone.zipCodes
  const title = (this.props.isSelected) ?  <a style={zoneStyle.title} href="#">{this.props.currentZone.name}</a> :   <a href="#">{this.props.currentZone.name}</a>
    return(

            <div style={zoneStyle.container}>
              <h2 style={zoneStyle.header}>
            { title }
              </h2>
              <span className="detail">{zipCode}</span><br />
              <span className="detail">{this.props.currentZone.numComments} Comments</span>
            </div>

    )
  }
}


export default Zone;
