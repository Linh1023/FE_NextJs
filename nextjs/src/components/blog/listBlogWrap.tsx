"use client";
import BlogCard from "@/components/blog/blogCard";
import { fetchGetBlogs } from "@/services/apiServiceClient";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";

interface Props {
  blogs: IBlogResponse[];
}
const ListBlogWrap = (props: Props) => {
  const [blogs, setBlogCards] = useState(props.blogs);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const handleSelectChange = async (e: string) => {
    setLoading(true);
    const blogs = await fetchGetBlogs();
    setBlogCards(blogs);
    setLoading(false);
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const handleClickSearch = async () => {
    setLoading(true);
    const blogs = await fetchGetBlogs();
    setBlogCards(blogs);
    setLoading(false);
  };

  useEffect(() => {
  }, blogs);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap">
        <p>
          Chúng tôi tìm thấy
          <span className="fs-5 fw-bold text-primary">
            {" " + blogs?.length + " "}
          </span>
          blogs cho Quý khách.
        </p>
        <Form className="d-flex justify-content-around ">
          <Form.Select
            className="form-control"
            onChange={(e) => handleSelectChange(e.target.value)}
          >
            <option>--Chọn--</option>
            <option value="1">Mới nhất</option>
            <option value="2">Cũ nhất</option>
            <option value="3">Phổ biến nhất</option>
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
        {blogs?.map((blogCard, index) => (
          <Col sm={6} md={6} lg={4} key={index} className="mt-3">
            <BlogCard blogCard={blogCard} />
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
export default ListBlogWrap;
