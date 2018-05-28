# VSTS Dashboard

[![CircleCI](https://circleci.com/gh/emisgroup/vsts-dashboard.svg?style=svg)](https://circleci.com/gh/emisgroup/vsts-dashboard) [![codecov](https://codecov.io/gh/emisgroup/vsts-dashboard/branch/master/graph/badge.svg)](https://codecov.io/gh/emisgroup/vsts-dashboard)

A dashboard to show the status of Visual Studio Team Service builds

## Pre-requisitives

* [Node >= 4.4.7 LTS](https://nodejs.org)
* [typescript (tsc) >= 1.8](https://www.npmjs.com/package/typescript)
* Please note that the [CircleCI build](https://circleci.com/gh/emisgroup/vsts-dashboard) runs on Node 8.11 LTS

## Development

* Clone the repo via your preferred method
* Run `npm install` or `make install`
* Run `npm start` or `make run`
* Navigate to http://localhost:3000 to see the running dashboard

## Docker

* In your cloned repo, run the following command:

```bash
docker build -t vsts-dashboard:latest .
```

or

```bash
make docker-build
```

* When the image is built, run the container with:

```bash
docker run -d --name vsts-dashboard -p 8080:80 vsts-dashboard
```

* Then navigate to http:localhost:8080 and configure the dashboard with your Visual Studio Team Services details
