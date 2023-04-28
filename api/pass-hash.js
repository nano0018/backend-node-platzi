const bcrypt = require('bcrypt');

const myPassword = 'letsHackIt';
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};
hashPassword(myPassword).then(res => console.log(res));
