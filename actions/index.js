import * as users from  './users.js';
import * as travel from  './travel.js';
import * as accounting from  './accounting.js';

export default {
  ...users,
  ...travel,
  ...accounting,
}
