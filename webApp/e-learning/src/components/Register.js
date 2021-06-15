import React,{Component} from 'react';
import FlexView from "react-flexview";
import { router } from "../services/router";
import './Register.css'; 
import axios from "axios"

const apiURL = "http://localhost:5000"
const headers = { "content-type": "application/json" };

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
            const userinfo  = this.state;
            console.log(userinfo);
                axios
                .get(apiURL + '/register', { params : { email: this.state.email, name: this.state.name, 
                    age : this.state.age, password : this.state.password } }, headers)
                    .then((response) => {
                        console.log(response.data)
                        if(response.status >= 200 && response.status < 300) {
                            alert("Successfully registered");
                            router.stateservice.go('login');
                        }
                        else {
                            alert("Could not register, please try again.");
                            router.stateService.reload();
                        }
                    })
                .catch((error) => {
                    console.log(error);
                });
        }
        
        
    }

    render(){
        return(
            <div id="registerDiv">
            <FlexView id="R" column >
                <h2><span id="register">Sign Up!!</span></h2>
                <form>
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