import BlogWrap from "@/components/blog/blogWrap";
import { fetchGetBlog, fetchGetBlogsByIds } from "@/services/apiServiceServer";

// Define an interface for the params
interface Params {
  id: string;
}

const PageBlog = async ({ params }: { params: Params }) => {
  if (!params?.id) throw new Error("Blog ID is missing.");

  try {
    const blog: IBlogDetailResponse = await fetchGetBlog(params.id);
    let blogsRelated: IBlogResponse[] = [];

    if (Array.isArray(blog.relatedIds) && blog.relatedIds.length > 0) {
      blogsRelated = await fetchGetBlogsByIds(blog.relatedIds);
    }

    return (
      <>
        <BlogWrap blogsRelated={blogsRelated} blog={blog} />
      </>
    );
  } catch (error) {
    console.error(error);
    return (
      <div>
        Error fetching blogs:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }
};

export default PageBlog;
