function adminMiddleware(req, res, next){
    if(typeof req.session.loggedUser == "undefined" || req.session.loggedUser.type != 0){    
        return res.redirect("/admin/nop");
    } else{
        next();
    }
}

module.exports = adminMiddleware;