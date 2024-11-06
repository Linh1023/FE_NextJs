"use client"
import { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Modal, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Dropdown from 'react-bootstrap/Dropdown';
import "@/styles/cart.css"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Cart = () => {


    const renderTooltip = (props:any) => (
        <Tooltip id="button-tooltip" {...props}>
          Bỏ thích
        </Tooltip>
      );

    return (
        <>
            <Row>
                <h4 className="title__h4" >Mục yêu thích của bạn</h4>
            </Row>
            <Row className="ctn-item__Row" >
                <Col lg={3} >
                    <img className="img-fluid"  src="/img/tour_1.jpg" />
                </Col>
                
                <Col lg={3}>
                    <div className="tour-code">Mã Tour:
                        {/* {tour.code} */}
                        GDFHJ32D
                    </div>
                    <h1 className="title h5 mt-1">
                        {/* {tour.title} */}
                        Đông Bắc: Hà Giang - Lũng Cú - Đồng Văn - Mã Pí Lèng - Mèo Vạc - Cao Bằng - Thác Bản Giốc - Hồ Ba Bể | Bay Bamboo Airways
                    </h1>
                </Col>
                <Col lg={6}>
                    <Row>
                        <Col>
                            <div>
                                <del>
                                    {/* {" " + tour.originalPrice.toLocaleString("vi-VN")} VND */}
                                    500.000 VND
                                </del>
                            </div>
                            <span className="text-danger fs-4 fw-bold">
                                {/* {tour.discountedPrice.toLocaleString("vi-VN")} VND */}
                                4.000.000 VND
                            </span>
                        </Col>
                        <Col className="detail__col">
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    Chi tiết
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Button
                                        className="my-2 p-2 w-100"
                                        variant="danger"
                                    // href={`/order?tour=${tour.id}`}

                                    >
                                        Đặt ngay
                                    </Button>
                                    <Button
                                        className="my-2 p-2 w-100"
                                        variant="outline-primary"
                                    // onClick={handleShowContact}
                                    >
                                        Liên hệ tư vấn
                                    </Button>
                                </Dropdown.Menu>
                            </Dropdown>

                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                   <Button variant="outline-danger"> <i className="fa-solid fa-heart icon-heart__i"></i></Button>
                            </OverlayTrigger>

                       



                        </Col>
                    </Row>
                </Col>
            </Row>
            
        </>
    )
}

export default Cart