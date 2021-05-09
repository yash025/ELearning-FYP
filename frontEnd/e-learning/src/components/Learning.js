import React,{Component} from 'react';
import FlexView from "react-flexview";
// import { router } from "../services/router";
import CanvasArea from "../components/CanvasArea";

export default class Learning extends Component{


    selectionHandler = (props) => {
        if(props.value===1 && <CanvasArea/>){

        }
    }
        
        // router.stateService.go('learning');
        
    
    render(){
        return(
            <FlexView id="E" column >
                <div>
                    <p>Learning</p>
                </div>
                <div>
                    <p onClick={this.selectionHandler} value='1'>digits</p>
                    <p>alphabets</p>
                    <p>draw</p>
                    {/* <CanvasArea/> */}
                </div>
                {/* <p onClick={this.registerHandler(value=1)}>Register here</p> */}
            </FlexView>
        );
    }


}