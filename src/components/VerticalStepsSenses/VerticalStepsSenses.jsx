import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Slide } from "@mui/material";
import { Container, TextField, Box } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TouchAppIcon from "@mui/icons-material/BackHand";
// import HearingIcon from "@mui/icons-material/Hearing";
import { Icon } from '@iconify/react';
// import SmellIcon from "@mui/icons-material/Smell";
// import TasteIcon from "@mui/icons-material/Taste";

import SeeList from "../SeePage/SeeList";
import TouchPage from "../TouchPage/TouchPage";
import HearPage from "../HearPage/HearPage";
import SmellPage from "../SmellPage/SmellPage";
import TastePage from "../TastePage/TastePage";

import EditSeeItem from "../SeePage/EditSeeItem";

function VerticalStepsSenses() {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    setSlideIn(true);
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [continueFunction, setContinueFunction] = useState(null);
  const [isEditingSee, setIsEditingSee] = useState(false);
  const [seeItemToEdit, setSeeItemToEdit] = useState(null);

  const handleNext = () => {
    if (continueFunction) {
      continueFunction();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      history.push("/distress-rating");
    }
  };

  const setStepContinueFunction = (fn) => {
    setContinueFunction(() => fn);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_SEE_ITEMS" });
  }, [dispatch]);

  const handleEditClick = (seeItem) => {
    setIsEditingSee(true);
    setSeeItemToEdit(seeItem);
  };

  const handleSaveClick = () => {
    dispatch({
      type: "SUBMIT_EDIT_SEE_ITEM",
      payload: {
        ...seeItemToEdit,
        id: seeItemToEdit.id,
        user_id: seeItemToEdit.userId,
        user_event_id: seeItemToEdit.eventId,
      },
    });
    setIsEditingSee(false);
  };

  const handleCancelClick = () => {
    setIsEditingSee(false);
  };

  const steps = [
    {
      label: "What you Saw",
      icon: <VisibilityIcon />,
      description: isEditingSee ? <EditSeeItem seeItem={seeItemToEdit} setSeeItemToEdit={setSeeItemToEdit} /> : <SeeList onEdit={handleEditClick} />,
    },
    {
      label: "What can you Touch",
      icon: <TouchAppIcon />,
      description: <TouchPage onContinue={setStepContinueFunction} />,
    },
    {
      label: "What do you Hear",
      icon: <Icon icon="lucide:ear" width="24" height="24" />,
      description: <HearPage onContinue={setStepContinueFunction} />,
    },
    {
      label: "What do you Smell",
      icon: <Icon icon="emojione-monotone:nose" width="24" height="24" />,
      description: <SmellPage onContinue={setStepContinueFunction} />,
    },
    {
      label: "What can you Taste",
      icon: <Icon icon="game-icons:tongue" width="24" height="24" />,
      description: <TastePage onContinue={setStepContinueFunction} />,
    },
  ];

  return (
    <Slide direction="up" in={slideIn} timeout={1500}>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel icon={step.icon}>{step.label}</StepLabel>
              <StepContent>
                <div>{step.description}</div>
                <Box sx={{ mb: 2 }}>
                  <div>
                    {isEditingSee && index === 0 ? (
                      <>
                        <Button variant="contained" onClick={handleSaveClick} sx={{ mt: 1, mr: 1 }}>
                          Save
                        </Button>
                        <Button variant="contained" onClick={handleCancelClick} sx={{ mt: 1, mr: 1 }}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        {index === 0 && (
                          <Button variant="contained" onClick={handleEditClick} sx={{ mt: 1, mr: 1 }}>
                            Edit
                          </Button>
                        )}
                        <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                          {index === steps.length - 1 ? "Finish" : "Continue"}
                        </Button>
                        {index !== 0 && (
                          <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                            Back
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Slide>
  );
}

export default VerticalStepsSenses;




/// **********
// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { Slide } from "@mui/material";
// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import StepContent from "@mui/material/StepContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";

// import SeeList from "../SeePage/SeeList";
// import TouchPage from "../TouchPage/TouchPage";
// import HearPage from "../HearPage/HearPage";
// import SmellPage from "../SmellPage/SmellPage";
// import TastePage from "../TastePage/TastePage";

// import EditSeeItem from "../SeePage/EditSeeItem";

// function VerticalStepsSenses() {
//   const [slideIn, setSlideIn] = useState(false);

//   useEffect(() => {
//     setSlideIn(true); // Trigger the slide-in effect when the component mounts
//   }, []);
  
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [activeStep, setActiveStep] = useState(0);
//   const [continueFunction, setContinueFunction] = useState(null);
//   const [isEditingSee, setIsEditingSee] = useState(false);
//   const [seeItemToEdit, setSeeItemToEdit] = useState(null);

//   const handleNext = () => {
//     if (continueFunction) {
//       continueFunction();
//     }
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);

//     // Check if it's the last step, and navigate to UserProfile
//     if (activeStep === steps.length - 1) {
//       history.push("/user-profile");
//     }
//   };

//   const setStepContinueFunction = (fn) => {
//     setContinueFunction(() => fn);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   useEffect(() => {
//     dispatch({ type: "FETCH_SEE_ITEMS" });
//   }, [dispatch]);

//   const handleEditClick = (seeItem) => {
//     setIsEditingSee(true);
//     setSeeItemToEdit(seeItem);
//   };

//   const handleSaveClick = () => {
//     console.log("seeItemToEdit:", seeItemToEdit);
//     dispatch({
//       type: "SUBMIT_EDIT_SEE_ITEM",
//       payload: {
//         ...seeItemToEdit,
//         id: seeItemToEdit.id,
//         user_id: seeItemToEdit.userId,
//         user_event_id: seeItemToEdit.eventId,
//       },
//     });
//     setIsEditingSee(false); // Switch back to view mode
//   };

//   const handleCancelClick = () => {
//     setIsEditingSee(false); // Switch back to view mode
//   };

//   const steps = [
//     {
//       label: "What you Saw",
//       description: isEditingSee ? (
//         <EditSeeItem
//           seeItem={seeItemToEdit}
//           setSeeItemToEdit={setSeeItemToEdit}
//         />
//       ) : (
//         <SeeList onEdit={handleEditClick} />
//       ),
//     },
//     {
//       label: "What can you Touch",
//       description: <TouchPage onContinue={setStepContinueFunction} />,
//     },
//     {
//       label: "What do you Hear",
//       description: <HearPage onContinue={setStepContinueFunction} />,
//     },
//     {
//       label: "What do you Smell",
//       description: <SmellPage onContinue={setStepContinueFunction} />,
//     },
//     {
//       label: "What can you Taste",
//       description: <TastePage onContinue={setStepContinueFunction} />,
//     },
//   ];

//   return (
//     <Slide direction="up" in={slideIn} timeout={1500}>
//       <Box sx={{ maxWidth: 400 }}>
//         <Stepper activeStep={activeStep} orientation="vertical">
//           {steps.map((step, index) => (
//             <Step key={step.label}>
//               <StepLabel>{step.label}</StepLabel>
//               <StepContent>
//                 <div>{step.description}</div>
//                 <Box sx={{ mb: 2 }}>
//                   <div>
//                   {isEditingSee && index === 0 ? (
//                       <>
//                         <Button
//                           variant="contained"
//                           onClick={handleSaveClick}
//                           sx={{ mt: 1, mr: 1 }}
//                         >
//                           Save
//                         </Button>
//                         <Button
//                           variant="contained"
//                           onClick={handleCancelClick}
//                           sx={{ mt: 1, mr: 1 }}
//                         >
//                           Cancel
//                         </Button>
//                       </>
//                     ) : (
//                       <>
//                         <Button
//                           variant="contained"
//                           onClick={handleEditClick}
//                           sx={{ mt: 1, mr: 1 }}
//                         >
//                           Edit
//                         </Button>

//                         <Button
//                           variant="contained"
//                           onClick={handleNext}
//                           sx={{ mt: 1, mr: 1 }}
//                         >
//                           {index === steps.length - 1 ? "Finish" : "Continue"}
//                         </Button>
//                         <Button
//                           disabled={index === 0}
//                           onClick={handleBack}
//                           sx={{ mt: 1, mr: 1 }}
//                         >
//                           Back
//                         </Button>
//                       </>
//                     )}
//                   </div>
//                 </Box>
//               </StepContent>
//             </Step>
//           ))}
//         </Stepper>
//       </Box>
//     </Slide>
//   );
// }

// export default VerticalStepsSenses;





// function VerticalStepsSenses() {
//   const [fade, setFade] = useState(false);

//   useEffect(() => {
//     setFade(true); // Trigger the fade-in effect when the component mounts
//   }, []);
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [activeStep, setActiveStep] = useState(0);
//   const [continueFunction, setContinueFunction] = useState(null);
//   const [isEditingSee, setIsEditingSee] = useState(false);
//   const [seeItemToEdit, setSeeItemToEdit] = useState(null);

//   const handleNext = () => {
//     if (continueFunction) {
//       continueFunction();
//     }
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);

//     // Check if it's the last step, and navigate to UserProfile
//     if (activeStep === steps.length - 1) {
//       history.push("/user-profile");
//     }
//   };

//   const setStepContinueFunction = (fn) => {
//     setContinueFunction(() => fn);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   useEffect(() => {
//     dispatch({ type: "FETCH_SEE_ITEMS" });
//   }, [dispatch]);

//   const handleEditClick = (seeItem) => {
//     setIsEditingSee(true);
//     setSeeItemToEdit(seeItem);
//   };

//   const handleSaveClick = () => {
//     console.log("seeItemToEdit:", seeItemToEdit);
//     dispatch({
//       type: "SUBMIT_EDIT_SEE_ITEM",
//       payload: {
//         ...seeItemToEdit,
//         id: seeItemToEdit.id,
//         user_id: seeItemToEdit.userId,
//         user_event_id: seeItemToEdit.eventId,
//       },
//     });
//     setIsEditingSee(false); // Switch back to view mode
//   };

//   const handleCancelClick = () => {
//     setIsEditingSee(false); // Switch back to view mode
//   };

//   const steps = [
//     {
//       label: "What you Saw",
//       description: isEditingSee ? (
//         <EditSeeItem
//           seeItem={seeItemToEdit}
//           setSeeItemToEdit={setSeeItemToEdit}
//         />
//       ) : (
//         <SeeList onEdit={handleEditClick} />
//       ),
//     },
//     {
//       label: "What can you Touch",
//       description: <TouchPage onContinue={setStepContinueFunction} />,
//     },
//     {
//       label: "What do you Hear",
//       description: <HearPage onContinue={setStepContinueFunction} />,
//     },
//     {
//       label: "What do you Smell",
//       description: <SmellPage onContinue={setStepContinueFunction} />,
//     },
//     {
//       label: "What can you Taste",
//       description: <TastePage onContinue={setStepContinueFunction} />,
//     },
//   ];

//   return (
//     <Fade in={fade} timeout={500}>
//       <Box sx={{ maxWidth: 400 }}>
//         <Stepper activeStep={activeStep} orientation="vertical">
//           {steps.map((step, index) => (
//             <Step key={step.label}>
//               <StepLabel>{step.label}</StepLabel>
//               <StepContent>
//                 <div>{step.description}</div>
//                 <Box sx={{ mb: 2 }}>
//                   <div>
//                     {isEditingSee && index === 0 ? (
//                       <>
//                         <Button
//                           variant="contained"
//                           onClick={handleSaveClick}
//                           sx={{ mt: 1, mr: 1 }}
//                         >
//                           Save
//                         </Button>
//                         <Button
//                           variant="contained"
//                           onClick={handleCancelClick}
//                           sx={{ mt: 1, mr: 1 }}
//                         >
//                           Cancel
//                         </Button>
//                       </>
//                     ) : (
//                       <>
//                         <Button
//                           variant="contained"
//                           onClick={handleEditClick}
//                           sx={{ mt: 1, mr: 1 }}
//                         >
//                           Edit
//                         </Button>

//                         <Button
//                           variant="contained"
//                           onClick={handleNext}
//                           sx={{ mt: 1, mr: 1 }}
//                         >
//                           {index === steps.length - 1 ? "Finish" : "Continue"}
//                         </Button>
//                         <Button
//                           disabled={index === 0}
//                           onClick={handleBack}
//                           sx={{ mt: 1, mr: 1 }}
//                         >
//                           Back
//                         </Button>
//                       </>
//                     )}
//                   </div>
//                 </Box>
//               </StepContent>
//             </Step>
//           ))}
//         </Stepper>
//       </Box>
//     </Fade>
//   );
// }

// export default VerticalStepsSenses;

// ** KIND OF OG
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import StepContent from "@mui/material/StepContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";

// import SeeList from "../SeePage/SeeList";
// import TouchPage from "../TouchPage/TouchPage";
// import HearPage from "../HearPage/HearPage";
// import SmellPage from "../SmellPage/SmellPage";
// import TastePage from "../TastePage/TastePage";

// import EditSeeItem from "../SeePage/EditSeeItem";

// function VerticalStepsSenses() {
//     const dispatch = useDispatch();
//   const [activeStep, setActiveStep] = useState(0);
//   const [continueFunction, setContinueFunction] = useState(null);
//   const [isEditingSee, setIsEditingSee] = useState(false);
//   const [seeItemToEdit, setSeeItemToEdit] = useState(null);

//   const handleNext = () => {
//     if (continueFunction) {
//       continueFunction();
//     }
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const setStepContinueFunction = (fn) => {
//     setContinueFunction(() => fn);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   useEffect(() => {
//     dispatch({ type: "FETCH_SEE_ITEMS" });
//   }, [dispatch]);

//   const handleEditClick = (seeItem) => {
//     setIsEditingSee(true);
//     setSeeItemToEdit(seeItem);
//   };

//   const handleSaveClick = () => {
//     // Call the function to update the item in the database
//     setIsEditingSee(false); // Switch back to view mode
//   };

//   const handleCancelClick = () => {
//     setIsEditingSee(false); // Switch back to view mode
//   };

//   const steps = [
//     // { label: "What you Saw", description: <SeeList /> },
//     {
//         label: "What you Saw",
//         description: isEditingSee ? (
//           <EditSeeItem seeItem={seeItemToEdit} />
//         ) : (
//           <SeeList onEdit={handleEditClick} />
//         ),
//       },
//     {
//       label: "What can you Touch",
//       description: <TouchPage onContinue={setStepContinueFunction} />,
//     },
//     {
//       label: "What do you Hear",
//       description: <HearPage onContinue={setStepContinueFunction} />,
//     },
//     {
//       label: "What do you Smell",
//       description: <SmellPage onContinue={setStepContinueFunction} />,
//     },
//     {
//       label: "What can you Taste",
//       description: <TastePage onContinue={setStepContinueFunction} />,
//     },
//   ];

//   return (
//     <Box sx={{ maxWidth: 400 }}>
//       <Stepper activeStep={activeStep} orientation="vertical">
//         {steps.map((step, index) => (
//           <Step key={step.label}>
//             <StepLabel>{step.label}</StepLabel>
//             <StepContent>
//               <Typography>{step.description}</Typography>
//               <Box sx={{ mb: 2 }}>
//                 <div>
//                   <Button
//                     variant="contained"
//                     onClick={handleNext}
//                     sx={{ mt: 1, mr: 1 }}
//                   >
//                     {index === steps.length - 1 ? "Finish" : "Continue"}
//                   </Button>
//                   <Button
//                     disabled={index === 0}
//                     onClick={handleBack}
//                     sx={{ mt: 1, mr: 1 }}
//                   >
//                     Back
//                   </Button>
//                 </div>
//               </Box>
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
//     </Box>
//   );
// }

// export default VerticalStepsSenses;
