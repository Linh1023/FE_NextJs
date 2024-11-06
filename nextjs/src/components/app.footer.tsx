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
            <li>Cao cấp</li>
            <li>Tiêu chuẩn </li>
            <li>Tiết kiệm</li>
            <li>Giá tốt</li>
          </ul>
        </Col>
        <Col>
          <h4>Thông tin</h4>
          <ul className="list-unstyled">
          <li>Phương thức thanh toán</li>
          </ul>

        </Col>
        <Col>
          <h4>Mạng xã hội</h4>
          <div className="icon__div" >
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram  icon-footer__icon"></i>
            <i className="fa-solid fa-phone-volume  icon-footer__icon"></i>
            <i className="fa-brands fa-youtube  icon-footer__icon"></i>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
