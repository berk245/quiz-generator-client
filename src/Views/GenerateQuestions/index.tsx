import DefaultLayout from "../../Layouts/DefaultLayout";
import { Grid } from "@mui/material";
import { InfoSideMenu } from "../../Components/QuizDetails/SideMenu";
import GenerateQuestionsForm from "../../Components/GenerateQuestionsForm";
import { useAtom } from "jotai";
import { componentInDisplayAtom } from "./atoms";

function GenerateQuestionsView() {
  const [componentInDisplay] = useAtom(componentInDisplayAtom);

  return (
    <DefaultLayout>
      <Grid container sx={{ height: "100%", minWidth: "50rem" }}>
        <InfoSideMenu />
        {componentInDisplay === "settings" ? (
          <GenerateQuestionsForm />
        ) : (
          // Results
          <p>dsa</p>
        )}
      </Grid>
    </DefaultLayout>
  );
}

export default GenerateQuestionsView;
