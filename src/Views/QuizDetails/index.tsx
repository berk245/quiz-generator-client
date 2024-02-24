import DefaultLayout from "../../Layouts/DefaultLayout";
import { Grid } from "@mui/material";
import { InfoSideMenu } from "../../Components/QuizDetails/SideMenu";
import QuizQuestionsSection from "../../Components/QuizDetails/QuizQuestions";

function QuizDetailsView() {
  return (
    <DefaultLayout>
      <Grid container sx={{ height: "100%", minWidth: "50rem" }}>
        <InfoSideMenu />
        <QuizQuestionsSection />
      </Grid>
    </DefaultLayout>
  );
}

export default QuizDetailsView;
