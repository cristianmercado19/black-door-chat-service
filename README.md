# basic-package

## Init
Initialize `package.json` file

### Command
>`npm init`

### Result
https://www.screencast.com/t/5c5Ej5J4Y

## Install typescript

### Installation 

#### Command
>`npm i typescript -D`

#### Result
https://www.screencast.com/t/zwZJDGwfpa

### Generate tsconfig.json
The presence of a `tsconfig.json` file in a directory indicates that the directory is the root of a TypeScript project. 
The `tsconfig.json` file specifies the root files and the compiler options required to compile the project.

#### Pre-requirements
>`npm i -g typescript -D`
>`npm i -g typings -D`

#### Result
https://www.screencast.com/t/kWOlm8Ce


#### Command
> `tsc --init`

#### Result
https://www.screencast.com/t/AF8rNqW4

### Updating D:\Repositories\basic-package\tsconfig.json

* `"lib": ["es2015", "es2017", "dom"],`
* `"declaration": true,`
* `"outDir": "./dist",`

### Create folders

#### Command
> `md lib`
> `md dist`


### Update .gitignore

Copy file

### Create index.ts
Create first file inside `lib` folder

Add any TS code

### Configure the build command

* Edit package.json
https://www.screencast.com/t/2HOwzSZwC

* `npm run build`
https://www.screencast.com/t/6hefZbOVr


### Configure Tests

* Add `test` folder
* `npm i mocha -D`
* `npm i chai -D`
* `npm i ts-node -D`
* `npm i @types/chai -D`
* `npm i @types/mocha -D`
* `npm i ignore-styles -D`
* `npm i jsdom -D`
* `npm i jsdom-global -D`
* edit package json
`"test": "mocha -r ts-node/register -r ignore-styles -r jsdom-global/register lib/**/*.spec.ts",`

https://www.screencast.com/t/WvdSbSLD

