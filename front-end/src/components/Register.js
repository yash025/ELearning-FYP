import React,{Component} from 'react';
import FlexView from "react-flexview";
import { router } from "../services/router";
import './Register.css'; 
import axios from "axios";
import { getRequest } from '../services/httpService';
import { RegisteredHook } from '@uirouter/react';

const apiURL = "http://localhost:5000";
const headers = { "content-type": "application/json" };

export default class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email : '',
            password: '',
            confirmPassword: '',
            age: '',
            phoneNumber: ''
        }

    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
        console.log(this.state);
       
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log("submitted");
        var flag=false;
        if( this.state.firstName===''||this.state.firstName===undefined){
            document.getElementById("R1").style.display = 'block';
            flag=true;
        }
        if( this.state.lastName===''||this.state.lastName===undefined){
            document.getElementById("R2").style.display = 'block';
            flag=true;
        }
        if( this.state.email===''||this.state.email===undefined){
            document.getElementById("R3").style.display = 'block';
            flag=true;
        }
        if( this.state.password===''||this.state.password===undefined){
            document.getElementById("R4").style.display = 'block';
            flag=true;
        }
        else if(this.state.password!==this.state.confirmPassword){
            document.getElementById("R5").style.display = 'block';
            flag=true;
        }
        if( this.state.age===''||this.state.age===undefined){
            document.getElementById("R6").style.display = 'block';
            flag=true;
        }
        if( this.state.phoneNumber===''||this.state.phoneNumber===undefined){
            document.getElementById("R7").style.display = 'block';
            flag=true;
        }
        if(!flag){
            const userinfo  = this.state;

            // console.log(userinfo);
            //     axios
            //     .get(apiURL + '/register', { params : { email: this.state.email, firstName: this.state.firstName, lastName: this.state.lastName, 
            //         age : this.state.age, password : this.state.password, phoneNumber: this.state.phoneNumber } }, headers)
            //         .then((response) => {
            //             console.log(response.data)
            //             if(response.status >= 200 && response.status < 300) {
            //                 alert("Successfully registered");
            //                 router.stateservice.go('login');
            //             }
            //             else {
            //                 alert("Could not register, please try again.");
            //                 router.stateService.reload();
            //             }
            //         })
            //     .catch((error) => {
            //         console.log(error);
            //     });

            let promise = getRequest("/register",userinfo); //store name, email, password, age in DB
            console.log(userinfo);
            promise.then(res => {
                if(res.status === 200) { 
                    alert("Successfully registered");
                    router.stateService.go('login'); 
                } else {
                    alert("Could not register, please try again.");
                    // router.stateService.reload();
                }
                }).catch(res=>{
                    alert("Could not connect. register"); 
                    // router.stateService.reload();
                })
        }
        
        
    }

    render(){
        return(
            <div id="registerDiv">
            <FlexView id="R" column >
                <div>
                <h2 id="register">Sign Up!!</h2>
                </div>
                <form>
                        {/* <label style={{color:'black'}}>Username</label> */}
                        <input 
                        className="InputBlock"
                        type="text"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={this.state.firstName}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="R1">This is a required field</span>
                    <input 
                        className="InputBlock"
                        type="text"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={this.state.lastName}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="R2">This is a required field</span>
                    <input 
                        className="InputBlock"
                        type="email"
                        name="email"
                        placeholder="Enter Email id"
                        value={this.state.email}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="R3">This is a required field</span>
                    
                    {/* <label style={{color:'black'}}>Password</label> */}
                    <input 
                        className="InputBlock"
                        type="password"
                        name="password"
                        placeholder="Enter New Password"
                        value={this.state.password}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="R4">This is a required field</span>
                      <input 
                        className="InputBlock"
                        type="password"
                        name="confirmPassword"
                        placeholder="Re-enter Password"
                        value={this.state.confirmPassword}
                        onChange={this.changeHandler}
                        required/>
                   
                    <span className="Error" id="R5">** Password Mismatch</span>

                    <input 
                        className="InputBlock"
                        type="text"
                        name="age"
                        placeholder="Enter your age"
                        value={this.state.age}
                        onChange={this.changeHandler}
                        required/>  
                    <span className="Error" id="R6">This is a required field</span>
                    <input 
                        className="InputBlock"
                        type="text"
                        name="phoneNumber"
                        placeholder="Enter your phone number"
                        value={this.state.phoneNumber}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="R7">This is a required field</span>
                    <button  id = "regButton" type="submit" onClick={this.submitHandler}>
                        REGISTER
                    </button>
                </form>
                
            </FlexView>
            </div>
        );
    }


}