import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import NotesIcon from "@mui/icons-material/Notes";

import TouchPage from "../TouchPage/TouchPage";
import HearPage from "../HearPage/HearPage";
import SmellPage from "../SmellPage/SmellPage";
import TastePage from "../TastePage/TastePage";

const steps = [
  // TODO: PULL IN SEE-INPUTS FROM THE SQL DATABASE
  {
    label: "What do you See",
    description: "import data",
  },
  {
    label: "What can you Touch",
    description: <TouchPage />,
  },
  {
    label: "What do you Hear",
    description: <HearPage />,
  },
  {
    label: "What do you Smell",
    description: <SmellPage />,
  },
  {
    label: "What can you Taste",
    description: <TastePage />,
  },
];

function VerticalStepsSenses() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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

// return (
//     <Box sx={{ maxWidth: 400 }}>
//         <Stepper activeStep={activeStep} orientation="vertical">
//             {steps.map((step, index) => (
//                 <Step key={step.label}>
//                     <StepLabel
//                         optional={
//                             index === 4 ? (
//                                 <Typography variant="caption">Last step</Typography>
//                             ) : null
//                         }
//                     >
//                         {step.label}
//                     </StepLabel>
//                     <StepContent>
//                         <Typography>{step.description}</Typography>
//                         <Box sx={{ mb: 2 }}>
//                             <div>
//                                 <Button
//                                     variant="contained"
//                                     onClick={handleNext}
//                                     sx={{ mt: 1, mr: 1 }}
//                                 >
//                                     {index === steps.length - 1 ? 'Finish' : 'Continue'}
//                                 </Button>
//                                 <Button
//                                     disabled={index === 0}
//                                     onClick={handleBack}
//                                     sx={{ mt: 1, mr: 1 }}>
//                                     Back
//                                 </Button>
//                             </div>
//                         </Box>
//                     </StepContent>
//                 </Step>
//             ))}
//         </Stepper>
//         {activeStep === steps.length && (
//             <Paper square elevation={0} sx={{ p: 3 }}>
//                 <Typography>All steps completed - you&apos;re finished</Typography>
//                 <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
//                     Reset
//                 </Button>
//             </Paper>
//         )}
//     </Box>
// );
