import "./footer.css"
import { FaGithub, FaTwitter } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";


const footer = () => {
  return (
    <footer>
      <a href="#" className="footer__logo">
        Festus Osayi
      </a>
      <ul className="permalink">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#experience">Experience</a>
        </li>
        <li>
          <a href="#portfolio">Portfolio</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <div className="footer__socials">
        <a
          href="https://github.com/Festus-Osayi"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/festus-osayi-6aba84221/"
          target="_blank"
          rel="noreferrer"
        >
          <BsLinkedin />
        </a>
        <a
          href="https://twitter.com/Festus_Osayi29"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter />
        </a>
      </div>

      <div className="footer__copyright">
        <small>&copy; Festus Osayi - 2023. All right reserved.</small>
      </div>
    </footer>
  );
}

export default footer