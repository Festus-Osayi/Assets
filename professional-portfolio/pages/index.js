import { useEffect, useState } from 'react';
import Layout from '../components/reuseable/Layout';
import Link from 'next/link'
import { Row, Col, Image, Button, Container } from 'react-bootstrap'
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Footer from '@/components/reuseable/Footer';
import Spinner from '@/components/reuseable/Spinner';



export default function HomePage() {

  const [isLoading, setIsLoading] = useState(true);





  return (
    <>


      <Layout />
      <Container className='mt-[8rem] mb-[5rem]' fluid='md'>
        <Row className='lg:items-center md:items-start'>
          <Col md='7'>
            <small className='text-headingColor text-3xl'>Hello, I&apos;m</small>
            <h1 className='font-bold text-8xl mt-2'>Festus Osayi</h1>
            <h2 className='animate__text'>Fullstack Developer</h2>
            <div className='flex gap-4 mt-4 buttons'>
              <Link href={'/contact'} passHref legacyBehavior>
                <Button className='btn light'>
                  Contact Me
                </Button>
              </Link>
              <a href='/public/assets/FESTUS OSAYI_RESUME__.pdf' download className='btn outline download__resume'>Download Resume</a>
            </div>
            <div className='hero__border flex gap-4 mt-[5rem] bg-[#111724] py-3 px-5 rounded-2xl justify-center lg:justify-start'>
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
          <Col md='5' className='hidden lg:block'>
              <Image
                src='/assets/Festus Osayi.png'
                alt='my personal image'
                className='w-full h-full object-cover bg-no-repeat rounded-[50%]'
                fluid
              />
          </Col>
        </Row>
      </Container>
      <Footer />

    </>


  )
}

