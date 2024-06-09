import RESUME from "../../Assets/Festus_Osayi_Resume.pdf";
import { RevealWrapper } from "next-reveal";

function CTAPage() {
  return (
    <RevealWrapper>
      <div className="cta">
        <a href={RESUME} download className="btn">
          Download Resume
        </a>
        <a href="#contact" className="btn btn-primary">
          Contact me
        </a>
      </div>
    </RevealWrapper>
  );
}

export default CTAPage;
