import DefaultLayout from "../../Layouts/DefaultLayout";
import { Grid } from "@mui/material";
import { InfoSideMenu } from "../../Components/QuizDetails/SideMenu";
import QuizQuestionsSection from "../../Components/QuizDetails/QuizQuestions";

function QuizDetailsView() {
  return (
    <DefaultLayout>
      <Grid
        container
        sx={{ height: "100%", minWidth: "50rem" }}
        id="quiz-details-view-container"
      >
        <InfoSideMenu />
        <QuizQuestionsSection />
      </Grid>
    </DefaultLayout>
  );
}

export default QuizDetailsView;
