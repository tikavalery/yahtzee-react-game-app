import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  static defaultProps = {
    numberWords: ["one", "two", "three", "four", "five", "six"],
    val:5
  }
  constructor(props) {
    super(props)
    this.handleClick=this.handleClick.bind(this)
  }
  handleClick() {
    this.props.handleClick(this.props.idx)
  }
  render() {
    const {numberWords,locked,val,disabled,dieRolling} = this.props
    let classes = `Die fas fa-dice-${numberWords[val - 1]} fa-3x `;
    
    if (locked) classes += "Die-locked";
    if (dieRolling) classes += "Die-rolling"
    return (
      <i
        className={classes}
       disabled={disabled}
        onClick={this.handleClick}
      />
      
    );
  }
}

export default Die;
