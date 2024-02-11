/** Layout - Bootstrap */
import Layout from "@/components/reuseable/Layout";
import { Container, Row, Col, Form, Button } from 'react-bootstrap'


/** Icons */
import {
    FaLinkedin,
    FaGithub,
    FaTwitter,
    FaMapMarkerAlt
} from "react-icons/fa";
import { BsWhatsapp } from 'react-icons/bs'
import { HiEnvelope } from "react-icons/hi2";

import { useRef, useState } from "react";
import { emailjsServices } from "@/lib/contact/contact";
import { withSwal } from 'react-sweetalert2' /**  SweetAlert2 */
import emailjs from "emailjs-com";
import Footer from "@/components/reuseable/Footer";
import ContactSpinner from "@/components/reuseable/ContactSpinner";
import SectionHeading from "@/components/reuseable/SectionHeading";

/** Preloader */

function ContactPage({ swal }) {
    const form = useRef()
    const [isLoading, setIsLoading] = useState(false)

    /** functionality for emailJS */
    const sendEmail = (e) => {
        setIsLoading(true)
        e.preventDefault();

        emailjs
            .sendForm(
                emailjsServices.serviceId,
                emailjsServices.templateId,
                form.current,
                emailjsServices.publicKey
            )
            .then(
                (result) => {
                    if (result.status === 200) {
                        swal.fire({
                            title: "Message sent successfully!",
                            icon: "success",
                        });
                        setIsLoading(false)
                    }
                },
                (error) => {
                    console.log(error.text);
                }
            );
        e.target.reset();
    };
    return (
        <>
            <Layout />
            <article className="container__area bg-[#060C1B]">
                <SectionHeading>Contact Me</SectionHeading>
                <Container fluid='md'>
                    <Row>
                        {/* send me message form*/}
                        <Col lg={6}>
                            <h2 className="text-white text-3xl mb-4 font-medium">Just say Hello</h2>
                            <Form ref={form} onSubmit={sendEmail}>
                                {/* your name */}
                                <Form.Group className="mb-4" controlId="name">
                                    <Form.Control
                                        type="text"
                                        placeholder="Your Name"
                                        name="name"
                                        required
                                    />
                                </Form.Group>

                                {/* your email */}

                                <Form.Group className="mb-4" controlId="email">
                                    <Form.Control
                                        type="email"
                                        placeholder="Your Email"
                                        name="email"
                                        required
                                    />
                                </Form.Group>


                                {/* your Subject */}
                                <Form.Group className="mb-4" controlId="subject">
                                    <Form.Control
                                        type="text"
                                        placeholder="Your Subject"
                                        name="subject" />
                                </Form.Group>

                                {/* Your message */}
                                <Form.Group className="mb-4" controlId="message">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Your Message"
                                        className="h-[9rem] resize-none"
                                        name="message"
                                    />
                                </Form.Group>

                                {/* button */}
                                <Button style={{ textTransform: "capitalize" }} className="btn light mb-4" type="submit">
                                    Send Message
                                </Button>
                            </Form>
                            {/* preloader */}
                            {
                                isLoading && <ContactSpinner />
                            }
                        </Col>
                        {/* contact info and platforms */}
                        <Col>
                            <h2 className="text-white text-3xl mb-4 font-medium">Contact Info</h2>
                            <p className="text-greyTextColor">
                                You can also get in touch with me through the following platforms, and I would absolute appreciate every feedbacks and thoughts.
                            </p>
                            {/* email */}
                            <section className="flex mt-4 gap-4 contact__info">
                                <a
                                    className="inline p-3 rounded-[50%]"
                                    href="mailto:osayifestus25@outlook.com"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <HiEnvelope className="w-5 h-5 text-gray-300" />
                                </a>
                                <div>
                                    <h3 className="text-white text-xl">Email</h3>
                                    <p className="text-greyTextColor">osayifestus25@outlook.com</p>
                                </div>
                            </section>

                            {/* Whatsapp */}
                            <section className="flex mt-4 gap-4 contact__info">
                                <a
                                    className="inline p-3 rounded-[50%]"
                                    href="https://api.whatsapp.com/send?phone=14372166863"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <BsWhatsapp className="w-5 h-5 text-gray-300" />
                                </a>
                                <div>
                                    <h3 className="text-white text-xl">Whatsapp</h3>
                                    <p className="text-greyTextColor">(437) 216-6863</p>
                                </div>
                            </section>

                            {/* Address */}
                            <section className="flex mt-4 gap-4 contact__info">
                                <a
                                    className="inline p-3 rounded-[50%]" href="https://en.wikipedia.org/wiki/Toronto"
                                    target="_blank"
                                >
                                    <FaMapMarkerAlt className="w-5 h-5 text-gray-300" />
                                </a>
                                <div>
                                    <h3 className="text-white text-xl">Address</h3>
                                    <p className="text-greyTextColor">Toronto, Canada</p>
                                </div>
                            </section>

                            {/* Social platform */}
                            <p className="text-greyTextColor mt-16">Let&apos; get connected through my social platforms</p>
                            <div className='flex gap-4 mt-4'>
                                <div className='social__network linkedIn'>
                                    <a href='https://www.linkedin.com/in/festus-osayi/' target='_blank' > <FaLinkedin className='icon' /></a>
                                </div>
                                <div className='social__network twitter'>
                                    <a href='https://twitter.com/Festus_Osayi29' target='_blank'><FaTwitter className='icon' /></a>
                                </div>
                                <div className='social__network github'>
                                    <a href='https://github.com/Festus-Osayi' target='_blank' ><FaGithub className='icon' /></a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </article>
            <Footer />
        </>
    )
}

export default withSwal(({ swal }) => <ContactPage swal={swal} />);

