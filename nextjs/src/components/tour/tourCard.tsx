"use client";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Button, Card } from "react-bootstrap";
import { useMyContext } from '@/utils/MyContext';
import { fetchPutCart } from '@/services/apiServiceClient';
import { toast } from 'react-toastify';
import { useSession } from "next-auth/react"
interface Props {
  tourCard: ITourResponse;
  handleShowBooking:(title: string,id:number)=> void;
}

const TourCard = (props: Props) => {
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Yêu thích
    </Tooltip>
  );

  const { cart, setCart } = useMyContext();
  const { data: session } = useSession()

  const handleAdd = async (item: ITourResponse) => {
    if (session?.user) {
      console.log("cart >>>> ",cart)

      const existsInArray = cart.item.find(i => i.tour_id === item.id) !== undefined;
      console.log("existsInArray >>>> ",existsInArray)

      if (!existsInArray) {
        const newCart = { ...cart }
        const newItem: ItemResponse = {
          tour_id: item.id,
          time: '2003-03-04'
        }
        newCart.item.push(newItem)
        setCart(newCart)
        const res = await fetchPutCart(newCart.id, newCart)
        toast.success("Thêm vào mục yêu thích thành công")
      } else {
        toast.info("Tour đã có trong mục yêu thích")
      }
    } else {
      toast.info("Vui lòng đăng nhập để thêm vào mục yêu thích")
    }





  }
   const {handleShowBooking} = props

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
            {tourCard.departureDate} - {tourCard.duration == 1 ? "Trong ngày" : `${tourCard.duration}N${tourCard.duration - 1}Đ`} - Giờ đi: {tourCard.departureTime}
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
            <Button className="rounded-1" variant="danger"  onClick={()=>{handleShowBooking(tourCard.title,tourCard.id)}}>
              Đặt ngay
            </Button>
            <div>
              <Button
                className="rounded-1"
                variant="outline-success"
                href={`/tour/${tourCard.id}`}
              >
                Xem chi tiết
              </Button>

              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Button variant="outline-danger" style={{ marginLeft: "10px" }}
                  onClick={() => { handleAdd(tourCard) }}
                > <i className="fa-solid fa-heart"></i></Button>
              </OverlayTrigger>


            </div>


          </div>
        </Card.Body>
      </Card>
    );
};

export default TourCard;
