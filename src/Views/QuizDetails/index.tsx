import { useParams } from "react-router-dom";
import { useGetQuiz } from "../../Api/quizzes";
import DefaultLayout from "../../Layouts/DefaultLayout";
import { Grid } from "@mui/material";
import { InfoSideMenu } from "../../Components/QuizDetails/InfoSideMenu";

function QuizDetailsView() {
  const { quizId } = useParams();

  const { data: quizInfo, isLoading, isError, error } = useGetQuiz({ quizId });

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <DefaultLayout>
      <Grid container sx={{ height: "100%" }}>
        <InfoSideMenu quizInfo={quizInfo} />
        <Grid item xs="auto">
          Right Section
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}

export default QuizDetailsView;
