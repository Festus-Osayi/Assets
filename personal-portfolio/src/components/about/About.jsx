import "./about.css";
import ME from "../../Assets/me-about.jpg";
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";

const About = () => {
  return (
    <section id="about">
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-img">
            <img src={ME} alt="About me" />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Education</h5>
              <small>Seneca College</small>
              <br />
              <small>2022 - 2023</small>
            </article>

            <article className="about__card">
              <FiUsers className="about__icon" />
              <h5>Language</h5>
              <small>Speaks English Fluently</small>
            </article>

            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>10+ Completed</small>
            </article>
          </div>

          <p>
            I am a recent Seneca College computer science graduate with a solid
            foundation in programming languages such as JavaScript and Python.
            Web development enthusiast and am eager to apply my problem-solving skills to produce efficient and user-friendly software solutions. Capable of working cooperatively in a team setting and dedicated to ongoing learning and progress in the field of software development.
          </p>

          <a href="#contact" className="btn btn-primary">
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
