"use client";
import { fetchGetBlog } from "@/services/apiServiceClient";
import { fetchGetBlogsByIds } from "@/services/apiServiceServer";
import Link from "next/link";
import { useState } from "react";
import { Button, Col, ListGroup, Modal, Row, Spinner } from "react-bootstrap";

interface Props {
  blog: IBlogDetailResponse;
  blogsRelated: IBlogResponse[];
}
const BlogWrap = (props: Props) => {
  const [blogsRelated, setblogsRelated] = useState(props.blogsRelated);
  const [blog, setBlog] = useState(props.blog);

  const [imgMain, setImgMain] = useState<string>("");
  const [showImg, setShowImg] = useState(false);

  const [progress, setProgress] = useState(0);

  const handleShowImg = (value: string) => {
    setShowImg(true);
    setImgMain(value);
  };
  const handleCloseImg = () => setShowImg(false);

  return (
    <>
      <div className="blog-detail my-4">
        <Row>
          <Col lg={9}>
            <h1 className="title h3 mt-1">{blog.title}</h1>
            <p>
              {blog.date} - {blog.author}
            </p>

            <img
              className="px-1 pointer-event "
              src={`/img/${blog.imageUrl}`}
              onClick={() => handleShowImg(blog.imageUrl)}
            />

            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
          </Col>
          <Col lg={3}>
            <h3 className="title">Bài Viết Liên Quan</h3>
            <ListGroup >
              {blogsRelated.map((blogRelated, index) => (
                <ListGroup.Item className="custom-cursor" key={index}>{blogRelated.id+". "}
                  <Link href={`/blog/${blogRelated.id}`}>
                    {blogRelated.title}
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </div>

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
export default BlogWrap;
