#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import * as httpm from 'typed-rest-client/HttpClient';
import program from 'commander';
import * as data from './user.json'

clear();
// tslint:disable-next-line: no-console
console.log(
  chalk.red(
    figlet.textSync('iptracker', { horizontalLayout: 'full' })
  )
);
const user :string = data.email
program
  .version('0.0.1')
  .description("An example CLI for sending IP")
  .requiredOption('-u, --user <email> ', 'script user', user )
  .parse(process.argv);

let iptracker = async () => {
        const httpc = new httpm.HttpClient('');
        let res: httpm.HttpClientResponse = await httpc.get('https://api.my-ip.io/ip');
        let body: string = await res.readBody();
        if (program.user.length > 0) {
          console.log(program.user + " has ip of " + body )
        }
      }
iptracker()