import {
  Grid,
  Button,
  Typography,
  Backdrop,
  Alert,
  CircularProgress,
} from "@mui/material";
import { QuizInfoSection } from "./QuizInfoSection";
import { SourcesList } from "./SourcesList";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteQuiz, useGetQuiz } from "../../../Api/quizzes";
import { CheckCircleRounded, DeleteOutline } from "@mui/icons-material";
import LoadingBackdrop from "../../../Ui/LoadingBackdrop";

export const InfoSideMenu = () => {
  const navigator = useNavigate();

  const { quizId } = useParams();

  const { data: quizInfo, isLoading, isError, error } = useGetQuiz({ quizId });

  let {
    mutate: deleteQuiz,
    isPending,
    isSuccess,
    isError: deleteError,
  } = useDeleteQuiz();

  if (isLoading) {
    return <p>Loading</p>;
  }

  const handleDelete = () => {
    const isDeleteConfirmed = window.confirm(
      "This action will delete the quiz and all the related data. Are you sure? "
    );
    if (!isDeleteConfirmed || !quizId) return;
    deleteQuiz(quizId, {
      onSuccess: () => {
        setTimeout(() => {
          navigator("/quizzes");
          isSuccess = false;
        }, 2000);
      },
      onError: () => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
    });
  };

  return (
    <Grid
      item
      xs={4}
      sm={2.25}
      sx={{
        borderRight: "1px solid silver",
        height: "100%",
        width: "100%",
        display: "flex",
        gap: "0.5rem",
        overflow: "hidden",
        flexDirection: "column",
      }}
    >
      <QuizInfoSection quiz={quizInfo?.quiz} />
      <SourcesList sources={quizInfo?.sources} />
      <Button
        variant="outlined"
        color="error"
        title="Delete Quiz"
        onClick={handleDelete}
        sx={{
          width: "100%",
        }}
      >
        <DeleteOutline sx={{ marginRight: "0.5rem" }} />
        <Typography
          variant="subtitle2"
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
            textTransform: "none",
          }}
        >
          Delete Quiz
        </Typography>
      </Button>
      <LoadingBackdrop
        isPending={isPending}
        isSubmitSuccess={isSuccess}
        isError={deleteError}
        successText="Quiz deleted successfully."
        errorText="An error occured while deleting your quiz."
      ></LoadingBackdrop>
    </Grid>
  );
};
