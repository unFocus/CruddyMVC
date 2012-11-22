# Building CruddyMVC requires typescript and uglify-js. For
# help installing, try:
#
# `npm -g install typescript uglify-js`
#
fs               = require 'fs'
path             = require 'path'
{spawn, exec}    = require 'child_process'
TypeScript       = require 'typescript'
{parser, uglify} = require 'uglify-js'

javascripts = {
  'CruddyMVC/CruddyMVC.js': [
    'src/SignalLite.js'
    'src/Signal.js'
    'src/Cruddy.ts'
  ]
}
