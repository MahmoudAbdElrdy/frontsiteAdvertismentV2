export class CreatUpdtaeHomeSliderDto {
    id:number;
    imageURL:string;
    homeSliderContent:HomeSliderContentDto[];
}

export class HomeSliderContentDto {
    id:number;
    content:string;
}
