import Footer from '@/components/reuseable/Footer'
import Layout from '../components/reuseable/Layout'
import { Container, Row, Col, Image, Button } from "react-bootstrap"
import SectionHeading from '@/components/reuseable/SectionHeading'


export default function AboutPage() {

  return (
    <>
      <Layout />
      <section className="container__area">

        <Container fluid="md">
          <SectionHeading>About Me</SectionHeading>
          <Row className='items-center'>
            <Col lg={6} md={12} sm={12} xs={12}>
              <div className='h-full w-full'>
                <Image
                  src='/assets/Festus Osayi.png'
                  alt="my photo image"
                  className=" object-fit-cover w-full h-full rounded-[50%]"
                  fluid
                />
              </div>


            </Col>
            <Col lg={6} md={12} sm={12} xs={12}>
              <p className="text-4xl heading">Hi There! I&apos;m Festus Osayi</p>
              <p className="text-2xl mt-3 text-headingColor">Fullstack Developer</p>
              <p className="text-greyTextColor leading-7 mt-3">Hello there! I am Festus Osayi. As a graduate of Computer Programming, my journey with coding began in 2021 when I moved to Canada. Since then, programming has become second nature to me, serving as a constant pursuit whether I&apos;m experiencing moments of joy, sadness, or any other emotion. Witnessing my ideas materialize into reality brings me immense satisfaction.</p>

              {/* About Festus */}
              <ul className='text-greyTextColor leading-10 mt-3'>
                <li>
                  Birthday
                  <span
                    className='inline ml-12'
                  >
                    :&nbsp;&nbsp;&nbsp;&nbsp;July 16<sup>th</sup>, &nbsp;2002
                  </span>
                </li>
                <li>
                  Email
                  <span
                    className='inline ml-[4.2rem]'
                  >
                    :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;osayifestus25@outlook.com
                  </span>
                </li>
                <li
                >
                  Based in
                  <span className='inline ml-[2.9rem]'>
                    :&nbsp;&nbsp;&nbsp;&nbsp; Ontario, Canada
                  </span>
                </li>
                <li>
                  Language
                  <span
                    className='inline ml-[2.3rem]'
                  >
                    :&nbsp;&nbsp;&nbsp;&nbsp;English
                  </span>
                </li>
              </ul>
              <a href='/assets/FESTUS OSAYI_RESUME__.pdf' download
                className="btn light mt-5" aria-labelledby='Downloadresumebutton'
              >Download Resume</a>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  )
}

