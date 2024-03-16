import { CalculateOutlined } from "@mui/icons-material";
import Flex from "../../../Ui/Flex";
import { QuizType } from "../../../types";
import "./quiz-box.css";
import { Link } from "react-router-dom";

interface SingleQuizBoxProps {
  quiz: QuizType;
}

function SingleQuizBox({ quiz }: SingleQuizBoxProps) {
  return (
    <Link
      to={`/quizzes/${quiz.quiz_id}`}
      className="quiz-box"
      data-testid="quiz-box"
    >
      <Flex className="quiz-box-text" dir="column">
        <Flex className="quiz-box-title-line flex-items-center">
          <CalculateOutlined />
          <h4>{quiz.quiz_title}</h4>
        </Flex>
        <span className="quiz-box-description">{quiz.quiz_description}</span>
      </Flex>
    </Link>
  );
}

export default SingleQuizBox;
