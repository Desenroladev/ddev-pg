import moment from "moment";
import { Parser } from "./parser.interface";

class TimestampTzParse implements Parser {
    execute(value: string): string {

        if(!value) {
            return null;
        }
        if(!([19, 22, 25].includes(value.length))) {
            throw new Error(`Timestamp invalid format. Exemple valid format: 2001-07-03T01:34:17-00:00`);
        }
        return moment(value).format();
    }
}

export default new TimestampTzParse();
