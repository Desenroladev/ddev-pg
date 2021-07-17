import moment from "moment";
import { Parser } from "./parser.interface";

class TimestampParser implements Parser {
    execute(value: string): string {

        if(!value) {
            return null;
        }
        if(!([19].includes(value.length))) {
            throw new Error(`Timestamp invalid format. Exemple valid format: 2001-07-03T01:34:17`);
        }
        return moment(value).format('YYYY-MM-DDTHH:mm:ss');
    }
}

export default new TimestampParser();
