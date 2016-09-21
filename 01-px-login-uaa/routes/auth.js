const { Router } = require('express');
const request = require('request');
const { UAA_SERVER_URL, CLIENT_ID, CLIENT_SECRET } = require('../config');

const router = Router();

router.get('/login', (req, res) => {
  // TODO: Hardcode/check host otherwise you'll risk leaking UAA token
  const redirectUri = req.protocol + '://' + req.get('Host') + '/auth_callback';
  res.redirect(`${UAA_SERVER_URL}/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&state=${req.query.state}`);
});

router.get('/auth_callback', (req, res) => {
  const redirectUri = req.protocol + '://' + req.get('Host') + '/auth_callback';
  const auth = {
    user: CLIENT_ID,
    pass: CLIENT_SECRET
  };

  request.post({
    url: `${UAA_SERVER_URL}/oauth/token`,
    auth,
    form: {
      code: req.query.code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      state: req.query.state
    }
  }, (err, response, body) => {
    const authData = JSON.parse(body);
    let token;

    if (!err && !authData.error) {
      token = req.session.authToken = authData.access_token;

      request.post({
        url: `${UAA_SERVER_URL}/check_token`,
        auth,
        form: {
          redirect_uri: redirectUri,
          token
        }
      }, (err, response, body) => {
        if (!err) {
          req.session.userInfo = JSON.parse(body);
        }
        res.redirect(req.query.state);
      });

    } else {
      res.redirect('/login');
    }
  });
});

router.get('/userinfo', (req, res) => {
  res.send(req.session.userInfo);
});

router.get('/logout', (req, res) => {
  const redirectUri = req.protocol + '://' + req.get('Host') + '/';
  req.session.destroy((err) => {
    res.redirect(`${UAA_SERVER_URL}/logout?redirect=${redirectUri}`);
  });
});

module.exports = router;
