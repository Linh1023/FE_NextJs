"use client";
import { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Modal, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import TourCard from "@/components/tour/tourCard";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useSession } from "next-auth/react";
import { useMyContext } from "@/utils/MyContext";
import { toast } from "react-toastify";
import { fetchPutCart } from "@/services/apiServiceClient";
import { ModalCustom } from "./modal";
interface Props {
  tour: ITourDetailResponse;
  toursRelated: ITourResponse[];
}
const TourWrap = (props: Props) => {
  const [toursRelated, settoursRelated] = useState(props.toursRelated);
  const [tour, setTour] = useState(props.tour);

  const [showContact, setShow] = useState(false);
  const [tourTitle, setTourTitle] = useState<string>('');
  const [tourId, setTourId] = useState<number>(0);
  const handleShow = () => setShow(true);
  const handleShowBooking = (title: string,id:number) => {
    setTourTitle(title);
    setTourId(id);
    setShow(true);
  };


  useEffect(()=>{
    console.log(tourId)
  },[showContact])

  const [imgMain, setImgMain] = useState<string>("");
  const [showImg, setShowImg] = useState(false);
  const handleShowImg = (value: string) => {
    setShowImg(true);
    setImgMain(value);
  };
  const handleCloseImg = () => setShowImg(false);
  useEffect(() => {});

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Yêu thích
    </Tooltip>
  );

  const { cart, setCart } = useMyContext();
  const { data: session } = useSession();

  const handleAdd = async (item: ITourResponse) => {
    if (session?.user) {
      console.log("cart >>>> ", cart);

      const existsInArray =
        cart.item.find((i) => i.tour_id === item.id) !== undefined;
      console.log("existsInArray >>>> ", existsInArray);

      if (!existsInArray) {
        const newCart = { ...cart };
        const newItem: ItemResponse = {
          tour_id: item.id,
          time: "2003-03-04",
        };
        newCart.item.push(newItem);
        setCart(newCart);
        const res = await fetchPutCart(newCart.id, newCart);
        toast.success("Thêm vào mục yêu thích thành công");
      } else {
        toast.info("Tour đã có trong mục yêu thích");
      }
    } else {
      toast.info("Vui lòng đăng nhập để thêm vào mục yêu thích");
    }
  };

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
                <div className="btn-reserve-love__div">
                  <Button className="my-2 p-2 w-100" variant="danger"  onClick={() => handleShowBooking(tour.title,tour.id)}>
                    Đặt ngay
                  </Button>
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <Button
                      variant="outline-danger"
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        handleAdd(tour);
                      }}
                    >
                      
                      <i className="fa-solid fa-heart"></i>
                    </Button>
                  </OverlayTrigger>
                </div>

                <Button
                  className="my-2 p-2 w-100"
                  variant="outline-primary"
                  onClick={() => handleShow()}
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
                      <a
                        key={index}
                        href={`#ngay_${index + 1}`}
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
              <div
                key={index}
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
              <TourCard tourCard={tourRelated} 
              handleShowBooking = {handleShowBooking}/>
            </Col>
          ))}
        </Row>
      </div>
      <ModalCustom 
          show={showContact}
          setShow={setShow}
          tourTitle={tourTitle}
          setTourTitle={setTourTitle}
          tourId={tourId}
          setTourId={setTourId}
          />

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
