import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { newQuizDataAtom } from "../../../Views/CreateQuiz/atoms";
import { Box } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { KeywordTag } from "./KeywordTag";

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
  }, [keywordTags]);

  return (
    <Grid container>
      <Typography variant="h6" gutterBottom mb={3}>
        Keywords and Concepts
      </Typography>

      <Grid container spacing={5}>
        <Grid item xs={12} sm={12}>
          <form onSubmit={handleOnSubmit}>
            <TextField
              inputRef={inputRef}
              fullWidth
              variant="standard"
              size="medium"
              sx={{ lineHeight: "2rem", overflow: "auto" }}
              placeholder="Enter keywords here"
              InputProps={{
                startAdornment: (
                  <Box
                    sx={{
                      margin: "0.5rem 0",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem 0",
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
                ),
              }}
            />
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}
