import Layout from "@/components/reuseable/Layout"
import ProjectsCardDetails from "@/components/reuseable/ProjectsCardDetails"
import { data } from "@/lib/data/data"
import { useRouter } from "next/router"
import { Container, Row, Col, Imag, Card, Button } from "react-bootstrap"
export default function ProjectsOverLay() {
    const router = useRouter()




    return (
        <>
            <Container fluid='md'>
                <Row className="mt-0">
                    <Col className="justify-center flex items-center">
                        {data.filter((value) => (
                            value.id === parseInt(router.query.id)
                        )).map((project) => (
                            <ProjectsCardDetails {...project} key={project.id} />
                        ))
                        }

                        <span onClick={() => router.push('/projects')} className="flex cursor-pointer fixed right-0 top-0 text-greyTextColor mr-5 font-bold text-xl p-3 hover:text-headingColor transition-all duration-200 ease-in-out">X</span>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

