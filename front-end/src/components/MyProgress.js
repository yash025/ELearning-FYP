import React,{Component} from 'react';
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

export default function MyProgress() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(3);

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
                            <h2 id="progressName">Paavana M Kumar</h2>
                        </Flexview>
                        <h2 className="PointsAndRank" >
                            POINTS SCORED: {}
                        </h2>
                        <h2 className="PointsAndRank" id="rank">
                            RANK: 5
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
                                <MobileStepper id="stepper1" variant="progress" steps={11} activeStep={9}/>
                            </ThemeProvider>
                            <ThemeProvider theme={theme2}>
                                <MobileStepper id = "stepper2" 
                                variant="progress" steps={27} activeStep={5}/>
                            </ThemeProvider>
                            <ThemeProvider theme={theme3}>
                                <MobileStepper id = "stepper3" 
                                variant="progress" steps={15} activeStep={5}/>
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