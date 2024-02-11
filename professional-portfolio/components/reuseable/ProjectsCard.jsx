import { Image } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/router";
export default function ProjectsCard(props) {
  const router = useRouter();
  
  return (
    <>
      <div
        className="outer__div cursor-pointer"
        onClick={() => router.push(`/projects/${props.id}`)}
      >
        <Image
          src={props.image}
          alt="blog post"
          className="rounded-md w-[500px] h-[250px] object-cover bg-no-repeat"
          fluid
        />
        <div className="hidden">
          <div className="inner__div flex-col">
            <span className="bg-headingColor p-3 rounded-[50%] flex items-center justify-center mb-4">
              <FaPlusCircle className="text-black text-2xl" />
            </span>

            <h1 className="text-[#9CA] mt-4 font-bold text-2xl">
              {props.title}
            </h1>
            <p className="mb-3 text-[#1e2f62] text-xl">{props.category}</p>
          </div>
        </div>
      </div>
    </>
  );
}
