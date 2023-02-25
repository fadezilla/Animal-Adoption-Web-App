module.exports = {
    checkIfAuthorized: function(req, res, next) {
        if(req.user == null){
            res.status(401).send(new Error());
            return;
        }
        if(req.user.role == "admin" || req.user.role == "member")
        next();
    },
    isAdmin: function(req, res, next) {
        if(req.user.role === "admin") {
            next();
            return;
        }
        else {
            res.status(401).send(new Error());
        }
    },
    canSeeUserDetails: function(req, res, next) {
        if (req.user != null)
        if(req.user.role === "admin" || req.user.id == req.params.userId) {
            next()
            return;
        }
        res.redirect('/login');
    },
    canSeeUserList: function (req, res, next) {
        if (req.user != null)
          if(req.user.role === "admin") {
            next()
            return;
          }
        res.redirect('/login');
      }
}