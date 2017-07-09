import React, { Component } from 'react'
import Zone from '../presentation/Zone'


class Zones extends Component {
  constructor(){
    super()
    this.state = {
      zone: {
        name:'',
        aCode:''
      },
      list: [
        {name: 'Zone 1' , aCode: 'Design' , numComments: 10},
        {name: 'Zone 2' , aCode: 'Javascript' , numComments: 11},
        {name: 'Zone 3' , aCode: 'Network' , numComments: 12},
        {name: 'Zone 4' , aCode: 'Java' , numComments: 13},
        {name: 'Zone 5' , aCode: 'BPO' , numComment: 14}
      ]
    }
  }
  updateZone(event){
    //console.log("updateZone :"+event.target.id+" ==="+event.target.value);
    let updatedZone = Object.assign({},this.state.zone)
    updatedZone[event.target.id] = event.target.value
    this.setState({
      zone: updatedZone
    })
  }
  addZone(){
    console.log('ADD ZONE:'+JSON.stringify(this.state.zone));
  }
  render(){
    const listItems = this.state.list.map((zone, i) => {
      return(
        <li key={i}> <Zone currentZone={zone} /> </li>
      )

    })
    return(
      <div>
      <ol>
      {listItems}
    </ol>
    <input id="name" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Name" /> <br />
    <input id="aCode" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zip Code" /> <br />
    <button onClick={this.addZone.bind(this)} className="btn btn-danger">Add Zone</button>
      </div>
    )
  }
}
export default Zones
