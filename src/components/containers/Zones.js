import React, { Component } from 'react'
import Zone from '../presentation/Zone'

import { APIManager } from '../../utils'

class Zones extends Component {
  constructor(){
    super()
    this.state = {
      zone: {
        name: '',
        zipCodes: ''
      },
      list: []
    }
  }
  componentDidMount(){
    console.log("componentDidMount: ")
    APIManager.get('/api/zone', null, (err, response) =>{
      if (err){
        alert('ERROR:'+err.message)
        return
      }

      this.setState({
        list: response.results
      })
    })

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

let updatedZone = Object.assign({},this.state.zone)
updatedZone['zipCodes'] = updatedZone.zipCodes.split(',')
console.log('ADD ZONE:'+JSON.stringify(updatedZone));
  APIManager.post('/api/zone', updatedZone,(err, response) =>{
    if(err){
      alert('ERROR '+err.message)
      return
    }
    console.log('ZONE CREATED: '+JSON.stringify(response));
 let updatedList = Object.assign([],this.state.list)
updatedList.push(response.result)
this.setState({
  list: updatedList
})
  })

    // let updatedList = Object.assign([],this.state.list)
    // updatedList.push(this.state.zone)
    // this.setState({
    //   list: updatedList
    // })
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
    <input id="zipCodes" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Add a topic for discussion" /> <br />
    <button onClick={this.addZone.bind(this)} className="btn btn-danger">Add Zone</button>
      </div>
    )
  }
}
export default Zones
