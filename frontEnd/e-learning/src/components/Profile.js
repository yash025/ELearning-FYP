import React,{Component} from 'react';
import FlexView from "react-flexview";
import Avatar from '@material-ui/core/Avatar';
import { router } from "../services/router";
import {tempstorage} from "../services/TempStorage";
import "./Profile.css";

export default class Profile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            //name: props.$stateParams.name
        }
        this.profile = tempstorage.getProfile();
    }
    

    goToHome = () => {
        router.stateService.go('home')
    }

    render(){
        return (
            <div id="profileDiv" >
                <FlexView id="home" >
                    <p id="homeHeader">Draw and Learn</p>
                    <a id="homeLink" onClick={this.goToHome}>Home</a>
                    <Avatar id="avatar" alt="Profile" src="/broken-image.jpg" ></Avatar>
                </FlexView>
                <FlexView id="E" column >
                    <p>Name: {this.profile.name}</p>
                    <p>Age: {this.profile.age}</p>
                    <p>Gender: {this.profile.gender}</p>
                    <p>Location: {this.profile.location}</p>
                </FlexView>
            </div>
        );
    }


}