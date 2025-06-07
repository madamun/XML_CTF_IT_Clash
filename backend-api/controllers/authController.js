const xpath = require('xpath');
const { DOMParser } = require('xmldom');
const { loadUsersXML, escapeHtml } = require('../helpers/xmlUtils');

exports.getLoginInfo = (req, res) => {
  res.status(200).json({
    message: "Authentication endpoint. Please POST credentials to /api/auth/login.",
    note: "The GET /api/auth/login endpoint is for informational purposes. Use your frontend UI for the login form."
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required." });
  }

  const usersXML = loadUsersXML();
  const doc = new DOMParser().parseFromString(usersXML, 'text/xml');
  const query = `//user[username/text()='${username}' and password/text()='${password}']`;
  console.log("[AuthAPI] Executing XPath Query:", query);

  try {
    const result = xpath.select(query, doc);
    if (result.length > 0) {
      const userNode = result[0];
      const usernameNode = xpath.select1("username/text()", userNode);

      if (usernameNode) {
        const userData = { username: usernameNode.nodeValue };
        console.log("[AuthAPI] Login successful, user data:", userData);
        return res.json({
          success: true,
          message: `Login successful for ${userData.username}!`,
          user: userData,
          flag: userNode.textContent,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Server error: Malformed user data in storage. Please contact admin."
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password. Or your XPath injection failed!"
      });
    }
  } catch (error) {
    console.error("[AuthAPI] XPath Error:", error.message);
    return res.status(400).json({
      success: false,
      message: `XPath syntax error: ${escapeHtml(error.message)}`
    });
  }
};

exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Failed to logout." });
      }
      return res.json({ success: true, message: "Successfully logged out (session destroyed)." });
    });
  } else {
    return res.json({ success: true, message: "Logged out (stateless - client should clear token)." });
  }
};