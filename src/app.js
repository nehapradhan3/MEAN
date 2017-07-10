import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './components/layout/Home'

class App extends Component {
  render(){
    return(
<div>
<img src = "https://www.fusemachines.com/assets/img/fm-icn.png" style={{marginLeft:20, marginTop:20, width:50, height:50}}/>


<Home />



</div>
    )
  }
}


 ReactDOM.render(<App />, document.getElementById('root'))
