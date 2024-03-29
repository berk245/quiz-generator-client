import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { newQuizDataAtom } from "../../../../Views/CreateQuiz/atoms";
import { Alert, Button } from "@mui/material";
import { CloudUpload, HighlightOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Flex from "../../../../Ui/Flex";
import FormStepTitle from "./FormStepTitle";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function SourceUploadForm() {
  const [newQuizData, setNewQuizData] = useAtom(newQuizDataAtom);

  const handleChange = (e: any) => {
    if (e.target.files[0].size > 19999000) {
      alert("File exceeds the size limit.");
      e.target.value = null;
      return;
    }
    setNewQuizData({
      ...newQuizData,
      files: [e.target.files[0]],
    });
    e.target.value = null;
  };

  const removeSelectedFile = (file: File) => {
    const newArr = newQuizData.files.filter((item) => item !== file);
    setNewQuizData({
      ...newQuizData,
      files: newArr,
    });
  };

  return (
    <Grid container>
      <FormStepTitle>Upload Source</FormStepTitle>
      <Typography variant="subtitle2" mb={3}>
        Upload a file to generate quiz questions from. Note: The application
        currently supports only <strong>PDF</strong> format.
        <br />
        (Max file size: 20MB)
      </Typography>
      <Alert severity="warning" sx={{ width: "100%", marginBottom: "1rem" }}>
        Please do not upload any confidential or sensitive data.
      </Alert>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Button
            component="label"
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUpload />}
            fullWidth
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              onChange={handleChange}
              accept="application/pdf"
            />
          </Button>
        </Grid>
        <SelectedFilesBox
          files={newQuizData.files}
          removeSelectedFile={removeSelectedFile}
        />
      </Grid>
    </Grid>
  );
}

const SelectedFilesBox = ({
  files,
  removeSelectedFile,
}: {
  files: File[];
  removeSelectedFile: (file: File) => void;
}) => {
  return (
    <Grid item xs={12} sm={12}>
      {files.length > 0 && (
        <>
          <Typography variant="subtitle1" fontWeight={600}>
            Selected File
          </Typography>
          {files.map((file, index) => {
            return (
              <Flex dir="row" className="flex-items-center" key={index}>
                <span>
                  {index + 1} . {file.name}
                </span>
                <Button
                  variant="text"
                  startIcon={<HighlightOff />}
                  onClick={() => removeSelectedFile(file)}
                  sx={{
                    padding: "initial 0",
                    marginLeft: "1rem",
                  }}
                ></Button>
              </Flex>
            );
          })}
        </>
      )}
    </Grid>
  );
};
