export class CommentModel {

    public id?: string;
    public comment: string;
    public item_id: string;

    constructor(id: string, comment: string,item_id: string)
    {
        this.id = id;
        this.comment = comment;
        this.item_id = item_id;
    }

}