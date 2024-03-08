import { atom, useAtom } from "jotai";

export const stepNamesAtom = atom([
  "Quiz Info",
  "Sources",
  "Keywords & Concepts",
  "Quiz Instructions",
]);

export const activeStepAtom = atom(0);

export const newQuizDataAtom = atom({
  quizTitle: "",
  description: "",
  keywords: [] as string[],
  metaPrompt: "",
  files: [] as File[],
});
