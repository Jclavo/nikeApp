export class LocationModel {
    public id?: string;
    public latitude: string;
    public longuitude: string;
    public name: string;
    public active: boolean;

    constructor(id: string, name: string, latitude: string, longuitude: string, active: boolean)
    {
        this.id = id,
        this.name = name,
        this.latitude = latitude,
        this.longuitude = longuitude,
        this.active = active
    }

}
