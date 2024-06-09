import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import {FaTwitter} from 'react-icons/fa'

function HeaderSocial() {
  return (
    <div className="header__social">
      <a
        href="https://www.linkedin.com/in/festus-osayi"
        target="_blank"
        rel="noreferrer"
      >
        <BsLinkedin />
      </a>
      <a
        href="https://github.com/Festus-Osayi"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub />
      </a>

      <a
        href="https://twitter.com/Festus_Osayi29"
        target="_blank"
        rel="noreferrer"
      ><FaTwitter/></a>
    </div>
  );
}

export default HeaderSocial