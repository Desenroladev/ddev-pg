import moment from "moment";
import { Parser } from "./parser.interface";

class TimeParser implements Parser {
    execute(value: string): string {

        if(!value) {
            return null;
        }
        if(!([8].includes(value.length))) {
            throw new Error(`Time invalid format. Exemple valid format: 01:34:17`);
        }
        return moment(moment().format('YYYY-MM-DD') + ' ' + value).format('HH:mm:ss');
    }
}

export default new TimeParser();
