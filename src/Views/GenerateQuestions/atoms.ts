import { atom } from "jotai";
import { QuestionType } from "../../types";

export const generatedQuestionsAtom = atom<QuestionType[]>([]);

export const componentInDisplayAtom = atom("settings"); // Settings or Results
