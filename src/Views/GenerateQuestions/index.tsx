import DefaultLayout from "../../Layouts/DefaultLayout";
import { Grid } from "@mui/material";
import { InfoSideMenu } from "../../Components/QuizDetails/SideMenu";
import GenerateQuestionsForm from "../../Components/GenerateQuestionsForm";
import { useAtom } from "jotai";
import { componentInDisplayAtom, generatedQuestionsAtom } from "./atoms";
import ReviewGeneratedQuestions from "../../Components/ReviewGeneratedQuestions";
import { useEffect } from "react";

function GenerateQuestionsView() {
  const [componentInDisplay, setComponentInDisplay] = useAtom(
    componentInDisplayAtom
  );
  const [_, setGeneratedQuestions] = useAtom(generatedQuestionsAtom);

  useEffect(() => {
    return () => {
      setGeneratedQuestions([]);
      setComponentInDisplay("settings");
    };
  }, []);

  return (
    <DefaultLayout>
      <Grid container sx={{ height: "100%", minWidth: "50rem" }}>
        <InfoSideMenu />
        {componentInDisplay === "settings" ? (
          <GenerateQuestionsForm />
        ) : (
          <ReviewGeneratedQuestions />
        )}
      </Grid>
    </DefaultLayout>
  );
}

export default GenerateQuestionsView;
