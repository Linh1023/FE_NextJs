import TourListWrap from "@/components/listTourWrap";
import { fetchGetTours } from "@/services/apiServiceServer";
import React from "react";

const PageListTour = async () => {
 
  try {
    const tourCards: ITourResponse[] = await fetchGetTours();
    return (
      <>
        <TourListWrap tourCards={tourCards}/>;
      </>
    );
  } catch (error) {
    console.error(error);
    return <div>Error fetching d</div>;
  }
};
export default PageListTour;
