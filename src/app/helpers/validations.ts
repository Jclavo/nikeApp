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

    isEmptyArray(value: Array<any>)
    {
        //undefined
        if(value === undefined) return true;

        //null
        if(value === null) return true;

        // empty
        if(value.length === 0) return true;

        return false;
    }

    isBoolean(value: boolean) {
        if( value === true) return true;
        return false;
     }

     parseToString(value: string): string
     {
        if ( this.isEmptyString(value) ) return "";
        return value;
     }

     parseToArray(value: Array<any>): Array<any>
     {
        if ( this.isEmptyArray(value) ) return [];
        return value;
     }
}
