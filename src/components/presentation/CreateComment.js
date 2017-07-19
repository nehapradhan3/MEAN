import React, { Component } from 'react'

class CreateComponent extends Component {

  constructor(){
    super()
    this.state = {
      comment : {

      }
    }
  }

  updateComment(event){
console.log("updated comment: " + event.target.id + "==" + event.target.value);
let updatedComment = Object.assign({}, this.state.comment)
updatedComment[event.target.id] = event.target.value

this.setState({
  comment: updatedComment
})
  }

submitComment(event){
console.log("submitted comment :" +JSON.stringify(this.state.comment));
this.props.onCreate(this.state.comment)
}

  render(){
    return(
      <div>
      <h3>Create Comment </h3>
      <input onChange = {this.updateComment.bind(this)} className="form-control" type="text" placeholder="Username" id="username" /> <br/>
      <input onChange = {this.updateComment.bind(this)}  className="form-control" type="text" placeholder="Comment" id="body" /> <br/>
      <button onClick = {this.submitComment.bind(this)} className="btn btn-info"> Submit Comment </button>
      </div>


    )
  }
}
export default CreateComponent
