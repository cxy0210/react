import React from 'react';
import './Button.css';
import propTypes from 'prop-types';

export default class Button extends React.Component{
  
  static defaultProps = {
    value:'按钮',
    clickHanlder:()=>{}
  };
  static propTypes = {
    value:propTypes.string,
    clickHanlder:propTypes.func
  };
  
  render(){
    return(
      <input 
      type="button" 
      value={this.props.value} 
      className="login-btn"
      onClick = {this.props.clickHanlder}
      />
    )
  }
}