export class ItemModel {

    public id?: string;
    public name: string;
    public phone: string;
    public address: string;
    public price: number;

    // constructor(id: string,
    //     name: string,
    //     phone: string,
    //     address: string,
    //     price: number) {

    //     this.id = id;
    //     this.name = name;
    //     this.phone = phone;
    //     this.address = address;
    //     this.price = price;
    // }

    constructor() {
    }

    load(id: string,
        name: string,
        phone: string,
        address: string,
        price: number) {

        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.price = price;
    }
}