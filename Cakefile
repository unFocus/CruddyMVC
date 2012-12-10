# Building CruddyMVC requires typescript and uglify-js. For
# help installing, try:
#
# `npm install typescript uglify-js`
#
fs               = require 'fs'
path             = require 'path'
{print}          = require 'sys'
{exec}           = require 'child_process'
#{parser, uglify} = require 'uglify-js'

javascripts = {
  'CruddyMVC/CruddyMVC.js': [
    'src/SignalLite.js'
    'src/Signal.js'
    'src/Cruddy.ts'
  ]
}

task 'build', 'build CruddyMVC', (options) ->
  code = exec 'tsc @build'
  code.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  code.stdout.on 'data', (data) ->
    print data.toString()

task 'watch', 'watch for changes to CruddyMVC', (options) ->
  code = exec 'tsc @watch'
  code.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  code.stdout.on 'data', (data) ->
    print data.toString()
