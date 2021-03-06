global.debug = require('debug')('app:global')
const config = require('./config')
const bus = require('./bus')
const store = require('./store')(config, bus)
const miner = require('./miner')(config, bus, store)
require('./server')(config, bus, store, miner).start()

if (config.demoMode) {
  miner.mine(store.wallets[0])
} else {
  require('./peers')(config, bus, store).start() // Connect to peers and recieve connections
}
