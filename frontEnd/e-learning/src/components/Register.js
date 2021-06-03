import React,{Component} from 'react';
import FlexView from "react-flexview";
// import {  TextField, Button } from '@material-ui/core';
import { router } from "../services/router";
import axios from 'axios';
import './Register.css'; 

export default class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email : '',
            password: '',
            confirmPassword: '',
            age: ''
        }

    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
        console.log(this.state);
       
    }

    submitHandler = (event) => {
        console.log("submitted");
        var flag=false;
        if( this.state.name===''||this.state.name===undefined){
            document.getElementById("R1").style.display = 'block';
            flag=true;
        }
        if( this.state.email===''||this.state.email===undefined){
            document.getElementById("R2").style.display = 'block';
            flag=true;
        }
        if( this.state.password===''||this.state.password===undefined){
            document.getElementById("R3").style.display = 'block';
            flag=true;
        }
        else if(this.state.password!==this.state.confirmPassword){
            document.getElementById("R4").style.display = 'block';
            flag=true;
        }
        if( this.state.age===''||this.state.age===undefined){
            document.getElementById("R5").style.display = 'block';
            flag=true;
        }
        if(!flag){
            const {name, email, password, confirmPassword,age} = this.state;
            // axios.post("", {userInfo : { email: email, password: password}});
            console.log(name,email,password,confirmPassword,age);
            alert("Successfully registered");
            router.stateService.go('login');
            
        }
        
        
    }

    render(){
        return(
            <div id="registerDiv">
            <FlexView id="R" column >
                <h2><span id="register">Sign Up!!</span></h2>
                <form onSubmit={this.submitHandler}>
                        {/* <label style={{color:'black'}}>Username</label> */}
                        <input 
                        className="InputBlock"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={this.state.name}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="R1">This is a required field</span>
                    <input 
                        className="InputBlock"
                        type="email"
                        name="email"
                        placeholder="Enter Email id"
                        value={this.state.email}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="R2">This is a required field</span>
                    
                    {/* <label style={{color:'black'}}>Password</label> */}
                    <input 
                        className="InputBlock"
                        type="password"
                        name="password"
                        placeholder="Enter New Password"
                        value={this.state.password}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="R3">This is a required field</span>
                      <input 
                        className="InputBlock"
                        type="password"
                        name="confirmPassword"
                        placeholder="Re-enter Password"
                        value={this.state.confirmPassword}
                        onChange={this.changeHandler}
                        required/>
                   
                    <span className="Error" id="R4">** Password Mismatch</span>

                    <input 
                        className="InputBlock"
                        type="text"
                        name="age"
                        placeholder="Enter your age"
                        value={this.state.age}
                        onChange={this.changeHandler}
                        required/>  
                    <span className="Error" id="R5">This is a required field</span>
                    <button  type="submit" onClick={this.submitHandler}>
                        REGISTER
                    </button>
                </form>
                
            </FlexView>
            </div>
        );
    }


}