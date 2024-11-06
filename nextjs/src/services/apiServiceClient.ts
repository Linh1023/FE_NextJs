const url_api = process.env.NEXT_PUBLIC_URL_API;

export const fetchGetTour = async (
  tourId: string
): Promise<ITourDetailResponse> => {
  let url = `/tour/${tourId}`;
  return fetchGetAuthorizedData(url);
};
export const fetchGetTours = async (): Promise<ITourResponse[]> => {
  let url = `/tour`;
  return fetchGetAuthorizedData(url);
};

export const fetchGetBlogs = async (): Promise<IBlogResponse[]> => {
  let url = `/blog`;
  return fetchGetAuthorizedData(url);
};

export const fetchGetBlog = async (
  blogId: number
): Promise<IBlogDetailResponse> => {
  let url = `/blog/${blogId}`;
  return fetchGetAuthorizedData(url);
};


const fetchGetAuthorizedData = async (url: string): Promise<any> => {
  try {
    console.log("url client get", url_api + url);
    const res = await fetch(url_api + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // Logger.error((error as Error).message);
    throw error;
  }
};

const fetchPostAuthorizedData = async (url: string, bodyData: any) => {
  try {
    const res = await fetch(url_api + url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    // console.error("Error fetching data:", error);
  }
};

// export const fetchPostTour = async (newData: ITourRequest): Promise<any> => {
//   const url = "/tour";
//   return fetchPostAuthorizedData(url, newData);
// };

const fetchPutAuthorizedData = async (
  url: string,
  bodyData: any
): Promise<any> => {
  try {
    const res = await fetch(url_api + url, {
      method: "PUT", // Đúng phương thức PUT
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json", // Đặt Content-Type là JSON
      },
      body: JSON.stringify(bodyData), // Gửi dữ liệu JSON
    });

    const data = await res.json();
    return data;
  } catch (error) {
    // console.error("Error in fetching:", error);
  }
};

// export const fetchPutTour = async (
//   tourId: string,
//   updateData: ITourRequest
// ): Promise<any> => {
//   const url = `/tour/${tourId}`;
//   return fetchPutAuthorizedData(url, updateData);
// };
