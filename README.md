# Code Template for TDD with AngularJS and Jest

This is a code template for writing tests against an AngularJS-based app as
a tool to learn more about promises.

## Setup

Install the dependencies in the app as well as Jest globally:

```
cd promise-tdd
npm install
npm install jest -g
```

## Start

To start the TDD experience:

```
jest --watch
```

Add new spec files of the form: `MODULENAME.spec.ts` to the `__tests__` folder to add them to the test suite and they'll get executed. You can write tests in TypeScript.