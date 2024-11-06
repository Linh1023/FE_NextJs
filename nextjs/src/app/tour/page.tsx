import TourListWrap from "@/components/tour/listTourWrap";
import { fetchGetTours } from "@/services/apiServiceServer";

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
