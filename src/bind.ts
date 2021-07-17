
import DateParser from "./date.parser";
import TimestampTzParse from './timestamptz.parser';
import TimeTzParser from "./timetz.parser";

export class Bind {

  escape(value:any): any {
    if(!value.replace) {
        return value;
    }
    value = value.replace(/'/g, "''");
    value = value.replace(/\0/g, '\\0');
    value = this.parserValue(value);
    return value;
  }

  isDate(value: any) {
    if((['string','date'].includes(typeof value) || value instanceof Date) && Date.parse(value) > 0) {
      return true;
    }
    return false;
  }

  parseTimeAndDate(value: any) {
    if(this.isDate(value)) {
      if(value.length >= 19) {
        return TimestampTzParse.execute(value.substring(0, 19) + (process.env.DB_UTC || '-00:00'));
      } else if(value.length == 10) {
        return DateParser.execute(value.substring(0, 10));
      }
    }
    if([8,11,13].includes(value.length) && value.split(':').length == 3) {
      return TimeTzParser.execute(value.substring(0, 8) + (process.env.DB_UTC || '-00:00'));
    }
    return value;
  }

  parserValue = (value:any) => {
    if(!value) return value;
    try {
      return this.parseTimeAndDate(value);
    } catch(err) {
      return value;
    }
  };

  _to(values: any) : any {

    if(Array.isArray(values)) {
      return values.map(one => this.escape(one));
    }

    let newObj: any = {};
    let keys = Object.keys(values);
    if(typeof values == 'object' && keys.length > 0) {
      for(let i = 0; i < keys.length; i++) {
        if(Array.isArray(values[keys[i]])) {
          if(!newObj[keys[i]]) {
            newObj[keys[i]] = [];
          }
          for(let j = 0; j < values[keys[i]].length; j++) {
            newObj[keys[i]][j] = this._to(values[keys[i]][j]);
          }
        } else if(Object.keys(values[keys[i]]).length > 1) {
          newObj[keys[i]] = this._to(values[keys[i]]);
        } else {
          newObj[keys[i]] = this.escape(values[keys[i]]);
        }
      }
      return newObj;
    }

    return values;
  }

  toArray(values: any): any {
    if(Array.isArray(values)) {
      return values.map(one => {
        const old = this.toArray(one);
        return old;
      });
    } else if(typeof values == 'object' && Object.keys(values).length > 0) {
      return this.toArray(Object.values(values));
    } else {
      return this.escape(values);
    }
  }

  to(values: any): any {
    let newObj: any = {};
    let keys = Object.keys(values);

    if(Array.isArray(values)) {
      return values.map(one => {
        return this.to(one);
      });
    } else if(typeof values == 'object' && keys.length > 0) {
      for(let i = 0; i < keys.length; i++) {
        if(typeof values[keys[i]] == 'object' && Object.keys(values[keys[i]]).length > 0) {
          newObj[keys[i]] = this.to(values[keys[i]]);
        } else {
          newObj[keys[i]] = this.escape(values[keys[i]]);
        }
      }
      return newObj;
    } else {
      throw new Error('Values to bind is not suported.');
    }
  }

  json(values: any) : any {
    const aux = Object.values(values);
    return aux.map( (value: any) => {
      if(typeof value == 'object' && Object.keys(values).length > 0) {
        return JSON.stringify(value);
      }
      return value;
    });
  }

}

export default Bind;
