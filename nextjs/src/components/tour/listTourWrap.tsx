"use client";
import TourCard from "@/components/tour/tourCard";
import { fetchGetTours } from "@/services/apiServiceClient";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";

interface Props {
  tourCards: ITourResponse[];
}
const ListTourWrap = (props: Props) => {
  const [tourCards, setTourCards] = useState(props.tourCards);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const handleSelectChange = async (e: string) => {
    setLoading(true);
    const tourCards = await fetchGetTours();
    setTourCards(tourCards);
    setLoading(false);
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const handleClickSearch = async () => {
    setLoading(true);
    const tourCards = await fetchGetTours();
    setTourCards(tourCards);
    setLoading(false);
  };

  useEffect(() => {
  }, tourCards);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap">
        <p>
          Chúng tôi tìm thấy
          <span className="fs-5 fw-bold text-primary">
            {" " + tourCards?.length + " "}
          </span>
          tours cho Quý khách.
        </p>
        <Form className="d-flex justify-content-around ">
          <Form.Select
            className="form-control"
            onChange={(e) => handleSelectChange(e.target.value)}
          >
            <option>--Chọn--</option>
            <option value="1">Theo giá thấp đến cao</option>
            <option value="2">Theo giá cao đến thấp</option>
            <option value="3">Giảm giá nhiều nhất</option>
          </Form.Select>
          <Form.Control
            type="text"
            className="mx-1"
            value={searchTerm}
            placeholder="Search..."
            onChange={handleChange}
          />
          <Button variant="outline-primary" onClick={handleClickSearch}>
            Search
          </Button>
        </Form>
      </div>

      <Row className="mt-2 position-relative">
        {tourCards?.map((tourCard, index) => (
          <Col sm={6} md={6} lg={4} key={index} className="mt-3">
            <TourCard tourCard={tourCard} />
          </Col>
        ))}
        {loading && (
          <div className="overlay-bg">
            <div className="spinner">
              <Spinner variant="white"/>
            </div>
          </div>
        )}
      </Row>
    </>
  );
};
export default ListTourWrap;
