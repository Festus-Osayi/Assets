import Footer from "@/components/reuseable/Footer";
import Layout from "@/components/reuseable/Layout";
import SectionHeading from "@/components/reuseable/SectionHeading";
import { Container, Row, Col, Card } from 'react-bootstrap'

export default function ServicesPage() {
    return (
        <>
            <Layout />
            <section className="container__area">
                <Container fluid='md'>
                    <SectionHeading>Services</SectionHeading>
                    {/* fullstack services */}

                    <Row>
                        {/* start of frontend Development */}
                        <Col lg={4} md={6}>
                            <Card className="xl:w-[22rem] xl:h-[22.23rem] mb-5">
                                <div className="bg-[#070F1A] p-3 rounded-[50%] cards">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="svg"
                                    >
                                        <path d="M21 16V4H3v12h18m0-14a2 2 0 012 2v12a2 2 0 01-2 2h-7v2h2v2H8v-2h2v-2H3a2 2 0 01-2-2V4c0-1.11.89-2 2-2h18M5 6h9v5H5V6m10 0h4v2h-4V6m4 3v5h-4V9h4M5 12h4v2H5v-2m5 0h4v2h-4v-2z" />
                                    </svg>
                                </div>
                                <Card.Body>
                                    <Card.Title className="text-center text-white">Frontend Development</Card.Title>
                                    <Card.Text className="text-greyTextColor text-center">
                                        Possess skills in crafting responsive and user friendly websites using HTML, CSS, JavaScript(ReactJS), Bootstrap, TailwindCSS, jQuery
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            {/* end of Frontend development */}
                        </Col>

                        {/* start of Backend Development */}
                        <Col lg={4} md={6}>
                            <Card className="xl:w-[22rem] xl:h-[22.23rem] mb-5">
                                <div className="bg-[#070F1A] p-3 rounded-[50%] cards">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                        className="svg"
                                    >
                                        <path d="M21 5 A9 3 0 0 1 12 8 A9 3 0 0 1 3 5 A9 3 0 0 1 21 5 z" />
                                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                                    </svg>
                                </div>
                                <Card.Body>
                                    <Card.Title className="text-center text-white">Backend Development</Card.Title>
                                    <Card.Text className="text-greyTextColor text-center">
                                        Expert in server-side logic, databases, and application architecture for seamless functionality and efficient data management.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            {/* end of backend Development */}
                        </Col>

                        {/* start of fullstack development */}
                        <Col lg={4} md={6}>
                            <Card className="xl:w-[22rem] xl:h-[22.23rem] mb-5">
                                <div className="bg-[#070F1A] p-3 rounded-[50%] cards">
                                    <svg
                                        data-name="Layer 1"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="svg"
                                    >
                                        <path d="M15 17a1 1 0 101 1 1 1 0 00-1-1zm-4 0H9a1 1 0 000 2h2a1 1 0 000-2zm0-6H9a1 1 0 000 2h2a1 1 0 000-2zm4 0a1 1 0 101 1 1 1 0 00-1-1zm8-3a3 3 0 00-3-3h-1a3 3 0 00-3-3H8a3 3 0 00-3 3H4a3 3 0 00-3 3v2a3 3 0 00.78 2A3 3 0 001 14v2a3 3 0 003 3h1a3 3 0 003 3h8a3 3 0 003-3h1a3 3 0 003-3v-2a3 3 0 00-.78-2 3 3 0 00.78-2zM5 17H4a1 1 0 01-1-1v-2a1 1 0 011-1h1a3 3 0 00.78 2A3 3 0 005 17zm0-6H4a1 1 0 01-1-1V8a1 1 0 011-1h1a3 3 0 00.78 2A3 3 0 005 11zm12 8a1 1 0 01-1 1H8a1 1 0 01-1-1v-2a1 1 0 011-1h8a1 1 0 011 1zm0-6a1 1 0 01-1 1H8a1 1 0 01-1-1v-2a1 1 0 011-1h8a1 1 0 011 1zm0-6a1 1 0 01-1 1H8a1 1 0 01-1-1V5a1 1 0 011-1h8a1 1 0 011 1zm4 9a1 1 0 01-1 1h-1a3 3 0 00-.78-2 3 3 0 00.78-2h1a1 1 0 011 1zm0-6a1 1 0 01-1 1h-1a3 3 0 00-.78-2A3 3 0 0019 7h1a1 1 0 011 1zm-6-5a1 1 0 101 1 1 1 0 00-1-1zm-4 0H9a1 1 0 000 2h2a1 1 0 000-2z" />
                                    </svg>
                                </div>
                                <Card.Body>
                                    <Card.Title className="text-center text-white">Fullstack Development</Card.Title>
                                    <Card.Text className="text-greyTextColor text-center">
                                        Proficient in frontend and backend technologies, adept at UI design, feature implementation, and database management.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            {/* end of fullstack services */}
                        </Col>

                        {/* start of UI/UX design and software testing */}
                        <Col lg={4} md={6}>
                            <Card className="xl:w-[22rem] xl:h-[22.23rem] mb-5">
                                <div className="bg-[#070F1A] p-3 rounded-[50%] cards">
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        className="svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11 1H5a1 1 0 00-1 1v6a.5.5 0 01-1 0V2a2 2 0 012-2h6a2 2 0 012 2v6a.5.5 0 01-1 0V2a1 1 0 00-1-1zm1 13a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a.5.5 0 00-1 0v2a2 2 0 002 2h6a2 2 0 002-2v-2a.5.5 0 00-1 0v2zM1.713 7.954a.5.5 0 10-.419-.908c-.347.16-.654.348-.882.57C.184 7.842 0 8.139 0 8.5c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 10.773 5.898 11 8 11c.099 0 .197 0 .294-.002l-1.148 1.148a.5.5 0 00.708.708l2-2a.5.5 0 000-.708l-2-2a.5.5 0 10-.708.708l1.145 1.144L8 10c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 8.639 1 8.506 1 8.5c0-.003 0-.059.112-.17.115-.112.31-.242.6-.376zm12.993-.908a.5.5 0 00-.419.908c.292.134.486.264.6.377.113.11.113.166.113.169 0 .003 0 .065-.13.187-.132.122-.352.26-.677.4-.645.28-1.596.523-2.763.687a.5.5 0 00.14.99c1.212-.17 2.26-.43 3.02-.758.38-.164.713-.357.96-.587.246-.229.45-.537.45-.919 0-.362-.184-.66-.412-.883-.228-.223-.535-.411-.882-.571zM7.5 2a.5.5 0 000 1h1a.5.5 0 000-1h-1z"
                                        />
                                    </svg>
                                </div>
                                <Card.Body>
                                    <Card.Title className="text-center text-white">UI/UX Design</Card.Title>
                                    <Card.Text className="text-greyTextColor text-center">
                                        Specialize in designing visually appealing and user-centric interfaces that seamlessly bridge the gap between functionality and aesthetics

                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            {/* end of ui/ux design */}
                        </Col>

                        {/* start of responsive design */}
                        <Col lg={4} md={6}>
                            <Card className="xl:w-[22rem] xl:h-[22.23rem] mb-5">
                                <div className="bg-[#070F1A] p-3 rounded-[50%] cards">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="svg"
                                    >
                                        <path d="M23 11h-5a1 1 0 00-1 1v9a1 1 0 001 1h5a1 1 0 001-1v-9a1 1 0 00-1-1m0 9h-5v-7h5v7M20 2H2C.89 2 0 2.89 0 4v12a2 2 0 002 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4a2 2 0 00-2-2z" />
                                    </svg>
                                </div>
                                <Card.Body>
                                    <Card.Title className="text-center text-white">Responsive Design</Card.Title>
                                    <Card.Text className="text-greyTextColor text-center">
                                        Adept at designing web or app interfaces to adapt seamlessly across devices, ensuring optimal user experience on various screen sizes.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            {/* end of responsive design */}
                        </Col>

                        {/* start of QA */}
                        <Col lg={4} md={6}>
                            <Card className="xl:w-[22rem] xl:h-[22.23rem] mb-5">
                                <div className="bg-[#070F1A] p-3 rounded-[50%] cards">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                                    </svg>

                                </div>
                                <Card.Body>
                                    <Card.Title className="text-center text-white">Quality Assurance</Card.Title>
                                    <Card.Text className="text-greyTextColor text-center">
                                        Deep understanding of rigorous testing, thorough analysis, and continuous improvement for optimal deliverable reliability, functionality, and perfection.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {/* end of QA*/}
                </Container>
            </section>
            <Footer/>
        </>
    )
}

