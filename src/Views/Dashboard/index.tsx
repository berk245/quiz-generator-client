import { Button, Link } from "@mui/material";
import DefaultLayout from "../../Layouts/DefaultLayout";
import Flex from "../../Ui/Flex";

import "./dashboard-view.css";
function Dashboard() {
  return (
    <DefaultLayout>
      <Flex className="dashboard-view-container" dir="row">
        <Flex className="dashboard-view-quick-links" dir="column">
          <Link className="dashboard-quick-link" href="/quizzes/new">
            <Button variant="outlined">Create a New Quiz</Button>
          </Link>
          <Link className="dashboard-quick-link" href="/quizzes">
            <Button variant="outlined">View Your Quizzes</Button>
          </Link>
        </Flex>
        <Flex className="dashboard-view-stats-section" dir="column">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            delectus, earum quisquam inventore, iusto dolore quo ex aliquid, nam
            ab facilis. Molestias ipsum rem nobis debitis aspernatur tenetur
            assumenda sequi?
          </span>

          <p>
            Considering that I might not have document uploads in the first
            iteration, The quick links on this section is not so important.
            Also, generate new questions might not make too much sense, as there
            is no specific route for it. Maybe I can just add some stats here.
          </p>

          <p> Quizzes Created: 123 (See your Quizzes) (Create New)</p>
          <p> Questions Generated: 1300 (Accepted : 1200 / Rejected: 100) </p>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}

export default Dashboard;
