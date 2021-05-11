import React,{Component} from 'react';
import FlexView from "react-flexview";
import Speech from 'react-speech';
// import { router } from "../services/router";
import CanvasArea from "../components/CanvasArea";
import Element from "./Element";
import './Learning.css';
export default class Learning extends Component{
    constructor(props){
        super(props);
        this.state = {
            category:-1,
            digits: ['0','1','2','3','4','5','6','7','8','9'],
            alphabets: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            // draw:['apple' ,'axe','airplane','arm' ,'anvil','ambulance','bread','alarm clock','angel','baseball','butterfly','ant',
            //       'blackberry','bathtub' ,'binoculars','bat' ,'bed' ,'bracelet','banana' ,'basket' ,'bear','bandage' ,'bench' 
            //       ,'bird','belt','bulldozer','candle' ,'catcus' ,'camel' ,'calendar','camera' ,
            //       'coffee cup' ,'cat','carrot','crown' ,'cruise ship' ,'dumbells' ,'dragon','circle' ,'eye glasses' 
            //       ,'drill','cloud' ,'ear','drums','donut','fan' ,'firetruck','door','fish' ,'guitar','diamond' ,'fench' ,
            //       'helicopter','envelope' ,'flashlight' ,'helmet','eraser','frying pan' ,'hedgehog','feather' ,'frok' ,'headphones',
            //       'hat' ,'knife' ,'kangaroo', 'hexagon' ,'keyboard' ,'lion' ,'key' ,'mouse' ,'owl', 'line'  ,'paintbrush','oven', 
            //       'leaf' ,'nose','parrot','octagon' ,'purse' ,'penguin', 'potato' ,'postcard','piano' ],
            draw: ["apple", "arm", "banana", "bandage", "baseball", "bat", "blackberry", "bread", "candle", "carrot", "circle",
             "cloud", "diamond", "door", "elbow", "feather", "foot", "frying pan", "hat", "hexagon", "hockey stick", "key",
              "knife", "leaf", "octagon", "paintbrush", "star", "triangle", "zigzag"],
            completed: [],
            showCanvas: false,
            selected: '',
            success: 'false'
        }

    }

    componentDidMount() {
        //httpservice.get()
        //backendapi call -- axios.get("https://backendAPIfetchCompleted").then(response => {
            //var completed = [...response.data.completed];
            //this.setState({completed: completed});
        //});
    }

    showDiv = (category) => {
        if(this.state.showCanvas){
            // alert("Your progress isn't saved, Please submit your work");
            // return;
            this.setState({showCanvas: false});
        }
        if(category!==this.state.category)
            this.setState({category: category});
        else
            this.setState({category: -1});
        
    }

    completionHandler = (element) => {
        
        if(!this.state.completed.some(item => item===element))
        {
            const completedUpd = [...this.state.completed,element];
            this.setState({completed: completedUpd});
        }
        console.log("completionhander");
        console.log(element);
        let cat =this.getCategory(element)
        this.setState({showCanvas: false, category: cat});
    }

    elemClickHandler = (elementName) => {
        this.setState({category: -1});
        console.log("Clicked");
        if(!this.state.completed.some(item => item===elementName))
        {
            this.setState({selected: elementName, showCanvas: true});
            //call function to get the boolean result=true/false
            //this.setState({success: result})
            const completedUpd = [...this.state.completed,elementName];
            this.setState({completed: completedUpd});
        }
    } 

    getCategory = (element) => {
        if(this.state.digits.includes(element))
            return 1;
        else if(this.state.alphabets.includes(element))
            return 2;
        else if(this.state.draw.includes(element))
            return 3;
        return -1;
    }
    render(){
        let digits =null,alphabets=null,draw=null,canvas=null;
        let category=-1;
        let color='rgba($(218), $(205), $(205), $(0.575))';
        if(this.state.category===1){
            digits = (
            <div className='ElemDiv'>
                {
                    this.state.digits.map((digit, index) => { 
                    color = this.state.completed.includes(digit)?'green':'rgba($(218), $(205), $(205), $(0.575))'; 
                    return <Element color={color} click = {() => this.elemClickHandler(digit)} number={digit}/>
                })
                }
            </div>);
            
        }
        else if(this.state.category===2){
            alphabets = (
                <div className='ElemDiv'>
                    {
                    this.state.alphabets.map((alphabet,index) => {
                        color = this.state.completed.includes(alphabet)?'green':'rgba($(218), $(205), $(205), $(0.575))';
                        return <Element color={color} click = {() => this.elemClickHandler(alphabet)} number={alphabet}/>
                    })
                    }
                </div>
            );
        }
        else if(this.state.category===3){
            draw = (
                <div className='ElemDiv'>
                    {
                    this.state.draw.map((drawing,index) => {
                        color = this.state.completed.includes(drawing)?'green':'rgba($(218), $(205), $(205), $(0.575))';
                        return <Element color={color} click = {() => this.elemClickHandler(drawing)} number={drawing}/>
                    })
                    }
                </div>
            );
        }
        
        if(this.state.showCanvas){
            var path = require("../resources/images/elements/"+ this.state.selected + ".jpg"); 
            // console.log(path);
            canvas = (
                <FlexView className='CanvasDiv' column>
                    <div className='Selected'>
                        <p className='SelectedTitle'>{this.state.selected}</p>
                        {/* <Speech play={false}resume={false} className='Speech' text='An apple'/> */}
                    </div>
                    <FlexView className='CanvasDiv1'>
                    <div id='teach' className='SelectedElemCanvas'>
                        <img className='Image' alt='not fetched' src={path} />
                    </div>
                    <div className='SelectedElemCanvas'>
                        <CanvasArea callback={() => this.completionHandler(this.state.selected)}/>
                    </div>
                    </FlexView>
                </FlexView>
            );
        };
        return(
            <div id="learningDiv">
            <FlexView id="L" column >
                <div className="LearningBar">
                    <p className='LearningTitle'>Learning</p>
                </div>
                <div className='LearningContent'>
                    <div id='digitCat'className='Category' onClick={()=>this.showDiv(category=1)}>
                        <p className='CategoryTitle'>DIGITS</p>
                    </div>
                    <div className='Category' onClick={()=>this.showDiv(category=2)}>
                        <p className='CategoryTitle'>ALPHABETS</p>
                    </div>
                    <div className='Category' onClick={()=>this.showDiv(category=3)}>
                        <p className='CategoryTitle'>DRAW</p>
                    </div>
                    {digits}
                    {alphabets}
                    {draw}
                    {canvas}
                    {/* <CanvasArea/> */}
                </div>
            </FlexView>
            </div>
        );
    }


}