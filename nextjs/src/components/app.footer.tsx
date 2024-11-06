"use client";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";

function Footer() {
  return (
    <Container className="footer--container">
      <Row>
        <Col>
          <h4>Liên hệ </h4>
          <ul className="list-unstyled">
            <li> Cầu Giấy, Hà Nội </li>
            <li>0242 2420 777 </li>
            <li>0987654321 </li>
            <li>info@webtra.vn </li>
          </ul>
        </Col>
        <Col>
          <h4>Dòng tour </h4>
          <ul className="list-unstyled">
            <Link className={"nav-link"} href={"#"}> Cầu Giấy, Hà Nội </Link>
            <li>0242 2420 777 </li>
            <li>0987654321 </li>
            <li>info@webtra.vn </li>
          </ul>
        </Col>
        <Col>Thông Tin 1</Col>
        <Col>Thông Tin 2</Col>
      </Row>
    </Container>
  );
}

export default Footer;
