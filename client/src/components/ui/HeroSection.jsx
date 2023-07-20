import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./hero-section.css";
import heroImg from "../../assets/images/hero.jpg";

const HeroSection = () => {
  return (
    <>
      <section className="common1__section">
        <section className="hero__section">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="hero__content">
                  <h2>EVM</h2>
                  <h2>DOJO</h2>
                  <h6>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                  </h6>


                  <div className="hero__btns d-flex align-items-center gap-4">
                    <button style={{ backgroundColor: "#FAEDEA" }} className=" explore__btn d-flex align-items-center gap-2">
                      <i className="ri-rocket-line"></i>{" "}
                      <Link to="/market">Explore</Link>
                    </button>
                    <button style={{ backgroundColor: '#F89595' }} className=" create__btn d-flex align-items-center gap-2">
                      <i className="ri-ball-pen-line"></i>
                      <Link to="/create">Create</Link>
                    </button>
                  </div>
                  <br></br>
                  <p>
                    lorem ipsum
                  </p>
                </div>
              </Col>

              <Col lg="6" md="6">
                <div className="hero__img">
                  {/* <img src={heroImg} alt="" className="w-100" /> */}
                </div>
              </Col>
            </Row>
          </Container>
        </section>

      </section>


    </>

  );
};

export default HeroSection;
