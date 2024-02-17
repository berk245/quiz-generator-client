import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { newQuizDataAtom } from "../../../Views/CreateQuiz/atoms";
import { Box } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { KeywordTag } from "./KeywordTag";
import FormStepTitle from "./FormStepTitle";

export default function KeywordsForm() {
  const [newQuizData, setNewQuizData] = useAtom(newQuizDataAtom);
  const [keywordTags, setKeywordTags] = useState<string[]>(
    newQuizData.keywords
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnSubmit = (e: any) => {
    if (inputRef.current) {
      e.preventDefault();
      setKeywordTags([inputRef.current.value, ...keywordTags]);
      inputRef.current.value = "";
    }
  };

  const handleTagDelete = (value: string) => {
    const newtags = keywordTags.filter((val) => val !== value);
    setKeywordTags(newtags);
  };

  useEffect(() => {
    setNewQuizData({
      ...newQuizData,
      keywords: [...keywordTags],
    });
  }, [keywordTags]);

  return (
    <Grid container>
      <FormStepTitle>Keywords and Concepts</FormStepTitle>
      <Typography variant="subtitle2">
        Provide keywords and key concepts that you want the quiz generator to
        pay special attention on.
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12}>
          {keywordTags.length > 0 && (
            <Box
              maxHeight={"5rem"}
              overflow={"auto"}
              sx={{
                margin: "1rem 0",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "0.5rem 0",
                border: "1px solid #ebebeb",
                padding: "1rem",
              }}
            >
              {keywordTags.map((tag, index) => {
                return (
                  <KeywordTag
                    tagName={tag}
                    key={index}
                    handleTagDelete={handleTagDelete}
                  />
                );
              })}
            </Box>
          )}

          <form onSubmit={handleOnSubmit}>
            <TextField
              inputRef={inputRef}
              fullWidth
              variant="standard"
              size="small"
              sx={{
                lineHeight: "2rem",
                overflow: "auto",
                marginTop: "1rem",
              }}
              placeholder="Enter keywords here and press Enter"
            />
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}
