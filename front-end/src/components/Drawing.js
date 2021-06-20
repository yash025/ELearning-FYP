import React,{Component} from 'react';
import FlexView from "react-flexview";
import { router } from "../services/router";
import CanvasArea from "../components/CanvasArea";
import './Drawing.css';
import { getRequest, postRequest } from '../services/httpService';
import {tempstorage} from '../services/TempStorage';

export default class Learning extends Component{
    constructor(props)
    {
        super(props);
        this.state ={
            showCanvas : false,
            level: -1,
            chosen: '',
            points: 0,
            easy: ['0','1','2','3','4','5','6','7','8','9',
                   'A','B','C','D','E','F','G','H','I','J',
                   'K','L','M','N','O','P','Q','R','S','T',
                   'U','V','W','X','Y','Z','apple','arm','bread',
                    'baseball','blackberry','bat','banana','bandage',
                    'carrot','candle','circle','cloud','carrot','candle',
                    'circle','cloud','donut','door','diamond','envelope',
                    'eraser','feather','hat','hexagon','key','line','leaf',
                    'octagon','potato'],
            medium: ['axe','anvil','alarm clock','butterfly','bathtub','bed',
                    'basket','bench','belt','catcus','calendar','coffee cup','crown',
                    'dumbells','eye glasses','ear','fan' ,'fish' ,'fench','flashlight'
                    ,'frying pan','frok','knife','keyboard','mouse','paintbrush',
                    'nose','purse','postcard'],
            hard: ['airplane','ambulance','angel','ant,binoculars' ,'bracelet','bear','bird',
                   'bulldozer','camel','camera','cat','cruise ship','dragon','drill','drums','firetruck',
                   'guitar','helicopter','helmet','hedgehog','headphones','kangaroo','lion','owl','oven',
                   'parrot','penguin','piano']
        }
    }
    componentDidMount() {
        // let email = () => tempstorage.getProfile('email');
        // // let email = "";
        // let promise = getRequest("/points",{email: email});   //return points from DB
        // console.log(promise);
        //     promise.then(res => {
        //         if(res.status === 200) {
        //             console.log("Got points.");
        //             this.setState({points: res.data.points});
        //         } else {
        //             console.log("Couldn't get points.");
        //         }
        //         }).catch(res=>{
        //             alert("Could not connect");
        //             router.stateService.reload();
        //         })
    }

    completionHandler = (level) => {
        // var points=this.state.points;
        // if(level===1) {
        //     points=points+10;
        //     this.setState({points:points});
        //     console.log(points);
        // }
        // else if(level===2){
        //     points+=25;
        //     this.setState({points:points});
        //     console.log(points);
        // }
        // else if(level===3) {
        //     points+=40;
        //     this.setState({points:points});
        //     console.log(points);
        // }
        // console.log("Drawing Success points: "+ points);
        let email = () => tempstorage.getProfile('email');
        const data = { email: email, type: "drawing", level: level};
        let promise = postRequest("/updateCompleted", data);  //set that points in table
        console.log(promise); 
        promise.then(res => {
            if(res.status === 200) {
                alert("Successfully updated");
                this.setState({showCanvas: false});
            } else {
                alert("Could not update");
                // router.stateService.reload();
            }
            }).catch(res=>{
                alert("Could not connnect.");
                // router.stateService.reload();
            })
        
    }
    
    clickHandler = (level) => {
        if(!this.state.showCanvas){
            console.log(level);
            if(level===1){
                let index = this.randomIndexGenerator(this.state.easy.length-1);
                let val = this.state.easy[index];
                this.setState({showCanvas: true, level: level, chosen: val});
                console.log(index, val);
            }
            else if(level===2){
                let index = this.randomIndexGenerator(this.state.medium.length-1);
                let val = this.state.medium[index];
                this.setState({showCanvas: true, level: level, chosen: val});
                 console.log(index, val);
            }
            else if(level===3){
                let index = this.randomIndexGenerator(this.state.hard.length-1);
                let val = this.state.hard[index];
                this.setState({showCanvas: true, level: level, chosen: val});
                 console.log(index, val);
            }
            
        }
        else
            alert('Work not submitted. Please submit before trying again');
    }
    randomIndexGenerator = (max) => {
        return Math.floor(Math.random()*(max-1));
    }
    render(){
        let drawingBoard=null;
        console.log("Points = ");
        console.log(this.state.points);
        let data = {
            type: "drawing",
            level: this.state.level,
            chosen: this.state.chosen,
            drawingComplete: this.completionHandler
        }
        if(this.state.showCanvas){
            drawingBoard= (
                <div className='DrawBoardContent'>
                    <p id ='drawBoardTitle'className='DrawBoard'>Draw {this.state.chosen}!!</p>
                    <div id='drawCanvas'className='DrawBoard'>
                        <CanvasArea objectProperty={data} />
                        {/* callback={() => this.completionHandler(this.state.level)} */}
                    </div>
                </div>
            );
        }
        // var start;
        // const timer = () => {
        //     const { time, start, pause, reset, status } = useTimer({
        //       endTime: 0,
        //       initialTime: 5,
        //       timerType: 'DECREMENTAL',
        //       onTimeOver: () => {
        //           console.log('Time over');
        //       }
        //     });
        //     this.start=start;
        //     console.log(start);
        // }
        // const options = ['Easy','Medium','hard'];
        // const defaultOption = options[0];
        
        return(
            <div id='drawingDiv'>
            <FlexView id="D" column >
                <div className='DrawBar'>
                    <p className='DrawTitle'>Drawing!!</p>
                </div>
                <div className='DrawContent'>
                    {/* <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select level"/> */}
                   <div className='LevelTitle'> 
                     <p id='title'>Select Level</p> 
                   </div> 
                    <div className='Level'>
                        <div className='LevelDiv' onClick={() => {this.clickHandler(1)}}><p>Easy</p></div>
                        <div className='LevelDiv' onClick={() => {this.clickHandler(2)}}><p>Medium</p></div>
                        <div className='LevelDiv' onClick={() => {this.clickHandler(3)}}><p>Hard</p></div>
                    </div>
                    
                </div>
                {drawingBoard}
            </FlexView>
            </div>
        );
    }
}