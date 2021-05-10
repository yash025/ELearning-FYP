import { green } from '@material-ui/core/colors';
import React, {  useEffect, useState, useRef } from 'react';
import './CanvasArea.css';

const canvasArea = props => {
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
    context.lineWidth =5 
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
    //const axios =require('axos');
    //axios.post('url',{dataUrl}).then(funcion(response){
    //    console.log(response);
    // });
    //var boolean=response.data;
    //if(boolean==='errorMessage')
    //{}
    //else
    props.callback();
    //console.log(dataUrl);
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


export default canvasArea;
