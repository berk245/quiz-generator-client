import { atom } from "jotai";

export const stepNamesAtom = atom([
  "Quiz Info",
  "Sources",
  "Learning Objectives",
  "Keywords & Concepts",
]);

export const activeStepAtom = atom(0);

export const newQuizDataAtom = atom({
  quizTitle: "",
  description: "",
  keywords: [] as string[],
  learningObjectives: "",
  files: [] as File[],
});
