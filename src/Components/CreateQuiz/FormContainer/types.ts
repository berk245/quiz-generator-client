export interface FormStepProps {
  handleInputChange?: (
    field: string,
    value: string | File[] | string[]
  ) => void;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
