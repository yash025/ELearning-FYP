import React, {  useEffect, useState, useRef } from 'react';
import './CanvasArea.css';

const canvasArea = props => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing , setIsDrawing] = useState(false) 

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth /2;
    canvas.height = window.innerHeight /2;
    canvas.style.width =  '${window.innerWidth/2}px';
    canvas.style.Height =  '${window.innerHeight/2}px';
    
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
    console.log(dataUrl);
  }


  return (
      <div className="CanvasArea">
        <canvas 
          id="canvas" 
          onMouseDown={startDrawing}
          onMouseUp={finshDrawing}
          onMouseMove={draw}
          ref={canvasRef}></canvas>
        <button onClick={urlConverter} >Show url</button>
      </div>
    );
  }


export default canvasArea;
