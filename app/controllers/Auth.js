/* auth controllers */

class Auth {
  home = (req, res) => {
    res.send("<h1>Wellcome to web server 1</h1>");
  }
}

export default new Auth();