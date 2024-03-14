import DefaultLayout from "../../Layouts/DefaultLayout";
import { Grid } from "@mui/material";
import { InfoSideMenu } from "../../Components/QuizDetails/SideMenu";
import GenerateQuestionsForm from "../../Components/GenerateQuestionsForm";
import { useAtom, useSetAtom } from "jotai";
import { componentInDisplayAtom, generatedQuestionsAtom } from "./atoms";
import ReviewGeneratedQuestions from "../../Components/ReviewGeneratedQuestions";
import { useEffect } from "react";

function GenerateQuestionsView() {
  const [componentInDisplay, setComponentInDisplay] = useAtom(
    componentInDisplayAtom
  );
  const setGeneratedQuestions = useSetAtom(generatedQuestionsAtom);

  useEffect(() => {
    return () => {
      setGeneratedQuestions([]);
      setComponentInDisplay("settings");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
