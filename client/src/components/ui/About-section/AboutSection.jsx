import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./about-Section.css";
import heroImg from "../../../assets/images/lego bg 2.png";

const AboutSection = () => {
  return (
    <>
      <section className="about__section">
        <Container style={{ backgroundColor: '#F9CACA' }}>
          <Row>
            <Col lg="6" md="6">
              <div className="about__content">
                <h2>About Project</h2>
                <h6>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                </h6>
                <div style={{ paddingLeft: '450px' }} className="about__btns d-flex align-items-center gap-4">

                  <button style={{ backgroundColor: '#fff' }} className=" create__btn d-flex align-items-center gap-2">
                    <i className="ri-ball-pen-line"></i>
                    <Link to="/create">Learn more</Link>
                  </button>
                </div>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="about__img">
                <img src={heroImg} alt="" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>


    </>

  );
};

export default AboutSection;
