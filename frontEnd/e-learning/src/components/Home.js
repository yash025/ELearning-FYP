import React,{Component} from 'react';
import FlexView from "react-flexview";
import { router } from "../services/router";

export default class Home extends Component{


    learningHandler = () => {
        router.stateService.go('learning');
        
    }
    drawingHandler = () => {
        router.stateService.go('drawing');
    }
    render(){
        return(
            <FlexView id="E" column >
                <div>
                    <p>Home</p>
                </div>
                <p onClick={this.learningHandler}>Learning</p>
                <p onClick={this.drawingHandler}>Drawing</p>
            </FlexView>
        );
    }


}