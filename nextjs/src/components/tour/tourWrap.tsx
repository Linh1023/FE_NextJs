"use client";
import { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Modal, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import TourCard from "@/components/tour/tourCard";

interface Props {
  tour: ITourDetailResponse;
  toursRelated: ITourResponse[];
}
const TourWrap = (props: Props) => {
  const [toursRelated, settoursRelated] = useState(props.toursRelated);
  const [tour, setTour] = useState(props.tour);

  const [showContact, setShowContact] = useState(false);
  const handleCloseContact = () => setShowContact(false);
  const handleShowContact = () => setShowContact(true);

  const [imgMain, setImgMain] = useState<string>("");
  const [showImg, setShowImg] = useState(false);
  const handleShowImg = (value: string) => {
    setShowImg(true);
    setImgMain(value);
  };
  const handleCloseImg = () => setShowImg(false);
  useEffect(() => {});

  return (
    <>
      <div className="tour-detail my-3">
        <Row>
          <Col lg={6}>
            <div className="tour-code">Mã Tour: {tour.code}</div>
            <h1 className="title h3 mt-1">{tour.title}</h1>
          </Col>
          <Col lg={6}>
            <Row>
              <Col>
                <div>
                  <del>
                    {" " + tour.originalPrice.toLocaleString("vi-VN")} VND
                  </del>
                </div>
                <span className="text-danger fs-4 fw-bold">
                  {tour.discountedPrice.toLocaleString("vi-VN")} VND
                </span>
              </Col>
              <Col>
                <Button
                  className="my-2 p-2 w-100"
                  variant="danger"
                  href={`/order?tour=${tour.id}`}
                >
                  Đặt ngay
                </Button>
                <Button
                  className="my-2 p-2 w-100"
                  variant="outline-primary"
                  onClick={handleShowContact}
                >
                  Liên hệ tư vấn
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="my-4 bg-info-subtle p-3">
          <Col lg={5}>
            <p>Khởi hành :{tour.departureDate}</p>
            <p>
              {tour.duration == 1
                ? "Trong ngày"
                : `${tour.duration} Ngày ${tour.duration - 1} Đêm`}
            </p>
            <p>Nơi khởi hành: {tour.startLocation}</p>
          </Col>
          <Col lg={7} className=""></Col>
        </Row>

        <h3 className="title">Những địa điểm tham quan</h3>
        <div className="list-image d-flex overflow-auto">
          {tour?.imageUrls?.map((imageUrl, index) => (
            <Image
              key={index}
              className="flex-grow-0 flex-shrink-0 custom-w-33 px-1 pointer-event "
              src={`/img/${imageUrl}`}
              rounded
              onClick={() => handleShowImg(imageUrl)}
            />
          ))}
        </div>
        <Row className=" position-relative">
          <Col lg={3} className="bg-light col-lg-3 position-sticky top-0 p-2 ">
            <div className="h-100 position-relative ">
              <Accordion className="position-sticky top-0 pt-2">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Nội dung chính</Accordion.Header>
                  <Accordion.Body>
                    {tour.timeLine?.map((day, index) => (
                      <a key={index}
                        href={`#ngay_${index+1}`}
                        className="p-2 d-block mt-2 outline btn btn-outline-primary"
                      >
                        Ngày {index + 1}: {day.title}
                      </a>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
          <Col lg={9}>
            {tour.timeLine?.map((day, index) => (
              <div key={index}
                id={`ngay_${index + 1}`}
                className="border p-3 rounded border-1 mt-2"
              >
                <h4 className="title">Ngày {index + 1 + ": " + day.title}</h4>
                <p>{day.description}</p>
              </div>
            ))}
          </Col>
        </Row>
      </div>
      <h3 className="subtitle">Tour Tương Tự</h3>
      <div className="tour-similiar my-3">
        <Row className="mt-2 position-relative">
          {toursRelated?.map((tourRelated, index) => (
            <Col sm={6} md={6} lg={4} key={index} className="mt-3">
              <TourCard tourCard={tourRelated} />
            </Col>
          ))}
        </Row>
      </div>

      <Modal show={showContact} onHide={handleCloseContact}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseContact}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseContact}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal */}
      <Modal
        show={showImg}
        onHide={handleCloseImg}
        size="lg"
        centered
        className="bg-transparent"
      >
        <Modal.Body className="p-0">
          <img
            src={`/img/` + imgMain} // Đường dẫn đến hình ảnh lớn hơn
            alt="Detail"
            className="img-fluid" // Để hình ảnh co giãn
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default TourWrap;
