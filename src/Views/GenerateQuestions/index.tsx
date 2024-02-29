import DefaultLayout from "../../Layouts/DefaultLayout";
import { Grid } from "@mui/material";
import { InfoSideMenu } from "../../Components/QuizDetails/SideMenu";
import GenerateQuestionsForm from "../../Components/GenerateQuestionsForm";
import { useAtom } from "jotai";
import { componentInDisplayAtom } from "./atoms";
import ReviewGeneratedQuestions from "../../Components/ReviewGeneratedQuestions";

function GenerateQuestionsView() {
  const [componentInDisplay] = useAtom(componentInDisplayAtom);

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
