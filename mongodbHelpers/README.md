# mongodbHelpers

JS library mongodbHelpers

## Location

### Source code
https://github.com/tactik8/mongodbHelpers

### repl.it
https://replit.com/@tactik8/mongodbHelpers

## Install

### From github
```
git clone https://github.com/tactik8/mongodbHelpers ./utils/mongodbHelpers
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


### make available to import  
#### add in package.json 
``` 
imports: {
    "#mongodbHelpers": "./utils/mongodbHelpers/mongodbHelpers/mongodbHelpers.js",
}
```

#### or in html file
```
<script type="importmap">
    {
      "imports": {
        "#dataHelpers": "/utils/mongodbHelpers/mongodbHelpers/mongodbHelpers.js"
      }
    }
  </script>


```

### in code

```
import { mongodbHelpers as m } from '#mongodbHelpers'

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





