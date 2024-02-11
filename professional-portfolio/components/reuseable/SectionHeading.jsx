export default function SectionHeading(props) {
  return (
    <h1 className="text-center">
      <span className="text-underline">{props.children}</span>
    </h1>
  );
}
