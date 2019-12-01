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
    public socialNetworks: Array<string>;
    public rating: number;
    public images: Array<string>;
    public test: boolean;

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
        socialNetworks: Array<string>,
        rating: number,
        images: Array<string>,
        test: boolean
    ) {

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
        this.socialNetworks = socialNetworks;
        this.rating = rating;
        this.images = images;
        this.test = test;
    }

    private isEmptyString(value: string)
    {
        //undefined
        if(value === undefined) return true;

        //null
        if(value === null) return true;

        // delete blank spaces
        value = value.trim();
        // empty
        if(value.length === 0) return true;

        return false;
    }

    private isEmptyArray(value: Array<any>)
    {
        //undefined
        if(value === undefined) return true;

        //null
        if(value === null) return true;

        // empty
        if(value.length === 0) return true;

        return false;
    }
}
