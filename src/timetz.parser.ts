import moment from "moment";
import { Parser } from "./parser.interface";

class TimeTzParser implements Parser {
    execute(value: string): string {

        if(!value) {
            return null;
        }
        if(!([8,11, 14].includes(value.length))) {
            throw new Error(`Time invalid format. Exemple valid format: 01:34:17-00:00`);
        }
        return moment(moment().format('YYYY-MM-DD') + ' ' + value).format('HH:mm:ssZ');
    }
}

export default new TimeTzParser();
