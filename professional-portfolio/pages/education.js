import Footer from "@/components/reuseable/Footer";
import Layout from "@/components/reuseable/Layout";
import { Container, Row, Col } from 'react-bootstrap'
import { HiAcademicCap } from "react-icons/hi";
import { FaSchool } from "react-icons/fa";
import SectionHeading from "@/components/reuseable/SectionHeading";

export default function EducationPage() {
    return (
        <>
            <Layout />
            {/* My education and Experience */}
            <section className="education__section container__area">
                <Container>
                    <SectionHeading>
                        Education
                    </SectionHeading>
                    <Row>
                        {/* Education description */}
                        <Col lg={6}>
                            <div className='flex items-center gap-4 mb-5'>
                                <FaSchool className="text-gray-600 text-5xl" />
                                <h1 className="text-white text-4xl">Life in College</h1>
                            </div>
                            <p className="text-greyTextColor">My four semesters at Seneca College have equipped me with comprehensive knowledge in web development, data structures, and object-oriented programming. It was a dynamic journey, involving academic exploration, hands-on projects, collaboration in team settings, engagement in extracurricular activities such as the Seneca Science & Technology Guild and Board Game Club, personal growth experiences, and networking opportunities. These experiences have collectively contributed to the establishment of a robust foundation for my career aspirations in software and full-stack development.</p>
                        </Col>
                        {/* End of my education description */}

                        {/* My educational background */}
                        <Col lg={6} className="mb-5">
                            <div className='flex items-center gap-4 mb-5'>
                                <HiAcademicCap className="text-gray-600 text-5xl" />
                                <h1 className="text-white text-4xl">Education</h1>
                            </div>
                            <div className="first__col ml-5">
                                <div className="ml-8">
                                    <h2 className="text-2xl font-medium">Diploma in Computer Science</h2>
                                    <small className="text-greyTextColor font-bold text-lg">May 2022 - August 2023</small>
                                    <h3 className="my-3 text-white text-lg font-medium">Seneca College, Toronto</h3>
                                    <p className="text-greyTextColor">My educational background equipped me with skills in mobile development, software testing, web development, distributed programming techniques and database administration.</p>

                                </div>
                            </div>
                            {/* End of my educational background */}
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

