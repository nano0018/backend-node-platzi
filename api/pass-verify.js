const bcrypt = require('bcrypt');

const myPassword = 'letsHackIt';
const hash = '$2b$10$VwDCSkulRO.e/M2DDOXLA.WkBXZlUOf5KqF7f5YQyNZ72vQJaFmCa';
const verifyPassword= async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
verifyPassword(myPassword, hash).then(res => console.log(res));
