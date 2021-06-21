import React, { Component, useEffect, useState } from 'react';
import Flexview from 'react-flexview';
import CustomizedTables from './Leaderboard';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { router } from '../services/router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MobileStepper from '@material-ui/core/MobileStepper';
import { blue, red } from '@material-ui/core/colors';
import styles from './MyProgress.module.css';
import { getRequest } from '../services/httpService';
import { tempstorage } from '../services/TempStorage';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
    '.MuiLinearProgress-root': {
        height: '50px'
    },
    progress: {
        width: '100%'
    }
  });

  const theme1 = createMuiTheme({
    overrides: {
        MuiLinearProgress: {
            root: {
                height: '70px'
            },
            barColorPrimary: {
                backgroundColor: red[600]
            },
            colorPrimary: {
                backgroundColor: red[100]
            }
      },
      MuiMobileStepper: {
        progress: {
            width: '100%'
        }
      },
    },
  });

  const theme2 = createMuiTheme({
    overrides: {
        MuiLinearProgress: {
            root: {
                height: '70px'
            },
            barColorPrimary: {
                backgroundColor: red[600]
            },
            colorPrimary: {
                backgroundColor: red[100]
            }
      },
      MuiMobileStepper: {
        progress: {
            width: '100%'
        }
      },
    },
  });

  const theme3 = createMuiTheme({
    overrides: {
        MuiLinearProgress: {
            root: {
                height: '30px'
            },
            barColorPrimary: {
                backgroundColor: red[600]
            }, 
            colorPrimary: {
                backgroundColor: red[100]
            }
      },
      MuiMobileStepper: {
        progress: {
            width: '100%'
        }
      },
    },
  });

export default function MyProgress() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(3);
    const [points, setPoints] = React.useState(0);
    const [userRank, setUserRank] = React.useState(0);
    const [name,setName] = React.useState("");
    const [digitsTotal, setDigitsTotal] = React.useState(0);
    const [digitsCompleted, setDigitsCompleted] = React.useState(0);
    const [alphabetsTotal, setAlphabetsTotal] = React.useState(0);
    const [alphabetsCompleted, setAlphabetsCompleted] = React.useState(0);
    const [objectsTotal, setObjectsTotal] = React.useState(0);
    const [objectsCompleted, setObjectsCompleted] = React.useState(0);
    const [easyTotal, setEasyTotal] = React.useState(0);
    const [easyCompleted, setEasyCompleted] = React.useState(0);
    const [mediumTotal, setMediumTotal] = React.useState(0);
    const [mediumCompleted, setMediumCompleted] = React.useState(0);
    const [hardTotal, setHardTotal] = React.useState(0);
    const [hardCompleted, setHardCompleted] = React.useState(0);

    useEffect((event) => {
        event.preventDefault();
        let email = tempstorage.getProfile('email');
        let promise = getRequest('/fetchProgressInfo',{email: email});
        promise.then(res => {
            if(res.status === 200) {
                console.log("ProgressInfoRecieved");
                console.log(res.data);
                    if(res.data.points)
                        setPoints(res.data.points);
                    if(res.data.userRank)
                        setUserRank(res.data.userRank);
                    if(res.data.firstName && res.data.lastName)
                        setName(res.data.firstName + " " + res.data.lastName);
                    if(res.data.digitsTotal)
                        setDigitsTotal(res.data.digitsTotal);
                    if(res.data.digitsCompleted)
                        setDigitsCompleted(res.data.digitsCompleted);
                    if(res.data.alphabetsTotal)
                        setAlphabetsTotal(res.data.alphabetsTotal);
                    if(res.data.alphabetsCompleted)
                        setAlphabetsCompleted(res.data.alphabetsCompleted);
                    if(res.data.objectsTotal)
                        setObjectsTotal(res.data.objectsTotal);
                    if(res.data.setObjectsCompleted)
                        setObjectsCompleted(res.data.setObjectsCompleted);
                    if(res.data.easyTotal)
                        setEasyTotal(res.data.easyTotal);
                    if(res.data.easyCompleted)
                        setEasyCompleted(res.data.easyCompleted);
                    if(res.data.mediumTotal)
                        setMediumTotal(res.data.mediumTotal);
                    if(res.data.mediumCompleted)
                        setMediumCompleted(res.data.mediumCompleted);
                    if(res.data.hardTotal)
                        setHardTotal(res.data.hardTotal);
                    if(res.data.hardCompleted)
                        setHardCompleted(res.data.hardCompleted);
                
            } else {
                alert("Progress not recieved");
                // router.stateService.reload();
              }
            }).catch(res=>{
                  alert("Could not connect.");
                  
              })
      },[])

    const learningHandler = () => {
        router.stateService.go('learning');
        
    }
    const drawingHandler = () => {
        router.stateService.go('drawing');
    }

    const goToHome = () => {
        router.stateService.go('home');
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    

        return(
            <Flexview id="MP" column>
                <Flexview id="myProgressBar" >
                    <div id="backButton" onClick={goToHome}> 
                         <p id = "goBack">Go Back</p>
                    </div>
                    <p id="progressHeader">My Progress</p>
                    <Avatar id="avatar" alt="Profile" src="/broken-image.jpg" ></Avatar>
                </Flexview>
                <Flexview id="progressContent">
                    <Flexview column id="progressInfo">
                        <Flexview id="avatarAndDetails" column>
                            <Avatar id="progressAvatar" alt="Profpic" src="/broken-image.jpg">
                            </Avatar>
                            <h2 id="progressName">{name}</h2>
                        </Flexview>
                        <h2 className="PointsAndRank" >
                            POINTS SCORED: {points}
                        </h2>
                        <h2 className="PointsAndRank" id="rank">
                            RANK: {userRank}
                        </h2>
                        <Button id="progressButton1"
                        onClick={learningHandler}>
                            Go to Learning
                        </Button>
                        <Button id="progressButton2"
                        onClick={drawingHandler}>
                            Go to Drawing
                        </Button>
                    </Flexview>

                    <Divider orientation="vertical"/>

                    <Flexview id="progressBarAndLeaderboard">
                        <Flexview id="progressContent-BarsDiv" column >
                            <ThemeProvider theme={theme1}>
                                <h2>Digits ({digitsCompleted}/{digitsTotal})</h2>
                                <MobileStepper id="stepper1" variant="progress" steps={digitsTotal+1} activeStep={digitsCompleted}/>
                            </ThemeProvider>
                            <ThemeProvider theme={theme2}>
                                <h2>Alphabets ({alphabetsCompleted}/{alphabetsTotal})</h2>
                                <MobileStepper id = "stepper2" 
                                variant="progress" steps={alphabetsTotal+1} activeStep={alphabetsCompleted}/>
                            </ThemeProvider>
                            <ThemeProvider theme={theme3}>
                                <h2>Objects ({objectsCompleted}/{objectsTotal})</h2>
                                <MobileStepper id = "stepper3" 
                                variant="progress" steps={objectsTotal+1} activeStep={objectsCompleted}/>
                            </ThemeProvider>
                        </Flexview>
                        <Flexview style={{width: '30%', marginTop: '5%', maxHeight: '550px', overflow: 'scroll'}}>
                        <CustomizedTables/>
                        </Flexview>
                    </Flexview>
                </Flexview>
            </Flexview>
        );
    
}