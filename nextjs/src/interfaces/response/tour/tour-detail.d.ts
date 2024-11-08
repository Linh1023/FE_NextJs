interface ITourDetailResponse {
  title: string;
  id: number;
  duration: number;
  startLocation: string;
  departureTime: string;
  departureDate: string;
  originalPrice: number;
  discountedPrice: number;
  code: string;
  timeLine: IDay[];
  imageUrls: string[];
  relatedIds: number[];
}
interface IDay {
  title: string;
  description: String;
}
