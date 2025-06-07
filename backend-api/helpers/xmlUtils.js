const fs = require('fs');
const path = require('path');

const usersXMLPath = path.join(__dirname, '../data/users.xml');

exports.loadUsersXML = () => {
  try {
    return fs.readFileSync(usersXMLPath, 'utf8');
  } catch (err) {
    console.error(`[FATAL] Could not read users.xml from ${usersXMLPath}`);
    process.exit(1);
  }
};


exports.escapeHtml = (unsafe) => {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, "q")
    .replace(/'/g, "'");
};


