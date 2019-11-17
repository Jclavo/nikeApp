export class ItemModel {

    public id?: string;
    public name: string;
    public phone: string;
    public address: string;
    public price: number;
    public location: string;
    public latitude: string;
    public longitude: string;
    public comments: Array<string>;
    public websites: Array<string>;
    public rating: number

    constructor(id: string,
        name: string,
        phone: string,
        address: string,
        price: number,
        location: string,
        latitude: string,
        longitude: string,
        comments: Array<string>,
        websites: Array<string>,
        rating: number) {

        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.price = price;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.comments = comments;
        this.websites = websites;
        this.rating = rating;
    }

    // constructor()
    // {

    // }


}
