import { Navbar, Container, Nav, NavDropdown, Fade } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MainNav() {
  const router = useRouter();
  

  return (
    <Navbar expand="lg" className="bg-navColor navbar-light py-4 fixed-top">
      <Container>
        <Navbar.Brand className="text-white text-3xl font-bold" href="/">
          <span className="text-headingColor">&lt;</span>
          <span className="text-headingColor">F</span>estus
          <span className="text-headingColor">&#47;&gt;</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto nav__bar font-bold text-white">
            <Link href={"/"} passHref legacyBehavior>
              <Nav.Link
                className={`transition duration-500 ease-in-out ${
                  router.pathname === "/" ? `active` : "/"
                }`}
              >
                HOME
              </Nav.Link>
            </Link>
            <Link href="/about" passHref legacyBehavior>
              <Nav.Link
                className={`transition duration-500 ease-in-out ${
                  router.pathname === "/about" ? `active` : "/"
                }`}
              >
                ABOUT
              </Nav.Link>
            </Link>
            <Link href="/education" passHref legacyBehavior>
              <Nav.Link
                className={`transition duration-500 ease-in-out ${
                  router.pathname === "/education" ? `active` : "/"
                }`}
              >
                EDUCATION
              </Nav.Link>
            </Link>
            <Link href=" /services" passHref legacyBehavior>
              <Nav.Link
                className={`transition duration-500 ease-in-out ${
                  router.pathname === "/services" ? `active` : "/"
                }`}
              >
                SERVICES
              </Nav.Link>
            </Link>
            <Link href="/skills" passHref legacyBehavior>
              <Nav.Link
                className={`transition duration-500 ease-in-out ${
                  router.pathname === "/skills" ? `active` : "/"
                }`}
              >
                SKILLS
              </Nav.Link>
            </Link>
            <Link href="/projects" passHref legacyBehavior>
              <Nav.Link
                className={`transition duration-500 ease-in-out ${
                  router.pathname === "/projects" ? `active` : "/"
                }`}
              >
                PROJECTS
              </Nav.Link>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <Nav.Link
                className={`transition duration-500 ease-in-out ${
                  router.pathname === "/contact" ? `active` : "/"
                }`}
              >
                CONTACT
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
