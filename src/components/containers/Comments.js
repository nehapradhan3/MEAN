import React, { Component } from  'react'
import { CreateComment, Comment } from '../presentation'
import styles from './styles'
import { APIManager } from '../../utils'

class Comments extends Component {
  constructor(){
    super();
    this.state = {
      // comment:{
      //   username:'',
      //   body:''
      //
      // },
      list: []
    }
  }
  componentDidMount(){
    console.log("componentDidMount: ")
    APIManager.get('/api/comment',null, (err, response) =>{
      if (err){
        alert('ERROR:'+err.message)
        return
      }

      this.setState({
        list: response.results
      })
    })

  }
  submitComment(comment){

    console.log('submitComment: '+JSON.stringify(comment));
  //  console.log("submit comment:"+JSON.stringify(this.state.comment));
//let updatedComment = Object.assign({}, this.state.comment)
let updatedComment = Object.assign({}, comment)
APIManager.post('/api/comment', updatedComment, (err, response) => {
if (err){
  alert(err)
  return
}
console.log(JSON.stringify(response));
let updatedList = Object.assign([], this.state.list)
updatedList.push(response.result)
this.setState({
  list: updatedList
})
})
  }

  addZone(){
    console.log('ADD COMMENT:'+JSON.stringify(this.state.comment));
    let updatedList = Object.assign([],this.state.list)
    updatedList.push(this.state.comment)
    this.setState({
      list: updatedList
    })
  }
  render(){
    const commentList = this.state.list.map((comment, i) => {
      return (
        <li key={i}> <Comment currentComment={comment} /></li>
      )
    })
    return(
      <div>

      <h2>Comments: Zone 1</h2>
<div style={styles.comment.commentsBox}>
    <ul style={styles.comment.commentsList}>
    { commentList }

      </ul>
      <CreateComment onCreate={this.submitComment.bind(this)}/>
      </div>
      </div>
    )
  }
}
export default Comments
