import GoogleTag from './GoogleTag.js';

module.exports = new GoogleTag();

// Load this 1ms after this.
setTimeout(module.exports._loaded, 1);
