import React, { Component } from 'react'
import Zone from './Zone'


class Zones extends Component {
  render(){
    return(
      <div>
      <ol>
  <li>  <Zone name="Zone 1"/> </li>
  <li>  <Zone name="Zone 2"/> </li>
  <li>  <Zone name="Zone 3"/> </li>
  <li>  <Zone name="Zone 4"/> </li>
    </ol>
      </div>
    )
  }
}
export default Zones
