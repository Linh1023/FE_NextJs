"use client";
import { Card } from "react-bootstrap";

interface Props {
  blogCard: IBlogResponse;
}

const BlogCard = (props: Props) => {
  const blogCard = props.blogCard;
  if (!blogCard != null)
    return (
      <Card className="custom-hover-shadow shadow border-0 h-100">
        <Card.Link className="custom-h-img" href={`/blog/${blogCard.id}`}>
          <Card.Img
            variant="top"
            className="h-100"
            src={`/img/${blogCard.imageUrl}`}
          />
        </Card.Link>
        <Card.Body className="d-flex flex-column">
          <Card.Text className="m-0">
            {blogCard.date} - {blogCard.author}
          </Card.Text>
          <Card.Link
            className="text-decoration-none link-dark custom-hover-primary  flex-shrink-1 flex-grow-1"
            href={`/blog/${blogCard.id}`}
          >
            <Card.Title>{blogCard.title}</Card.Title>
          </Card.Link>
          <Card.Text className="mb-1">{blogCard.excerpt}</Card.Text>
        </Card.Body>
      </Card>
    );
};

export default BlogCard;
