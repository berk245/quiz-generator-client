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
    <Link to={`/quizzes/${quiz.id}`} className="quiz-box-link">
      <Flex className="quiz-box flex-items-center" dir="row">
        <CalculateOutlined />
        <Flex className="quiz-box-text" dir="column">
          <h4>{quiz.quiz_title}</h4>
          <span className="quiz-box-description">{quiz.quiz_description}</span>
        </Flex>
      </Flex>
    </Link>
  );
}

export default SingleQuizBox;
