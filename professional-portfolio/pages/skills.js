import Layout from '@/components/reuseable/Layout'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Link from 'next/link'
import Footer from '@/components/reuseable/Footer'
import React, { useState, useEffect } from 'react';


// Animations
import SoftSkills from '@/components/reuseable/SoftSkills';
import { softSkills, technicalSkills } from '@/lib/data/data';
import TechnicalSkills from '@/components/reuseable/TechnicalSkills';
import SectionHeading from '@/components/reuseable/SectionHeading';




export default function SkillsPage() {
    return (
        <>
            <Layout />
            <section className="container__area bg-[#060D1A]">
                <SectionHeading>My Skills</SectionHeading>
                <Container fluid='md'>
                    <Row>
                        {/* Technical skills */}
                        <Col lg={6} className='mb-5'>
                            <div className="sub-title">
                                <h2 className='text-white'>Technical Skills</h2>
                            </div>
                            <div className='skills'>
                                {
                                    technicalSkills && technicalSkills.length > 0 && technicalSkills.map(({ id, skillName, skillPercent, skillProficiency }) => (
                                        <TechnicalSkills key={id} skillName={skillName.join(' - ')} skillPercent={skillPercent} skillProficiency={skillProficiency} />
                                    ))
                                }
                            </div>
                        </Col>
                        {/* End of technical skills */}

                        {/* Soft Skills */}
                        <Col className='lg:pl-[10%]'>
                            <div className="sub-title mb-5">
                                <h2 className='text-white'>Soft Skills</h2>
                            </div>
                            <div className="mt-0 flex flex-wrap">
                                {
                                    softSkills && softSkills.length > 0 && softSkills.map((s) => (
                                        <Col lg={4} md={4} xs={6} sm={6} className="mb-4" key={s.id}>
                                            <div
                                                style={{ width: 120, height: 120 }}
                                                className="flex flex-col justify-center items-center"
                                            >
                                                <SoftSkills {...s} />
                                            </div>
                                        </Col>
                                    ))
                                }
                            </div>
                            <Link href={'/projects'} passHref legacyBehavior>
                                <Button className='btn light mt-4'>
                                    Projects eh?
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Container >
            </section >
            <Footer />
        </>
    )
}

