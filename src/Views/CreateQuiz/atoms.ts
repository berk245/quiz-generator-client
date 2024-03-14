import { atom } from "jotai";

export const stepNamesAtom = atom([
  "Quiz Info",
  "Sources",
  "Keywords & Concepts",
  "Quiz Level Instructions",
]);

export const activeStepAtom = atom(0);

export const newQuizDataAtom = atom({
  quizTitle: "",
  description: "",
  keywords: [] as string[],
  metaPrompt: "",
  files: [] as File[],
});
