import React,{Component} from 'react';
import './Element.css';
export default class Element extends Component{
    
    render(){
        return  <div style= {{backgroundColor: this.props.color}} onClick={this.props.click} className="ElementClass"><p>{this.props.number}</p></div>;
    }
}