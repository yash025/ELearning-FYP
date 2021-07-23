import React,{Component} from 'react';
import FlexView from "react-flexview";
import { router } from "../services/router";
import './Home.css';
import { tempstorage } from '../services/TempStorage';
export default class Home extends Component{


    learningHandler = () => {
        router.stateService.go('learning');
        
    }
    drawingHandler = () => {
        router.stateService.go('drawing');
    }
    clickHandler = (pageName) => {
        // event.preventdefault();
        router.stateService.go(pageName);
    }

    render(){
        return(
            <div style = {{width: '100%',height: '100%'}}>
                <div id="homeDiv1">
                <FlexView id ="cover">
                    <p id="homeName">H O M E</p>
                    <div className='NavBar'> 
                    <div className='NavElem' id ="aboutNav"> About </div>
                    <div className='NavElem' onClick={() => this.clickHandler('myProgress')} > My Progress </div>
                    <div className='NavElem' onClick={() => this.clickHandler('profile')} > Profile Settings </div>
                    <div className='NavElem' onClick={tempstorage.logout} > Logout </div>
                </div>
                </FlexView>
                <div style={{width:'fit-content',height:'fit-content',color:'white',position:'absolute',top:'55%',left:'27%',fontFamily: 'Times  Roman', fontSize: '18px', backgroundImage: 'linear-gradient(to diagonal,rgba(255,255,255,0.5),rgba(255, 255, 255, 0.1))'}}>
                    <h1 style={{fontWeight:'bolder'}}>YAYYYY !!</h1>
                    <h2 style={{fontWeight:'bolder'}}>Welcome to the right stop for a fun learning activity !!</h2>
                    <h2 style={{fontWeight:'bolder'}}>Please choose among the following sections to move forward . . .</h2> 
                </div>
            </div>
            <div id="homeDiv2">
                <FlexView style={{width:'40%',height:'30%',margin:'5% auto 5% auto',marginTop:'10px'}}>
                <FlexView className= 'Section'  onClick={this.learningHandler}>
                    <p className='SectionTitle'>Learning</p>
                    </FlexView>
                <FlexView className= 'Section' onClick={this.drawingHandler}>
                    <p className='SectionTitle'>Drawing</p>
                </FlexView>
                </FlexView>
           
            </div>
            </div>
            
        );
    }


}