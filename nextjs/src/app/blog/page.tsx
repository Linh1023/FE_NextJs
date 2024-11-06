import ListBlogWrap from '@/components/blog/listBlogWrap';
import { fetchGetBlogs } from '@/services/apiServiceServer';
import React from 'react';
const  PageBlog=async ()=>{
    try {
        const blogs: IBlogResponse[] = await fetchGetBlogs();
        return (
          <>
            <ListBlogWrap blogs={blogs}/>;
          </>
        );
      } catch (error) {
        console.error(error);
        return <div>Error fetching d</div>;
      }
}
export default PageBlog;