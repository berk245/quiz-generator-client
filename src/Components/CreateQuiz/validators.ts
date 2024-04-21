interface CreateQuizType {
  quizTitle: string;
  description: string;
  keywords: string[];
  learningObjectives: string;
  files: File[];
}

export const validateStep = (step: number, newQuizData: CreateQuizType) => {
  switch (step) {
    case 0:
      return isQuizInfoValid(newQuizData);
    case 1:
      return isFileUploadValid(newQuizData);
    case 2:
      return isLearningObjectivesValid(newQuizData);
    case 3:
      return isKeywordsValid(newQuizData);
    default:
      return { isStepValid: false, errorMessage: "Something went wrong." };
  }
};

const isQuizInfoValid = (newQuiz: CreateQuizType) => {
  let isStepValid = true;
  let errorMessage = "";
  if (!newQuiz.quizTitle) {
    isStepValid = false;
    errorMessage = "Please enter a name for your quiz.";
  } else if (newQuiz.quizTitle.length > 60) {
    isStepValid = false;
    errorMessage = "Quiz title cannot be longer than 60 characters.";
  }
  if (newQuiz.description) {
    if (newQuiz.description.length > 255) {
      isStepValid = false;
      errorMessage = "Quiz description cannot be longer than 255 characters.";
    }
  }
  return { isStepValid, errorMessage };
};

const isFileUploadValid = (newQuiz: CreateQuizType) => {
  let isStepValid = true;
  let errorMessage = "";
  if (!newQuiz.files.length) {
    isStepValid = false;
    errorMessage = "Please select a source for your quiz.";
  }
  return { isStepValid, errorMessage };
};

const isKeywordsValid = (newQuiz: CreateQuizType) => {
  let isStepValid = true;
  let errorMessage = "";
  if (newQuiz.description) {
    if (newQuiz.keywords.join(",").length > 1000) {
      isStepValid = false;
      errorMessage = "Quiz keywords cannot be longer than 1000 characters.";
    }
  }
  return { isStepValid, errorMessage };
};

const isLearningObjectivesValid = (newQuiz: CreateQuizType) => {
  let isStepValid = true;
  let errorMessage = "";
  if (newQuiz.learningObjectives) {
    if (newQuiz.learningObjectives.length > 1000) {
      isStepValid = false;
      errorMessage =
        "Learning objectives cannot be longer than 1000 characters.";
    }
  }
  return { isStepValid, errorMessage };
};
