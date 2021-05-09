import React,{Component} from 'react';
import FlexView from "react-flexview";
// import { router } from "../services/router";

export default class Digits extends Component{

    constructor(props) {
        super(props);
        this.state = {
            showDiv : false,
            incomplete: Range(0,10),
            // numbers: [
            // {number: 0},
            // {number: 1},
            // {number: 2},
            // {number: 3},
            // {number: 4},
            // {number: 5},
            // {number: 6},
            // {number: 7},
            // {number: 8},
            // {number: 9}
            // ],
            incompLen: 10,
            completed: [],
            compLen: 0

        }
    }


    render(){
        return(
            <FlexView id="E" column >
                <div>
                    <p>Digits</p>
                    
                </div>
            </FlexView>
        );
    }


}