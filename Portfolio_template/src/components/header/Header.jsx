import "./header.css";
import CTA from "./CTA";
// import Me from "../../Assets/me.png";
import Me from "../../Assets/me.png";
import HeaderSocial from "./HeaderSocial";
import { RevealWrapper } from "next-reveal";

const Header = () => {
  return (
    <RevealWrapper>
      <header>
        <div className="container header__container">
          <h5>Hello I&apos;m</h5>
          <h1>Festus Osayi</h1>
          <h5 className="text-light">Fullstack Developer</h5>
          <CTA />
          <HeaderSocial />

          <div className="me">
            <img src={Me} alt="me" />
          </div>
          <a href="#contact" className="scroll__down">
            Scroll Down
          </a>
        </div>
      </header>
    </RevealWrapper>
  );
};

export default Header;
