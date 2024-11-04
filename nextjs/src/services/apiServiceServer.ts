const BASE_URL = process.env.NEXT_PUBLIC_URL_API_LOCALHOST;

export const fetchGetTours = async (): Promise<any> => {
  let url = `/tours`;
  return fetchGetAuthorizedData(url);
};

export const fetchGetToursByIds = async (  listId: number[]): Promise<ITourResponse[]> => {
  const tourRequests = listId.map((id) => {
    const url = `/tours/${id}`;
    return fetchGetAuthorizedData(url).catch((error) => {
      console.error(`Error fetching tour with ID ${id}:`, error);
      return null;
    });
  });

  const results = await Promise.all(tourRequests);
  return results.filter(
    (result): result is ITourResponse => result !== null
  );
};

export const fetchGetTour = async (tourId: string): Promise<any> => {
  let url = `/tours/${tourId}`;
  return fetchGetAuthorizedData(url);
};
const delay = (ms: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const fetchGetAuthorizedData = async (url: string) => {
  console.log("url server get ",BASE_URL + url)
  const res = await fetch(BASE_URL + url, {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${getSessionId()}`,
    },
    cache: 'no-cache',
  });
  // await delay(1000);
  const data = await res.json();
  return data;
};
