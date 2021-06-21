import React,{Component} from 'react';
import FlexView from "react-flexview";
import { router } from "../services/router";
import './Login1.css'; 
import {getRequest, postRequest} from "../services/httpService";
import axios from "axios";
import { tempstorage } from '../services/TempStorage';
const apiURL = "http://localhost:5000";
const baseURL = "https://6e35ab3acc48.ngrok.io";

const headers = { "content-type": "application/json" };


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
        event.preventDefault();
        console.log("submitted");
        if( this.state.email===''||this.state.email===undefined){
            document.getElementById("E1").style.display = 'block';

        }
        else {
            const userinfo = this.state;
            let promise = postRequest('/login',  userinfo);
                promise.then(response => {
                    console.log(response.data)
                    if(response.status >= 200 && response.status < 300) {
                        console.log(response.status)
                        alert("Successfully logged in.");
                        tempstorage.setProfile({email: userinfo.email});
                        router.stateService.go('home');
                    }
                    else {
                        document.getElementById("E3").style.display = 'block';
                        router.stateService.reload();
                    }
                })
            .catch((error) => {
                console.log(error);
            });
        }
        
        
    }

    registerHandler = () => {
        router.stateService.go('register');
    }
    render(){
        return(
            <div id="loginDiv">
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
                <p onClick={this.registerHandler}>Register here</p>
            </FlexView>
            </div>
        );
    }


}