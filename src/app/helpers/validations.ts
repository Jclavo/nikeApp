export class Validation {

    isEmptyString(value: string)
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
}
