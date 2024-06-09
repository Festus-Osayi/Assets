import Layout from "@/components/reuseable/Layout";
import { Container, Row, Col, Button } from 'react-bootstrap'
import { data } from "@/lib/data/data";
import ProjectsCard from "@/components/reuseable/ProjectsCard";
import { useState } from "react";
import Footer from "@/components/reuseable/Footer";
import SectionHeading from "@/components/reuseable/SectionHeading";

export default function ProjectsPage() {
    /** projects states and variables */
    const [itemsToShow, setItemsToShow] = useState(6);



    return (

        <>
            <Layout />
            <article className="container__area">
                <Container fluid='md'>
                    <SectionHeading>Projects</SectionHeading>
                    <Row>

                        {
                            data && data.length > 0 && data.filter((project) => project.id >= 1 && project.id <= itemsToShow).map((value, index) => (
                                <>
                                    <Col lg={4} md={6} className="relative" key={value.id}>
                                        <ProjectsCard {...value} />
                                    </Col>
                                </>
                            ))


                        }
                        {/* Load more */}
                        <div className="d-flex justify-content-center mt-5">
                            <Button
                                onClick={() => {
                                    // Increase the number of items to show
                                    setItemsToShow(itemsToShow + 6);
                                }}
                                className="btn light"
                            >
                                Load More
                            </Button>
                        </div>
                    </Row>
                </Container>
            </article >
            <Footer />
        </>
    )
}

