import React,{Component} from 'react';
import FlexView from "react-flexview";
// import Speech from 'react-speech';
import { router } from "../services/router";
import CanvasArea from "../components/CanvasArea";
import Element from "./Element";
import './Learning.css';
import {getRequest,postRequest} from "../services/httpService";

export default class Learning extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedCategory:"",
            categories: ['Digit','Alphabet', 'Object'],
            showCategory: false,
            digits: ['0','1','2','3','4','5','6','7','8','9'],
            alphabets: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            object: ["apple", "arm", "banana", "bandage", "baseball", "bat", "blackberry", "bread", "candle", "carrot", "circle",
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
        let promise = getRequest("http://localhost:5000/completedList");
        console.log(response);
            promise.then(res => {
                if(res.status == 200) {
                    console.log("Got completed list.");
                    var completed = [...res.data.completed];
                    this.setState({completed: completed});
                } else {
                    console.log("Couldn't get completed list.");
                }
                }).catch(res=>{
                    alert("Could not connect");
                    router.stateService.reload();
                })
    }

    showDiv = (category) => {
        if(this.state.showCanvas){
            // alert("Your progress isn't saved, Please submit your work");
            // return;
            this.setState({showCanvas: false});
        }
        if(category!==this.state.selectedCategory)
            this.setState({selectedCategory: category});
        else
            this.setState({selectedCategory: ""});
        
    }

    completionHandler = (element) => {
        console.log("completionhandler")
        if(!this.state.completed.some(item => item===element))
        {
            const completedUpd = [...this.state.completed,element];
            this.setState({completed: completedUpd});
        }
        console.log("completionhandler learning");
        console.log(element);
        let cat =this.getCategory(element);

        //remove later start
        // this.setState({showCanvas: false, selectedCategory: cat});
        //remove later end
        const data = { type: "learning", element: element, category: cat};
        //Uncomment call later start
        let response = postRequest("http://localhost:5000/updateCompleted", data);  //set that element as completed in table and return status + completed list
        console.log(response); 
        response.then(res => {
            if(res.status == 200) {
                alert("Successfully updated");
                this.setState({showCanvas: false, selectedCategory: cat});
                // var completed = [...res.completed];
                // this.setState({completed: completed});
            } else {
                alert("Could not update");
                // router.stateService.reload();
            }
            }).catch(res=>{
                alert("Could not connnect.");
                // router.stateService.reload();
            })
        //Uncomment call later end
        
    }

    elemClickHandler = (elementName) => {
        this.setState({selectedCategory: ""});
        console.log("Clicked");
        if(!this.state.completed.some(item => item===elementName))
        {
            this.setState({selected: elementName, showCanvas: true});
            //call function to get the boolean result=true/false
            //this.setState({success: result})
            //const completedUpd = [...this.state.completed,elementName];
            //this.setState({completed: completedUpd});
        }
    } 

    getCategory = (element) => {
        if(this.state.digits.includes(element))
            return this.state.categories[0];
        else if(this.state.alphabets.includes(element))
            return this.state.categories[1];
        else if(this.state.object.includes(element))
            return this.state.categories[2];
        return "";
    }

    render(){
        let canvas=null, digits=null, alphabets=null, object=null;
        let color='rgba($(218), $(205), $(205), $(0.575))';
        let data = {
            type: "learning",
            category: this.getCategory(this.state.selected),
            selected: this.state.selected,
            learningComplete: this.completionHandler
        }

        if(this.state.selectedCategory === "Digit") {
            digits = (<div className='ElemDiv'>
            {
                this.state.digits.map((digit, index) => { 
                color = this.state.completed.includes(digit)?'green':'rgba($(218), $(205), $(205), $(0.575))'; 
                return <Element color={color} click = {() => this.elemClickHandler(digit)} number={digit}/>
            })
            }
        </div>)
        } else if(this.state.selectedCategory === "Alphabet") {
            alphabets = <div className='ElemDiv'>
            {
            this.state.alphabets.map((alphabet,index) => {
                color = this.state.completed.includes(alphabet)?'green':'rgba($(218), $(205), $(205), $(0.575))';
                return <Element color={color} click = {() => this.elemClickHandler(alphabet)} number={alphabet}/>
            })
            }
        </div>
        } else if(this.state.selectedCategory === "Object") {
            object = (<div className='ElemDiv'>
            {
            this.state.object.map((drawing,index) => {
                color = this.state.completed.includes(drawing)?'green':'rgba($(218), $(205), $(205), $(0.575))';
                return <Element color={color} click = {() => this.elemClickHandler(drawing)} number={drawing}/>
            })
            }
        </div>
        )
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
                        <CanvasArea objectProperty={data} />
                    </div>
                    </FlexView>
                </FlexView>
            );
        };

        // callback={() => this.completionHandler(this.state.selected)}
        return(
            <div id="learningDiv">
            <FlexView id="L" column >
                <div className="LearningBar">
                    <p className='LearningTitle'>Learning</p>
                </div>
                <FlexView className='LearningContent' column>
                    <FlexView className='CategoryDiv' >
                        {this.state.categories.map((category, index) => (
                            <div className='Category' onClick={()=>this.showDiv(category)}>
                            <p className='CategoryTitle'>{category}</p>
                            </div>
                        ))}
                        </FlexView>
                    {/* <div id='digitCat'className='Category' onClick={()=>this.showDiv(category=1)}>
                        <p className='CategoryTitle'>DIGITS</p>
                    </div>
                    <div className='Category' onClick={()=>this.showDiv(category=2)}>
                        <p className='CategoryTitle'>ALPHABETS</p>
                    </div>
                    <div className='Category' onClick={()=>this.showDiv(category=3)}>
                        <p className='CategoryTitle'>OBJECT</p>
                    </div> */}
                    
                    {digits}
                    {alphabets}
                    {object}
                    {/* {content} */}
                    {canvas}
                    {/* <CanvasArea/> */}
                </FlexView>
            </FlexView>
            </div>
        );
    }


}