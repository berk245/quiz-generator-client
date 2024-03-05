export interface QuizType {
  quiz_id: string;
  quiz_title: string;
  quiz_description: string;
  keywords: string;
  meta_prompt: string;
  created_at: Date;
  is_active: boolean;
}

export interface QuestionType {
  question_id: string;
  instructions: string;
  question_type: string;
  question_text: string;
  multiple_choices: string;
  correct_answer: string;
  difficulty: string;
  score: string;
  created_at: string;
}
