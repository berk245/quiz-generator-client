import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const quizCreationSteps = [
  "Setting things up",
  "Transferring data",
  "Compiling quiz information",
  "Analyzing teaching material",
  "Adding keywords and quiz instructions",
  "Creating quiz",
];

export const LoadingBackdrop = ({ isPending }: { isPending: boolean }) => {
  const [loadingText, setLoadingText] = useState(quizCreationSteps[0]);

  useEffect(() => {
    let counter = 1;
    const interval = setInterval(() => {
      if (counter === quizCreationSteps.length) {
        clearInterval(interval);
        return;
      }
      setLoadingText(quizCreationSteps[counter]);
      counter++;
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: "column",
      }}
      open={isPending}
    >
      <CircularProgress color="inherit" />
      <br />
      <span>{loadingText}</span>
    </Backdrop>
  );
};
