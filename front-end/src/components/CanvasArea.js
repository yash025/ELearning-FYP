// import { green } from '@material-ui/core/colors';
// import { prop } from '@uirouter/core';
import React, {  useEffect, useState, useRef } from 'react';
import { postRequest } from '../services/httpService';
import './CanvasArea.css';
import {router} from "../services/router";

const CanvasArea = props => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing , setIsDrawing] = useState(false) 

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.width = '100%';//window.innerWidth /2;
    canvas.style.height = '100%'; //window.innerHeight /2;
    canvas.width = canvas.offsetWidth; //'${window.innerWidth/2}px';
    canvas.height =  canvas.offsetHeight;//'${window.innerHeight/2}px';
    
    const context = canvas.getContext("2d")
    // context.scale(2,2)
    context.lineCap= "round"
    context.strokeStyle = "black"
    context.lineWidth =15
    contextRef.current = context
  },[])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX,offsetY)
    setIsDrawing(true)
  }
  const finshDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }
  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX,offsetY)
    contextRef.current.stroke()
  }
  
  const urlConverter = () => {
    var canvas = document.getElementById("canvas");
    var dataUrl = canvas.toDataURL();
    console.log(dataUrl);
    let data = {}

    //Learning
    if(props.objectProperty && props.objectProperty.type === "learning") {
      data = {
        type: props.objectProperty.type,
        dataUrl: dataUrl,
        category: props.objectProperty.category,
        selected: props.objectProperty.selected
      }
    } else {
      data = {
        type: props.objectProperty.type,
        dataUrl: dataUrl,
        chosen: props.objectProperty.chosen,
        level: props.objectProperty.level 
      }
    }
    console.log(data);

    let promise = postRequest("/canvas",data);
    console.log(promise);
    promise.then(res => {
    if(res.status === 200) {
        alert("Url sent, Recieved drawn Status");
          console.log(res)
        if(res.data.result)
        {
                //Learning
                if(props.objectProperty && props.objectProperty.learningComplete){
                  props.objectProperty.learningComplete(props.objectProperty.selected)
                }

                //Drawing
                if(props.objectProperty && props.objectProperty.drawingComplete) {
                  props.objectProperty.drawingComplete(props.objectProperty.level)
                }
        }
        else{
          alert("Incorrect drawing, try again.");
        }
    } else {
        alert("dataurl not sent, drawnStatus not recieved");
        // router.stateService.reload();
      }
    }).catch(res=>{
          alert("Could not connect.");
          
      })
      
  }

  const clearCanvas = () => {

    let clearcanvas = document.getElementById('canvas');
    let ctx = clearcanvas.getContext("2d");
    ctx.clearRect(0, 0, clearcanvas.width, clearcanvas.height);

  }

  return (
      <div className="CanvasArea">
        <canvas 
          id="canvas" 
          onMouseDown={startDrawing}
          onMouseUp={finshDrawing}
          onMouseMove={draw}
          ref={canvasRef}></canvas>
        <button style={{backgroundColor: 'green'}} className='ButtonClass1' onClick={urlConverter} >Submit your drawing</button>
        <button className='ButtonClass1' onClick={clearCanvas}>Clear</button>
      </div>
    );
  }


export default CanvasArea;
