import React, { Component } from 'react'
import Zone from './Zone'


class Zones extends Component {
  constructor(){
    super()
    this.state = {
      list: [
        {name: 'Zone 1' , aCode: 'Design' , numComments: 10},
        {name: 'Zone 2' , aCode: 'Javascript' , numComments: 11},
        {name: 'Zone 3' , aCode: 'Network' , numComments: 12},
        {name: 'Zone 4' , aCode: 'Java' , numComments: 13},
        {name: 'Zone 5' , aCode: 'BPO' , numComment: 14}
      ]
    }
  }
  render(){
    const listItems = this.state.list.map((zone, i) => {
      return(
        <li> <Zone currentZone={zone} /> </li>
      )

    })
    return(
      <div>
      <ol>
      {listItems}
    </ol>
      </div>
    )
  }
}
export default Zones
