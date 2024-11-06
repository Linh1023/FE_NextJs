const BASE_URL = process.env.NEXT_PUBLIC_URL_API_LOCALHOST;

export const fetchGetTours = async (): Promise<ITourResponse[]> => {
  let url = `/tour`;
  return fetchGetAuthorizedData(url);
};

export const fetchGetToursByIds = async (
  listId: number[]
): Promise<ITourResponse[]> => {
  const tourRequests = listId.map((id) => {
    const url = `/tour/${id}`;
    try {
      return fetchGetAuthorizedData(url);
    } catch (e) {
      console.error(`Error fetching tour with ID ${id}:`, e);
      return null;
    }
  });

  const results = await Promise.all(tourRequests);
  return results.filter((result): result is ITourResponse => result !== null);
};

export const fetchGetTour = async (
  tourId: string
): Promise<ITourDetailResponse> => {
  let url = `/tour/${tourId}`;
  return fetchGetAuthorizedData(url);
};

export const fetchGetBlogsByIds = async (
  listId: number[]
): Promise<IBlogResponse[]> => {
  const blogRequests = listId.map((id) => {
    const url = `/blog/${id}`;
    try {
      return fetchGetAuthorizedData(url);
    } catch (e) {
      console.error(`Error fetching tour with ID ${id}:`, e);
      return null;
    }
  });

  const results = await Promise.all(blogRequests);
  return results.filter((result): result is IBlogResponse => result !== null);
};

export const fetchGetBlogs = async (): Promise<IBlogResponse[]> => {
  let url = `/blog`;
  return fetchGetAuthorizedData(url);
};


export const fetchGetAccounts = async (): Promise<User[]> => {
  let url = `/account`;
  return fetchGetAuthorizedData(url);
};

export const fetchGetBlog = async (
  blogId: string
): Promise<IBlogDetailResponse> => {
  let url = `/blog/${blogId}`;
  return fetchGetAuthorizedData(url);
};

const fetchGetAuthorizedData = async (url: string) => {
  console.log("url server get ", BASE_URL + url);
  const res = await fetch(BASE_URL + url, {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${getSessionId()}`,
    },
    cache: "no-cache",
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = await res.json();
  return data;
};
