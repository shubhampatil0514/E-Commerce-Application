const AccessControl = require('accesscontrol');
const ac = new AccessControl();

ac.grant('admin')
  .createAny('Product'); 

