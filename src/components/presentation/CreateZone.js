import React, { Component } from 'react'

class CreateZone extends Component {
  constructor(){
    super()
    this.state={
      zone: {

      }
    }
  }
  updateZone(event){
let updated = Object.assign({}, this.state.zone)
updated[event.target.id] = event.target.value
this.setState({
  zone: updated
})
  }
  submitZone(event){
console.log("submit zone"+JSON.stringify(this.state.zone));
let updated = Object.assign({}, this.state.zone)
updated['zipCodes'] = updated.zipCode.split(',')
this.props.onCreate(updated)
  }

  render(){
    return(
      <div>
      <input id="name"   onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Name" /> <br />
      <input id="zipCodes"    onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Add a topic for discussion" /> <br />
      <button onClick={this.submitZone.bind(this)} className="btn btn-danger">Add a Topic</button>
      </div>
    )
  }
}
export default CreateZone
