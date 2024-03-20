import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { newQuizDataAtom } from "../../../../Views/CreateQuiz/atoms";
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
      setKeywordTags([...keywordTags, inputRef.current.value]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordTags]);

  return (
    <Grid container>
      <FormStepTitle>Keywords and Concepts</FormStepTitle>
      <Typography variant="subtitle2">
        (Optional) Provide keywords and key concepts that you want the quiz
        generator to pay special attention to. Press <strong>Enter</strong> to
        add the keyword to your list.
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12}>
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
              borderRadius: "5px",
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
            {keywordTags.length === 0 && (
              <Typography fontSize={"0.75rem"}>
                You don't have any keywords
              </Typography>
            )}
          </Box>

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
              error={newQuizData.keywords.join(",").length > 1000}
            />
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}
