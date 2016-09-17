# Overview

[![Version](https://img.shields.io/npm/v/gpt-mock.svg)](http://npmjs.com/package/gpt-mock)
[![License](https://img.shields.io/npm/l/gpt-mock.svg)](http://npmjs.com/package/gpt-mock)
[![Build Status](https://travis-ci.org/krux/gpt-mock.svg?branch=master)](https://travis-ci.org/krux/gpt-mock)
[![Code Climate](https://img.shields.io/codeclimate/github/krux/gpt-mock.svg)](https://codeclimate.com/github/krux/gpt-mock)
[![Coverage](https://img.shields.io/coveralls/krux/gpt-mock.svg)](https://coveralls.io/github/krux/gpt-mock)
[![Dependencies](https://img.shields.io/david/dev/krux/gpt-mock.svg)](./package.json)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A test library to mock out the Google Publisher Tag library.

## Installation

You can include `gpt-mock` using *npm*:

```console
npm install --save-dev gpt-mock
```

## Accessing

### ES6/ES2015

```javascript
import GPT from 'gpt-mock';
```

### AMD

```javascript
define(['gpt-mock'], function(GPT) {

});
```

### CommonJS

```javascript
var GPT = require('gpt-mock');
```

## Usage

This library is used to mock out the Google Publisher Tag (GPT) library, so the most natural
way to use this would be:

```javascript
window.googletag = new GPT();
```

Note that the instance is left as "unloaded", meaning `apiReady` will be false, and `googletag.cmd.push` will only accumulate the functions.

To mark the tag library as having been loaded, use the following:

```javascript
window.googletag._loaded();
```

This library is intended to be as API-compatible as possible with the production code.  Any member
that starts with an underscore (`_`) is not part of the API and is a mock implementation detail.

# Help/Bugs/Requests

We ♥ bug reports.

Have a problem? Need help? Would you like additional functionality added? We use GitHub's ticket system for keeping track of these requests.

Please check out the [existing issues](https://github.com/krux/gpt-mock/issues), and if you don't see that your problem is already being
worked on, please [file a new issue](https://github.com/krux/gpt-mock/issues/new). The more information the better to describe your problem.

# Contributing

We ♥ [forks and pull requests](https://help.github.com/articles/using-pull-requests).

Please see [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for full details.

## Environment

The project requires nodejs (>=5.6) and npm (>=3.6.0) for development. It has no runtime dependencies.

## Developing

Check the code out and install the development dependencies using:

```console
npm install
```

### Building

To build the code, run

```console
npm run build
```

### Linting

We use ESLint and JSCS to do static analysis of the JavaScript and keep things smelling good.  To run both, use:

```console
npm run lint
```

### Testing

Using [travis-ci](https://travis-ci.org), the [Mocha](http://mochajs.org) unit tests are run on every commit using PhantomJS to run the tests
with a real browser.

To test the code locally, you can use:

```console
npm test
```

To run tests in Test-Driven-Development mode, where the test will be run after every change, use:

```console
npm run tdd
```

## Issue Guidelines

Please either add a failing [unit test](./test/unit) or include a [jsfiddle](http://jsfiddle.net) that distills and reproduces the issue.

# License

See [LICENSE](LICENSE).

Some of the documentation incorporated into this source code is based on the [Google documentation](https://developers.google.com/doubleclick-gpt/reference) which is licensed under the [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/).  Some of the material may have been modified for use in this library.  Copyright of the incorporated documentation remains Google, Inc.  Google is a registered trademark of Google and/or its affiliates and this project is not intended to represent that Google endorses this library.
