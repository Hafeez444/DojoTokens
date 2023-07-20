import React from "react";
import "./seller.css";
import { Container, Row, Col } from "reactstrap";
import { SELLER__DATA } from "../../../assets/data/data";
import Faq from 'react-faq-component';

const data = {
  title: "FAQs",
  rows: [
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipisc?",
      content: "Lorem ipsum dolor sit amet, consectetur adipisc?"
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscin iusmod?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscin iusmod?"
    },
    {
      title: "Lorem ipsum dolor sit amet?",
      content: "Lorem ipsum dolor sit amet?"
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur ed do eiusmod?",
      content: "Lorem ipsum dolor sit amet, consectetur ed do eiusmod?"
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetud?",
      content: "Lorem ipsum dolor sit amet, consectetud?"
    }]
}

const styles = {
  bgColor: '#FAEDEA'
};

const config = {
  animate: true,
  arrowIcon: "V",
  openOnload: 0,
  expandIcon: "+",
  collapseIcon: "-",

};

const SellerSection = () => {
  return (
    <section>
      <Container>
        <div>
          <Faq
            data={data}
            styles={styles}
            config={config}
          />
        </div>
      </Container>
    </section>
  );
};

export default SellerSection;
