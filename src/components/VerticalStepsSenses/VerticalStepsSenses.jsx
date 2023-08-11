import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import SeeList from "../SeePage/SeeList";
import TouchPage from "../TouchPage/TouchPage";
import HearPage from "../HearPage/HearPage";
import SmellPage from "../SmellPage/SmellPage";
import TastePage from "../TastePage/TastePage";

import EditSeeItem from "../SeePage/EditSeeItem";

function VerticalStepsSenses() {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [continueFunction, setContinueFunction] = useState(null);
  const [isEditingSee, setIsEditingSee] = useState(false);
  const [seeItemToEdit, setSeeItemToEdit] = useState(null);

  const handleNext = () => {
    if (continueFunction) {
      continueFunction();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
    // dispatch an action that is being listened for by a saga
    dispatch({ type: "SUBMIT_EDIT_SEE_ITEM", payload: seeItemToEdit });
    setIsEditingSee(false); // Switch back to view mode
  };

  const handleCancelClick = () => {
    setIsEditingSee(false); // Switch back to view mode
  };

  const steps = [
    {
      label: "What you Saw",
      description: isEditingSee ? (
        <EditSeeItem seeItem={seeItemToEdit} setSeeItemToEdit={setSeeItemToEdit} />
      ) : (
        <SeeList onEdit={handleEditClick} />
      ),
    },
    {
      label: "What can you Touch",
      description: <TouchPage onContinue={setStepContinueFunction} />,
    },
    {
      label: "What do you Hear",
      description: <HearPage onContinue={setStepContinueFunction} />,
    },
    {
      label: "What do you Smell",
      description: <SmellPage onContinue={setStepContinueFunction} />,
    },
    {
      label: "What can you Taste",
      description: <TastePage onContinue={setStepContinueFunction} />,
    },
  ];

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  {isEditingSee && index === 0 ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={handleSaveClick}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleCancelClick}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => handleEditClick(someSeeItem)}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Finish" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </>
                  )}
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default VerticalStepsSenses;

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
