import { RevealWrapper } from "next-reveal";
import "./experience.css";
import { BsFillPatchCheckFill } from "react-icons/bs";

const Experience = () => {
  return (
    <RevealWrapper delay={0}>
      <section id="experience">
        <h5>The Skills I have</h5>
        <h2>My Experience</h2>
        <div className="container experience__container">
          <div className="experience__frontend">
            <h3>Frontend Development</h3>
            <div className="experience__content">
              <article className="experience__details">
                <BsFillPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>HTML</h4>
                  <small className="text-light">Experienced</small>
                </div>
              </article>

              <article className="experience__details">
                <BsFillPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>CSS</h4>
                  <small className="text-light">Experienced</small>
                </div>
              </article>

              <article className="experience__details">
                <BsFillPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>JavaScript</h4>
                  <small className="text-light">Experienced</small>
                </div>
              </article>

              <article className="experience__details">
                <BsFillPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>Bootstrap</h4>
                  <small className="text-light">Experienced</small>
                </div>
              </article>

              <article className="experience__details">
                <BsFillPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>React</h4>
                  <small className="text-light">Experienced</small>
                </div>
              </article>

              <article className="experience__details">
                <BsFillPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>Tailwind</h4>
                  <small className="text-light">Experienced</small>
                </div>
              </article>
            </div>
          </div>

          {/* end of frontend */}

          <div className="experience__backend">
            <h3>Backend Development</h3>
            <div className="experience__content">
              <article className="experience__details">
                <BsFillPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>Node Js</h4>
                  <small className="text-light">Experienced</small>
                </div>
              </article>

              <article className="experience__details">
                <BsFillPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>MongoDb</h4>
                  <small className="text-light">Experienced</small>
                </div>
              </article>

              <article className="experience__details">
                <BsFillPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>Sequelize</h4>
                  <small className="text-light">Experienced</small>
                </div>
              </article>

              <article className="experience__details">
                <BsFillPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>Postgres</h4>
                  <small className="text-light">Experienced</small>
                </div>
              </article>

              <article className="experience__details">
                <BsFillPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>Python</h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </article>

              <article className="experience__details">
                <BsFillPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>Javascript</h4>
                  <small className="text-light">Experienced</small>
                </div>
              </article>
            </div>
          </div>
          {/* end of backend */}
        </div>
      </section>
    </RevealWrapper>
  );
};

export default Experience;
