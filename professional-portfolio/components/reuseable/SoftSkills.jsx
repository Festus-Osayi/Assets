import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Col } from "react-bootstrap";

// Animations
import ChangingProgressProvider from "@/components/reuseable/ChangingProgressProvider";

export default function SoftSkills(props) {
  return (
    <>
      <div className="mt-0 flex flex-wrap">
        <Col lg={4} md={4} xs={6} sm={6} className="mb-4 ">
          <div
            style={{ width: 120, height: 120 }}
            className="flex flex-col justify-center items-center"
          >
            <ChangingProgressProvider values={props.value}>
              {(percentage) => (
                <CircularProgressbar value={percentage} text={props.text} />
              )}
            </ChangingProgressProvider>
            <p className="text-[#A9ADB8]">{props.skill}</p>
          </div>
        </Col>
      </div>
    </>
  );
}
