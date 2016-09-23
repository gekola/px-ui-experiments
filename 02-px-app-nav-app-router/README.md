# 01. `px-login` with UAA

A minimal Node.js app with UAA login.

## Setup

    npm install
    bower install
    cf cs predix-uaa Tiered uaa1 -c '{"adminClientSecret": "secret"}'
    cf service uaa1 --guid

(Replace `uaa1` with UAA instance name and `secret` with a secure password for your admin client.)

After running commands above create UAA client and user for authentication in Predix dashboard or with UAAC.

## Run

    UAA_SERVER_URL=https://UAA-GUID.predix-uaa.run.aws-usw02-pr.ice.predix.io CLIENT_ID=client CLIENT_SECRET=secret grunt serve

Here `client` is the UAA client created in the Setup section and `secret` is its secret (not admin client secret).
`UAA_GUID` can be retrieved with the last command in setup section.
