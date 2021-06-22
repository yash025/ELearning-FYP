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
        router.stateService.go(pageName);
    }
    render(){
        return(
            <div id="homeDiv">
            <FlexView id="H" column >
                <div className='HomeBar'>
                    <p className="HomeTitle">HOME PAGE</p>
                    <p onClick={tempstorage.logout}className="Logout">Logout</p>
                </div>
                <div className='NavBar'> 
                    <div className='NavElem'>About</div>
                    <div className='NavElem' onClick={() => this.clickHandler('myProgress')} >My Progress</div>
                    <div className='NavElem' onClick={() => this.clickHandler('profile')} >Profile Settings</div>
                </div>
                <div className= 'Section' id='section1' onClick={this.learningHandler}>
                    <p className='SectionTitle'>Learning</p>
                    </div>
                <div className= 'Section' onClick={this.drawingHandler}>
                    <p className='SectionTitle'>Drawing</p>
                    </div>
            </FlexView>
            </div>
        );
    }


}