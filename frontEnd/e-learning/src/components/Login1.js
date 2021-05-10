import React,{Component} from 'react';
import FlexView from "react-flexview";
// import {  TextField, Button } from '@material-ui/core';
// import axios from 'axios';
import './Login1.css'; 

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email : '',
            password: ''
        }

    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
        console.log(this.state);
       
    }

    submitHandler = (event) => {
        console.log("submitted");
        if( this.state.email===''||this.state.email===undefined){
            document.getElementById("E1").style.display = 'block';

        }
        else {
            const {email, password} = this.state;
            // axios.post("", {userInfo : { email: email, password: password}});
            console.log(email,password);
            if(email!==password){
                document.getElementById("E3").style.display = 'block';
            }
            else{
                alert("Successfully logged in !!");
            }
        }
        
        
    }

    render(){
        return(
            <FlexView id="E" column >
                <form onSubmit={this.submitHandler}>
                        {/* <label style={{color:'black'}}>Username</label> */}
                    <input 
                        className="InputBlock"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="E1">This is a required field</span>
                    <span className="Error" id="E2">Please enter a valid email id</span>
                   
                    
                    {/* <label style={{color:'black'}}>Password</label> */}
                    <input 
                        className="InputBlock"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.changeHandler}
                        required/>
                    
                   
                    <span className="Error" id="E3">** Password incorrect</span>
                  
                    <button  type="submit" onClick={this.submitHandler}>
                        LOGIN
                    </button>
                </form>
                
            </FlexView>
        );
    }


}