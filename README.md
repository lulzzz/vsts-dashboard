# Dashboard

A dashboard to show the status of VSTS builds

## Development

Pre-requisites: [Node >= 4.4.7 LTS](https://nodejs.org) and [typescript (tsc) >= 1.8](https://www.npmjs.com/package/typescript)

Run `npm install` first

Set environment variables using set or export:

```bash
// use your URL
VSTS_URL=https://fabrikam.visualstudio.com/defaultcollection

// use your token
VSTS_TOKEN={TOKEN}

// use your project
VSTS_PROJECT=myProject
```

Run:

```bash
npm start
```

Navigate to http://localhost:3000 to see the running dashboard
