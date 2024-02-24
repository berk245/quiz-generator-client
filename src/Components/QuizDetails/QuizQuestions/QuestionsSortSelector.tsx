import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface SortBySelectorProps {
  handleSortChange: (e: SelectChangeEvent) => void;
  sortValue: string;
  className?: string;
}

export const QuestionSortSelect = ({
  handleSortChange,
  sortValue,
  className,
}: SortBySelectorProps) => {
  return (
    <FormControl className={className}>
      <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        onChange={(e) => handleSortChange(e)}
        value={sortValue}
        size="small"
        sx={{ fontSize: "0.85rem", height: "100%" }}
      >
        <MenuItem value={"Date (new-old)"}>Date (new-old)</MenuItem>
        <MenuItem value="Date (old-new)">Date (old-new)</MenuItem>
      </Select>
    </FormControl>
  );
};
