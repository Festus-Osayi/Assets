import "./footer.css";
import { BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";

const footer = () => {
  return (
    <footer>
      <a href="#" className="footer__logo">
        Festus Osayi
      </a>
      <ul className="permalinks">
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
      {/* socials */}
      <div className="footer__socials">
        <a
          href="https://www.linkedin.com/in/festus-osayi/"
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
          <BsTwitter />
        </a>
        <a
          href="https://github.com/Festus-Osayi"
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub />
        </a>
      </div>
      <div className="footer__copyright">
        <small>&copy; Festus Osayi 2023. All right reserved.</small>
      </div>
    </footer>
  );
};

export default footer;
