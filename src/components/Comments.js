import React, { Component } from  'react'
import Comment from './Comment'
import styles from './styles'

class Comments extends Component {
  constructor(){
    super();
    this.state = {
      list: [
        {body: 'comment 1', username: 'nehapradhan', timestamp: '11:30'},
        {body: 'comment 2', username: 'nitapradhan', timestamp: '12:30'},
        {body: 'comment 3', username: 'prajolpradhan', timestamp: '1:30'},
        {body: 'comment 4', username: 'prabinpradhan', timestamp: '10:30'},
        {body: 'comment 5', username: 'kebin', timestamp: '6:30'},
        {body: 'comment 6', username: 'neelam',timestamp: '9:30'},
      ]
    }
  }
  render(){
    const commentList = this.state.list.map((comment, i) => {
      return (
        <li> <Comment currentComment={comment} /></li>
      )
    })
    return(
      <div>

      <h2>Comments: Zone 1</h2>
<div style={styles.comment.commentsBox}>
    <ul style={styles.comment.commentsList}>
    { commentList }

      </ul>
      </div>
      </div>
    )
  }
}
export default Comments
