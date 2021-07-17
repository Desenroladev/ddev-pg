import moment from "moment";
import { Parser } from "./parser.interface";

class DateParser implements Parser {
    execute(value: string): string {
        if(!([10].includes(value.length))) {
            throw new Error(`Date invalid format. Exemple valid format: 2001-10-13`);
        }
        return value == null ? null : moment(value).format('YYYY-MM-DD');
    }
} 

export default new DateParser();
