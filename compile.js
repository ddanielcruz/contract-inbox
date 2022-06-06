const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const inboxFile = fs.readFileSync(inboxPath, 'utf-8')
module.exports = solc.compile(inboxFile, 1).contracts[':Inbox']
