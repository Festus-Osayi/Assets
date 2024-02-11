export default function TechnicalSkills(props) {
  return (
    <>
      <div className="skill">
        <div className="skill-name">{props.skillName}</div>
        <div className="skill-bar">
          <div
            className="skill-proficiency"
            skillProficiency={props.skillProficiency}
            style={{ maxWidth: props.skillPercent }}
          ></div>
        </div>
      </div>
    </>
  );
}
