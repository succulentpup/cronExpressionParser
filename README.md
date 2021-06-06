# Cron-Expression-Parser
A command line tool that parses a cron parameters &amp; expands each field to human-readable format. 

Parse a cron job string to see it's expanded format

* NodeJS implementation
* Jest testing

## Install & Run
* `yarn install`
* `node index.js '*/15 0 1,5 * 1-5 /usr/bind/find'` Cron needs to passed in quotes
* `yarn run test` to run the jest tests

For example, look at the below command & it's output.

    $ node index.js */15 0 1,15 * 1-5 /usr/bin/find

    minute          0 15 30 45
    hour            0
    day of month    1 15
    month           0 1 2 3 4 5 6 7 8 9 10 11 12
    day of week     1 2 3 4 5
    command        /usr/bin/find
