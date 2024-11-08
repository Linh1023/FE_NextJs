interface ITourResponse{
    title:string;
    id:number
    duration:number;
    startLocation:string;
    departureTime:string;
    departureDate:string;
    originalPrice:number;
    discountedPrice:number;
    imageUrls: string[];
    code:string;
}