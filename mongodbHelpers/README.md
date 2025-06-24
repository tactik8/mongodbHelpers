# mongodbHelpers

JS library mongodbHelpers

## Location

### Source code
https://github.com/tactik8/observationHelpers

### repl.it
https://replit.com/@tactik8/observationHelpers


## Install

### From github
```
git clone https://github.com/tactik8/observationHelpers ./helpers
```

## Test and publish

```
npm install --save-dev jest

npm install --save-dev babel-jest @babel/core @babel/preset-env
npm install --save-dev jest-environment-jsdom

node --experimental-vm-modules node_modules/.bin/jest

npx parcel build
npm adduser
npm publish

```





## How to use

```
import { mongodbHelpers as m } from './helpers/mongodbHelpers/mongodbHelpers.js'

let db = new m.DB()

let tenant = 'tenant1'
let project = 'project1'

let record = {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "@id": "thing1",
    "name": "thing1"
}


let r = await db.set(tenant, project, record)


```

## Examples

```
'




```

## Tests

Prompt:
```
please write unit tests for all functions in arrayHelpers.js. Please separate the tests one file by function. Please consider edge cases.
```


## Running tests
node --experimental-vm-modules node_modules/.bin/jest





