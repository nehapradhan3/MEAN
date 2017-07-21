import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './components/layout/Home'

class App extends Component {
  render(){
    return(
<div>
<img src = "https://www.fusemachines.com/assets/img/fm-icn.png" style={{marginLeft:300, marginTop:2, marginBottom:40, width:50, height:50}}/>
<span style={{marginLeft:10, marginTop:20, width:50, height:50 ,  fontSize: 50,  fontStyle:"italic"}}>Fusemachines Discussion Board </span>
<Home />



</div>
    )
  }
}


 ReactDOM.render(<App />, document.getElementById('root'))
