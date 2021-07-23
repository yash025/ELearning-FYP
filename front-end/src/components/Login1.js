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
                
                <div style={{minHeight:'100%',position:'absolute',width:'100%', bottom:'0', backgroundColor: 'rgb(103 121 150 / 28%)'}}></div>
            <h1 style={{fontFamily:'Times New Roman', marginLeft:'auto',marginRight:'auto',width:'fit-content',color:'#3c97a7'}}>Learning can be fun!!</h1>
            <FlexView style={{height: '80%', width: '60%',margin: '2% auto auto auto',boxShadow:'-7px 12px 15px rgba(0,0,0,0.5)', borderRadius: '20px'}}>
            <div class="image" style={{height:'100%',borderTopLeftRadius:'20px',borderBottomLeftRadius: '20px',width:'45%'}}>
                <div style={{width:'100%',height:'100%', backgroundColor: 'rgb(255 0 0 / 19%)',borderTopLeftRadius:'20px',borderBottomLeftRadius: '20px', top:'0'}}>
                    <p style={{position:'absolute',marginLeft:'7%',marginTop: '10%',width:'min-content', fontSize: '50px',fontFamily: 'Times New Roman',fontWeight: 'bold',color:'whitesmoke'}}> LETS </p>
                    <p style={{position:'absolute',marginLeft:'7%',marginTop: '17%',width:'min-content', fontSize: '50px',fontFamily: 'Times New Roman',fontWeight: 'bold',color:'whitesmoke'}}> GET </p>
                    <p style={{position:'absolute',marginLeft:'7%',marginTop: '23%',width:'min-content', fontSize: '50px',fontFamily: 'Times New Roman',fontWeight: 'bold',color:'whitesmoke'}}> STARTED! </p>

                </div>
                </div>
            <FlexView id="E" column >
                <form onSubmit={this.submitHandler}>
                        <h2 style={{margin:'5% auto 63% 5%',width:'min-content', fontSize: '40px',fontFamily: 'Times New Roman',fontWeight: 'bold',color:'whitesmoke',textShadow:'8px 12px 15px rgba(0,0,0,0.8)'}}>Login</h2>
                    <input 
                        className="InputBlock UsernameLogin"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="E1">This is a required field</span>
                    <span className="Error" id="E2">Please enter a valid email id</span>
                    <input 
                        className="InputBlock PasswordLogin"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.changeHandler}
                        required/>
                    
                   
                    <span className="Error" id="E3">** Password incorrect</span>
                  <FlexView style={{width: '70%',margin:'5% auto',height: 'fit-content'}}>
                  <button className="ButtonLogin" type="submit" onClick={this.submitHandler}>
                        LOGIN
                    </button>
                    <div id="registerHere">
                    <p  onClick={this.registerHandler}>SIGN UP!!</p>
                    </div>
                 
                  </FlexView>
                   
                </form>
                
            </FlexView>
            
            </FlexView>
            </div>
        );
    }


}