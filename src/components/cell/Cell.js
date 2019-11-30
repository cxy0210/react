import React from 'react';
import './Cell.css';
import { withRouter, Link } from 'react-router-dom';



let goDetail = (id,dataName,history) => {
    history.push({pathname:'/detail/'+id,search:'dataName='+dataName})
    
    
  };


export default withRouter(({item,dataName,history})=>{
  
    
    return(
      <ul className={"Cell"} onClick={()=>goDetail(item.id,dataName,history)}>
        <li style={{marginLeft:20}}>
        <img src={item.banner}/>
        <h2 style={{marginLeft:50}}>{item.title}</h2>
        <p style={{marginLeft:50,fontSize:16,}}>￥{item.price}</p>
        {/* <h2>{item.id}.{item.title}</h2>
        <p>{item.des}</p> */}
        </li>
      </ul>
    )
  }
)