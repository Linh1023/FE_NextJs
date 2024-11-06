"use client";
import { Button, Card } from "react-bootstrap";

interface Props {
  tourCard: ITourResponse;
}

const TourCard = (props: Props) => {
  const tourCard = props.tourCard;
  if (!tourCard != null)
    return (
      <Card className="custom-hover-shadow shadow border-0 h-100">
        <Card.Link className="custom-h-img" href={`/tour/${tourCard.id}`}>
          <Card.Img
            variant="top"
            className="h-100"
            src={`/img/${tourCard.imageUrls[0]}`}
          />
        </Card.Link>
        <Card.Body className="d-flex flex-column">
          <Card.Text className="m-0">
            {tourCard.departureDate} - {tourCard.duration==1?"Trong ngày":`${tourCard.duration}N${tourCard.duration-1}Đ`} - Giờ đi: {tourCard.departureTime}
          </Card.Text>
          <Card.Link
            className="text-decoration-none link-dark custom-hover-primary  flex-shrink-1 flex-grow-1"
            href={`/tour/${tourCard.id}`}
          >
            <Card.Title>{tourCard.title}</Card.Title>
          </Card.Link>
          <Card.Text className="mb-1">Mã Tour: {tourCard.code}</Card.Text>
          <Card.Text className="mb-1">
            Nơi khởi hành: {tourCard.startLocation}
          </Card.Text>
          <Card.Text className="align-items-center d-flex flex-wrap">
            Giá:
            <del>{" " + tourCard.originalPrice.toLocaleString("vi-VN")} VND</del>
            <span className="text-danger fs-5 fw-bold p-1 m-1">
              {tourCard.discountedPrice.toLocaleString("vi-VN")} VND
            </span>
          </Card.Text>
          <div className="d-flex justify-content-between">
            <Button className="rounded-1" variant="danger" href={`/order?tour=${tourCard.id}`}>
              Đặt ngay
            </Button>
            <Button
              className="rounded-1"
              variant="outline-success"
              href={`/tour/${tourCard.id}`}
            >
              Xem chi tiết
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
};

export default TourCard;
