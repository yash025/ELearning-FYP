import React,{Component} from 'react';
import FlexView from "react-flexview";
import Avatar from '@material-ui/core/Avatar';
import { router } from "../services/router";
import {tempstorage} from "../services/TempStorage";
import "./Profile.css";
import { getRequest, postRequest } from '../services/httpService';

export default class Profile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            showProfile: false,
            showChangeSettings: false,
            showPersonalInfo: false
            //name: props.$stateParams.name
        }
        this.profile = tempstorage.getProfile();
    }
    
    componentDidMount() {
        let data = {email: tempstorage.getProfile('email')};
        console.log(data);
        let promise = getRequest("/profile",data);   //return profile from DB
        console.log(promise);
            promise.then(res => {
                if(res.status == 200) {
                    console.log("Got profile Info.");
                    tempstorage.setProfile(res.data.profile);
                    this.profile = tempstorage.getProfile();
                } else {
                    console.log("Couldn't get profile.");
                }
                }).catch(res=>{
                    alert("Could not connect");
                    // router.stateService.reload();
                })
    }

    setAllContentToFalse = () => {
        
        this.setState({
            showProfile: false, showChangeSettings: false, showPersonalInfo:false
        })
        console.log(this.state);
    }

    goToHome = () => {
        router.stateService.go('home')
    }

    showDiv = (option) => {
        if(option === "Logout") {
            router.stateService.go('login')
            return;
        }
        this.setAllContentToFalse();
        if(option === "Profile") {
            this.setState({showProfile: true});
        }
        else if( option === "Personal Information") {
            this.setState({showPersonalInfo : true});
        }
        else if( option === "Change Settings") {
            this.setState({showChangeSettings: true});
        }
    }

    enable = () => {
        console.log("Enable Function")
        document.getElementById("personalInfoTextValue").disabled = "";
        // document.getElementById("personalInfoTextValue1").disabled = "";
        document.getElementById("personalInfoTextValue2").disabled = "";
        document.getElementById("personalInfoTextValue3").disabled = "";
        console.log("Enable function end")
      }
    
    changeHandler = (event) => {
        this.profile[event.target.name] = event.target.value;
        console.log(this.profile);
    }

    submitHandler = () => {
        const profileInfo  = this.profile;
        console.log("Submit");
        console.log(profileInfo);
        this.setAllContentToFalse();
        var changedProfileDetails = {};
        // changedProfileDetails.oldEmail = "";
        for(let key in profileInfo){
            if(profileInfo[key] != "" && tempstorage.getProfile(key) !== profileInfo[key])
                changedProfileDetails[key] = profileInfo[key];
        }
        if(Object.keys(changedProfileDetails).length === 0)
            alert("Empty");
        else{
        // if(tempstorage.getProfile('email') !== profileInfo['email']){
        //     changedProfileDetails.oldEmail = tempstorage.getProfile('email');
        // }
        console.log(changedProfileDetails);
        let promise = postRequest("/updateProfile",profileInfo); //store name, email, password, age in DB
            console.log(profileInfo);
            promise.then(res => {
                if(res.status === 200) {
                    alert("Successfully updated");
                    tempstorage.setProfile(profileInfo);
                    this.setAllContentToFalse();
                } else {
                    alert("Could not update, please try again.");
                    router.stateService.reload();
                }
                }).catch(res=>{
                    alert("Could not submit.");
                    router.stateService.reload();
                })
            }
    }
    render(){
        let profile = null,personalInfo =null, changeSettings = null;
        if(this.state.showPersonalInfo){
            personalInfo = (
            <FlexView id = "personalInfoDiv" column>
                <FlexView className='personalInfoHeading'>
                <p className='personalInfoHeadingText'>Personal Information</p>
                </FlexView>
                <FlexView className='personalInfo'> 
                <p className='personalInfoText'>First Name: </p>
                <p className='personalInfoTextValue'>{this.profile.firstName}</p>
                </FlexView>
                <FlexView className='personalInfo'> 
                <p className='personalInfoText'>Last Name: </p>
                <p className='personalInfoTextValue'>{this.profile.lastName}</p>
                </FlexView>
                <FlexView className='personalInfo'>
                <p className='personalInfoText'>Email: </p>
                <p className='personalInfoTextValue'>{this.profile.email}</p>
                </FlexView>
                <FlexView className='personalInfo'>
                <p className='personalInfoText' >Password: </p>
                <p className='personalInfoTextValue'>{this.profile.password}</p>
                </FlexView>
                <FlexView className='personalInfo'>
                <p className='personalInfoText'>Age: </p>
                <p className='personalInfoTextValue'>{this.profile.age}</p>
                </FlexView>
                <FlexView className='personalInfo'> 
                <p className='personalInfoText'>Phone Number: </p>
                <p className='personalInfoTextValue'>{this.profile.phoneNumber}</p>
                </FlexView>
                </FlexView>)
        }
        if(this.state.showProfile) {
            profile = (
                <FlexView id='profileContent'>
                    <div id="avatarDiv"> 
                    <Avatar id="avatar1" alt="Profile" src="/broken-image.jpg"></Avatar>
                    </div>
                    <FlexView column id = "namesUnderAvatar">
                    <div id ="nameUnderAvatar" >
                    <p className='NameUnderAvatarText'>Name: {this.profile.firstName + this.profile.lastName}</p>
                    </div> 
                    <div id ="nameUnderAvatar" >
                    <p className='NameUnderAvatarText'>username: {this.profile.email}</p>                  
                    </div>
                    </FlexView>
                   
                </FlexView>
            )
        }
        if(this.state.showChangeSettings) {
            changeSettings = (
                <form >
                <FlexView id = "personalInfoDiv" column>
                <FlexView className='personalInfoHeading'>
                <p className='personalInfoHeadingText'>Update Information</p>
                </FlexView>
                <FlexView className='personalInfo'> 
                <p className='personalInfoText'>First Name: </p>
                <input 
                        type = "text"
                        id="personalInfoTextValue" 
                        className='personalInfoTextValue' 
                        placeholder={this.profile.firstName} 
                        name="firstName"
                        onChange = {this.changeHandler}
                        disabled/>
                </FlexView>
                <FlexView className='personalInfo'> 
                <p className='personalInfoText'>Last Name: </p>
                <input 
                        type = "text"
                        id="personalInfoTextValue1" 
                        className='personalInfoTextValue' 
                        placeholder={this.profile.lastName} 
                        name="lastName"
                        onChange = {this.changeHandler}
                        disabled/>
                </FlexView>
                <FlexView className='personalInfo'>
                <p className='personalInfoText'>Email: </p>
                <p className='personalInfoTextValue'>{this.profile.email}</p>
                {/* <input type = "text"
                       name="email"
                       onChange = {this.changeHandler}
                       id="personalInfoTextValue1" 
                       className='personalInfoTextValue' 
                       placeholder={this.profile.email} 
                       disabled/> */}
                </FlexView>
                <FlexView className='personalInfo'>
                <p className='personalInfoText' >Password: </p>
                <input 
                        type = "password"
                        name="password"
                        onChange = {this.changeHandler}
                        id="personalInfoTextValue2" 
                        className='personalInfoTextValue' 
                        placeholder={this.profile.password} 
                        disabled/>
                </FlexView>
                <FlexView className='personalInfo'>
                <p className='personalInfoText'>Age: </p>
                <input
                        type = "text"
                        name="age"
                        onChange = {this.changeHandler}
                        id="personalInfoTextValue3" 
                        className='personalInfoTextValue' 
                        placeholder={this.profile.age} 
                        disabled/>
                </FlexView>
                <FlexView className='personalInfo'> 
                <p className='personalInfoText'>Phone Number: </p>
                <input 
                        type = "text"
                        id="personalInfoTextValue" 
                        className='personalInfoTextValue' 
                        placeholder={this.profile.phoneNumber} 
                        name="phoneNumber"
                        onChange = {this.changeHandler}
                        disabled/>
                </FlexView>
                </FlexView>
                <button onClick = {this.enable}>Click to enable editing.</button>
                <button type="submit" onClick= {this.submitHandler}>Update</button>

                </form>
                
                
            )
        }
        let optionList = ["Profile", "Personal Information", "Change Settings", "Logout"];
        return (
            <div id="profileDiv" >
                <FlexView id="home" >
                    <div id="backButton" onClick={this.goToHome}> 
                         <p id = "goBack">Go Back</p>
                    </div>
                    <p id="homeHeader">Profile</p>
                    <Avatar id="avatar" alt="Profile" src="/broken-image.jpg" ></Avatar>
                </FlexView>
                <FlexView id="P" column >
                    <FlexView id="enclosedDiv">
                    <div id="options">
                    {optionList.map((option, index) => (
                            <div className='OptionDiv' onClick={()=>this.showDiv(option)}>
                            <p className='OptionList'>{option}</p>
                            </div>
                        ))}
                </div>
                <div id="content">
                    {/* <p>hello</p> */}
                    {profile}
                    {personalInfo}
                    {changeSettings}
                </div>
                    </FlexView>
                
                </FlexView>
            </div>
        );
    }


}