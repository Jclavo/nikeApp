export class LocationModel {
    public id?: string;
    public latitude: string;
    public longitude: string;
    public name: string;
    public active: boolean;

    constructor(id: string, name: string, latitude: string, longitude: string, active: boolean)
    {
        this.id = id,
        this.name = name,
        this.latitude = latitude,
        this.longitude = longitude,
        this.active = active
    }

}
