#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const figlet_1 = __importDefault(require("figlet"));
const httpm = __importStar(require("typed-rest-client/HttpClient"));
const commander_1 = __importDefault(require("commander"));
const data = __importStar(require("./user.json"));
clear_1.default();
// tslint:disable-next-line: no-console
console.log(chalk_1.default.red(figlet_1.default.textSync('iptracker', { horizontalLayout: 'full' })));
const user = data.email;
commander_1.default
    .version('0.0.1')
    .description("An example CLI for sending IP")
    .requiredOption('-u, --user <email> ', 'script user', user)
    .parse(process.argv);
let iptracker = () => __awaiter(void 0, void 0, void 0, function* () {
    const httpc = new httpm.HttpClient('');
    let res = yield httpc.get('https://api.my-ip.io/ip');
    let body = yield res.readBody();
    if (commander_1.default.user.length > 0) {
        console.log(commander_1.default.user + " has ip of " + body);
    }
});
iptracker();
