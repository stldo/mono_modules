#!/usr/bin/env node

const { Command } = require('commander')

const init = require('./init')
const install = require('./install')
const update = require('./update')

new Command('mono_modules')
  .addCommand(init)
  .addCommand(install)
  .addCommand(update)
  .parse()
