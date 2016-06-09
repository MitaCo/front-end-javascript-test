#!/usr/bin/env node
var path = require('path');
var localModulesDir = __dirname;

require('babel-core/register')({
  presets: ["es2015", "stage-0"],
  resolveModuleSource: require('babel-resolver')(localModulesDir)
});

require('babel-register')
require('babel-polyfill')
require('ignore-styles')

require.extensions['.png'] = function(){}
require.extensions['.jpg'] = function(){}
require.extensions['.sass'] = function(){}

var path = require('path')

var glob = require('glob-all')
var tests = [
  './**/*.test.js',
  '!./node_modules/**/*',
]

glob(tests, function (er, files) {
  if (er) throw er

  files.forEach(function (file) {
    console.log('file', file)
    require(path.resolve(process.cwd(), file))
  })
})
