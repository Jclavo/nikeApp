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

    constructor(id: string,
        name: string,
        phone: string,
        address: string,
        price: number,
        location: string,
        latitude: string,
        longitude: string,
        comments: Array<string>) {

        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.price = price;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.comments = comments;
    }

    // constructor()
    // {

    // }


}
