
export class AlertService {

    isEmptyString(value: string)
    {
        //undefined
        if(value === undefined) return true;

        // delete blank spaces
        value = value.trim();
        // empty
        if(value.length === 0) return true;


        return false;
    }
}
