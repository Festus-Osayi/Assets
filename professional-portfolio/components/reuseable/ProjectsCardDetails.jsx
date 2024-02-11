import { data } from "@/lib/data/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { FaArrowRightFromBracket, FaGithub } from "react-icons/fa6";
export default function ProjectsCardDetails(props) {
  return (
    <>
      <Card
        style={{ width: "50rem" }}
        className="text-greyTextColor"
        key={props.id}
      >
        <Card.Img variant="top" src={props.image} alt={props.title} />
        <Card.Body className="">
          <Card.Title className="text-white text-2xl">{props.title}</Card.Title>
          <Card.Text>{props.text}</Card.Text>
          {/* technologies */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
            {props.technologies &&
              props.technologies.length > 0 &&
              props.technologies.map((technology, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center technologies whitespace-nowrap overflow-hidden"
                >
                  <span>{technology}</span>
                </div>
              ))}
          </div>
          {/* web link and github url */}
          <div className="flex gap-3 items-center mt-3">
            <a
              href={props.webUrl}
              className="btn light"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaArrowRightFromBracket className="text-xl" />
            </a>
            <a
              href={props.githubUrl}
              className="btn light"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-xl" />
            </a>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
