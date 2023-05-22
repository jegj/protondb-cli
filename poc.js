#!/usr/bin/env node

import terminalImage from 'terminal-image'

console.log(await terminalImage.file('header.jpg', { width: '25%', height: '25%' }))
