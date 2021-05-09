import React,{Component} from 'react';
import FlexView from "react-flexview";
// import { router } from "../services/router";

export default class Learning extends Component{


    render(){
        return(
            <FlexView id="E" column >
                <div>
                    <p>Drawing</p>
                </div>
                {/* <p onClick={this.registerHandler(value=1)}>Register here</p> */}
            </FlexView>
        );
    }


}