import TourWrap from "@/components/tourWrap";
import { fetchGetTour, fetchGetToursByIds } from "@/services/apiServiceServer";
import React from "react";

// Define an interface for the params
interface Params {
  id: string;
}

const PageTour = async ({ params }: { params: Params }) => {
  if (!params?.id) throw new Error("Tour ID is missing.");

  try {
    const tour: ITourDetailResponse = await fetchGetTour(params.id);
    let toursRelated: ITourResponse[] = [];

    if (Array.isArray(tour.relatedIds) && tour.relatedIds.length > 0) {
      toursRelated = await fetchGetToursByIds(tour.relatedIds);
    }

    return (
      <>
        <TourWrap toursRelated={toursRelated} tour={tour} />
      </>
    );
  } catch (error) {
    console.error(error);
    return (
      <div>
        Error fetching tours:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }
};

export default PageTour;
