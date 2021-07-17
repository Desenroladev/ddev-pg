"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
describe('Testing Database Connection > ', function () {
    test('findAll records', function () { return __awaiter(void 0, void 0, void 0, function () {
        var sql, db, rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "select \n                        id, \n                        title, \n                        created_at,\n                        concluded,\n                        concluded_at\n                    from todo";
                    db = new src_1.Database();
                    return [4 /*yield*/, db.query(sql)];
                case 1:
                    rows = _a.sent();
                    console.log(rows);
                    return [2 /*return*/];
            }
        });
    }); });
    test('insert record', function () { return __awaiter(void 0, void 0, void 0, function () {
        var db, connection, binds, sql, res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = new src_1.Database();
                    connection = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 8]);
                    return [4 /*yield*/, db.transaction()];
                case 2:
                    connection = _a.sent();
                    binds = [
                        'Teste Automatizado',
                        '2001-07-03T01:34:17'
                    ];
                    sql = "insert into todo(title, concluded_at) values($1, $2) returning *";
                    return [4 /*yield*/, connection.execute(sql, binds)];
                case 3:
                    res = _a.sent();
                    return [4 /*yield*/, connection.commit()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 5:
                    err_1 = _a.sent();
                    if (!connection) return [3 /*break*/, 7];
                    return [4 /*yield*/, connection.rollback()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: throw err_1;
                case 8: return [2 /*return*/];
            }
        });
    }); });
    test('select DML API', function () { return __awaiter(void 0, void 0, void 0, function () {
        var sql, db, rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "select \n                        column_name, \n                        ordinal_position,\n                        data_type,\n                        udt_name,\n                        character_maximum_length,\n                        numeric_precision,\n                        is_nullable,\n                        column_default \n                    from information_schema.columns \n                    where table_name = $1\n                        and table_schema = $2\n                        and table_catalog = $3\n                    order by ordinal_position";
                    db = new src_1.Database();
                    return [4 /*yield*/, db.query(sql, ['todo', 'public', 'ddev'])];
                case 1:
                    rows = _a.sent();
                    console.log(rows);
                    return [2 /*return*/];
            }
        });
    }); });
});
