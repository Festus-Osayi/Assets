import "./about.css";
// import ME from "../../Assets/me-about.jpg";
import ME from "../../Assets/me-about.jpg";
// import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";
import { useSpring, animated } from "react-spring";
import { FaGraduationCap } from "react-icons/fa";

const About = () => {
  const animation = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(-50px)" },
  });
  return (
    <animated.section id="about" style={animation}>
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
              <FaGraduationCap className="about__icon" />
              <h5>Education</h5>
              <small>
                Seneca College <br /> 2022 - 2023
              </small>
            </article>

            <article className="about__card">
              <FiUsers className="about__icon" />
              <h5>Language</h5>
              <small>English - fluently</small>
            </article>

            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>10+ Completed</small>
            </article>
          </div>

          <p>
            Hello there! I am Festus Osayi. Recent graduate with a strong
            academic background in web development and database design.
            Proficient in JavaScript, Python, and experienced in working with
            databases such as Oracle, PostgreSQL, and MongoDB. Known for strong
            attention to detail and ability to thrive in collaborative team
            environments. Eager to leverage my technical and analytical skills
            to contribute to a dynamic team.
          </p>

          <a href="#contact" className="btn btn-primary">
            Let&lsquo;s Talk
          </a>
        </div>
      </div>
    </animated.section>
  );
};

export default About;
