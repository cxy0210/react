import React from 'react';
import './Input.css';
import propTypes from 'prop-types';


function Input({type, label, value,defaultValue,onChange,name}){
  return(
    <div className="lifirst">
      <input name={name} type={type} value={value} onChange={onChange}/>
      <span>{label}</span>
    </div>
  )
}

// export default class Input extends React.Component{
//   render(){
//     let {type, label, value, defaultValue,onChange,name} = this.props;
//     return(
//       <div className="lifirst">
//         <input name={name} type={type} value={value} onChange={onChange}/>
//         <span>{label}</span>
//       </div>
//     )
//   }
// }

Input.defaultProps={
  type:"text",
  label:'',
  value:'',
  defaultValue:'',
  name:'',
  onChange:()=>{}
};

Input.propTypes={
  type:propTypes.string,
  label:propTypes.string,
  value:propTypes.string,
  name:propTypes.string,
  defaultValue:propTypes.string,
  onChange:propTypes.func
}

export default Input;