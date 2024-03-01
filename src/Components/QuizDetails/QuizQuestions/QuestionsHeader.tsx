import { Grid, Typography, Button } from "@mui/material";
import React from "react";
import { GetApp, AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const QuestionsHeader = ({ children }: React.PropsWithChildren) => {
  return (
    <Grid
      container
      direction="row"
      sx={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={5}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: { xs: "0.75rem", lg: "1.25rem" },
        }}
        alignItems="center"
      >
        <Typography sx={{ fontSize: { xs: "1.25rem", lg: "1.5rem" } }}>
          Questions
        </Typography>
        <Link to="generate">
          <Button variant="contained">
            <AddCircle sx={{ marginRight: "0.5rem" }} />
            <Typography
              variant="subtitle2"
              sx={{
                display: { xs: "none", lg: "block" },
                textTransform: "none",
              }}
            >
              Generate Questions
            </Typography>
          </Button>
        </Link>
      </Grid>

      <Grid
        item
        xs={7}
        justifyContent="flex-end"
        sx={{
          flexDirection: "row",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Button variant="outlined" title="Export questions to CSV">
          <GetApp sx={{ marginRight: "0.5rem" }} />
          <Typography
            variant="subtitle2"
            sx={{ display: { xs: "none", lg: "block" }, textTransform: "none" }}
          >
            Export to CSV
          </Typography>
        </Button>
        {children}
      </Grid>
    </Grid>
  );
};
