"use client"
import { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Modal, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Dropdown from 'react-bootstrap/Dropdown';
import "@/styles/cart.css"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { toast } from "react-toastify";
import { fetchPutCart } from "@/services/apiServiceClient";
import { useMyContext } from "@/utils/MyContext";
interface IProps {
    tourCards: ITourResponse[]
}


const Cart = (props: IProps) => {
    const { tourCards } = props

    const { cart, setCart } = useMyContext();

    const [cartCurrent,setCartCurrent] = useState<CartResponse>(cart)

    const [cartItems, setCartItems] = useState<ITourResponse[]>([])

    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            Bỏ thích
        </Tooltip>
    );

    const handleRemove = async (cartItem:ITourResponse) => {
        console.log(cartItem.id)

       const items:ItemResponse[] = cartCurrent.item.filter(i => i.tour_id !== cartItem.id)
       const newCart:CartResponse = { ...cartCurrent }
       newCart.item = items
       setCart(newCart)
       setCartCurrent(newCart)
       console.log("new cart >>> ", newCart)
       

       const res:CartResponse = await fetchPutCart(newCart.id, newCart)
       toast.success("Bỏ thích thành công")


    }

    useEffect(() => {
        setCartCurrent(cart)
        let cItem: ITourResponse[] = []
        cartCurrent.item.forEach(c => {
            tourCards.forEach(t => {
                if (t.id === c.tour_id) {
                    cItem.push(t)
                }
            })
        })
        setCartItems(cItem)
        console.log("cart current >>> ",cItem )
    }, [cartCurrent,cart])




    return (
        <>
            <Row>
                <h4 className="title__h4" >Mục yêu thích của bạn</h4>
            </Row>

            {cartItems?.map((cartItem, index) => (<>

                <Row className="ctn-item__Row" >
                    <Col lg={3} >
                        <img className="img-fluid" src={`/img/${cartItem.imageUrls[0]}`} />
                    </Col>

                    <Col lg={3}>
                        <div className="tour-code">Mã Tour:
                            {cartItem.code}
                        </div>
                        <h1 className="title h5 mt-1">
                            {cartItem.title}
                        </h1>
                    </Col>
                    <Col lg={6}>
                        <Row>
                            <Col>
                                <div>
                                    <del>
                                        {" " + cartItem.originalPrice.toLocaleString("vi-VN")} VND

                                    </del>
                                </div>
                                <span className="text-danger fs-4 fw-bold">
                                    {cartItem.discountedPrice.toLocaleString("vi-VN")} VND
                                  
                                </span>
                            </Col>
                            <Col className="detail__col">
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        <i className="fa-solid fa-bars"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Button
                                            className="my-2 p-2 w-100"
                                            variant="danger"
                                        href={`/order?tour=${cartItem.id}`}

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
                                    <Button variant="outline-danger"
                                    onClick={()=>{ handleRemove(cartItem) }}
                                    > <i className="fa-solid fa-heart"></i></Button>
                                </OverlayTrigger>

                            </Col>
                        </Row>
                    </Col>
                </Row>

            </>))}




        </>
    )
}

export default Cart