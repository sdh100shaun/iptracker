#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import * as httpm from 'typed-rest-client/HttpClient';
import program from 'commander';

clear();
// tslint:disable-next-line: no-console
console.log(
  chalk.red(
    figlet.textSync('iptracker', { horizontalLayout: 'full' })
  )
);
const user :string|undefined  = process.env.LOGNAME != null ? process.env.LOGNAME : "you"
program
  .version('0.0.1')
  .description("An example CLI for getting IP")
  .requiredOption('-u, --user <email> ', 'script user', user )
  .parse(process.argv);

type ip = {
  ip: string;
  success: boolean;
  type: string;
}
let iptracker = async () => {
        const httpc: httpm.HttpClient = new httpm.HttpClient('ip-client');
        let res: httpm.HttpClientResponse = await httpc.get('https://api.my-ip.io/ip.json');
        let body: string | void  = await res.readBody().catch((err) => {
            console.log(err);
        });
        if (body) {
            let ip: ip = JSON.parse(body);
        if (program.user.length > 0) {
          console.log(program.user + " has ip of " + ip.ip )
          }
          else {
            console.log("You have ip of " + ip.ip )
          }
      }
    }
iptracker()
