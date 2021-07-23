import React,{Component} from 'react';
import FlexView from "react-flexview";
import { router } from "../services/router";
import './Register.css'; 
import axios from "axios";
import { postRequest, getRequest } from '../services/httpService';
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

            let promise = postRequest("/register",userinfo); //store name, email, password, age in DB
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
            <FlexView id="R"  >
                <FlexView style = {{borderTopLeftRadius:'15px',
                                    borderBottomLeftRadius:'15px' ,
                                    backgroundColor: 'rgb(48 213 200 / 88%)', 
                                    height: '100%', 
                                    width: '35%',
                                    fontSize: '20px',
                                    }}column>
                    <h1 style = {{marginLeft: 'auto',marginRight:'auto',fontFamily:'timesNewRoman',color: 'whitesmoke',marginTop: '45%', width: 'fit-content'}}> Welcome back!!</h1>
                    <h2 style = {{marginLeft: 'auto',marginRight:'auto',fontFamily:'timesNewRoman',marginTop: '10%',color: 'whitesmoke'}}>Sign in to continue access.</h2>
                    <div  onClick={() => router.stateService.go('login')} id="alreadyHaveAcc"style = {{marginLeft: 'auto',
                                    marginRight:'auto',
                                    fontFamily:'timesNewRoman',
                                    marginTop: '2%',
                                    color: 'whitesmoke', 
                                    border: 'solid 2px white',
                                    borderRadius: '40px',
                                    backgroundColor: '#f5f5f54d',
                                    width:'250px',
                                    boxShadow:'-5px 7px 10px rgba(0, 0 , 0, 0.2)'}}><p>Already have an account. </p></div>
                </FlexView>
                <FlexView  style ={{backgroundColor:'#ffffffb5',borderTopRightRadius:'15px',borderBottomRightRadius:'15px',height: '100%', width: '65%' }} column>
                <div>
                <h2 id="register">Create an Account!!</h2>
                </div>
                <form>   
                        <FlexView>
                        <div style={{width: '50%', height:'fit-content'}}>
                            <input 
                        className="InputBlock1 Name"
                        type="text"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={this.state.firstName}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="R1">This is a required field</span>
                    </div>
                    <div style={{width: '50%', height:'fit-content'}}> 
                    <input 
                        className="InputBlock1 Name"
                        type="text"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={this.state.lastName}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="R2">This is a required field</span>
                    </div>
                        </FlexView>
                        
                    <input 
                        className="InputBlock1 Email"
                        type="email"
                        name="email"
                        placeholder="Enter Email id"
                        value={this.state.email}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="R3">This is a required field</span>
                    <FlexView>
                    <div style={{width: '50%', height:'fit-content'}}>
                    <input 
                        className="InputBlock1 Password"
                        type="password"
                        name="password"
                        placeholder="Enter New Password"
                        value={this.state.password}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="R4">This is a required field</span>
                    </div>
                    <div style={{width: '50%', height:'fit-content'}}>
                    <input 
                        className="InputBlock1 Password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Re-enter Password"
                        value={this.state.confirmPassword}
                        onChange={this.changeHandler}
                        required/>
                   
                    <span className="Error" id="R5">** Password Mismatch</span>
                    </div>

                    </FlexView>
                   
                    <input 
                        className="InputBlock1 Age"
                        type="text"
                        name="age"
                        placeholder="Enter your age"
                        value={this.state.age}
                        onChange={this.changeHandler}
                        required/>  
                    <span className="Error" id="R6">This is a required field</span>
                    <input 
                        className="InputBlock1 PhoneNumber"
                        type="text"
                        name="phoneNumber"
                        placeholder="Enter your phone number"
                        value={this.state.phoneNumber}
                        onChange={this.changeHandler}
                        required/>
                    <span className="Error" id="R7">This is a required field</span>
                    <button  id = "regButton" type="submit" onClick={this.submitHandler}>
                        SIGN IN!
                    </button>
                </form>
                </FlexView>
                
                
            </FlexView>
            </div>
        );
    }


}