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

export const SortBySelector = ({
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
      >
        <MenuItem value="Date (ascending)">Date (ascending)</MenuItem>
        <MenuItem value={"Date (descending)"}>Date (descending)</MenuItem>
        <MenuItem value={"Name (a -z)"}>Name (a-z)</MenuItem>
        <MenuItem value={"Name (z -a)"}>Name (z-a)</MenuItem>
      </Select>
    </FormControl>
  );
};
