/*
 * Admin Controller.
 */

var AdminModel = require("../models/admin.js");

exports.getAdmins = function(req, res) {
  AdminModel.find({}, null, { sort: "id" }, function(err, admins) {
    res.send(admins);
  });
};

exports.getAdminByAddress = function(req, res) {
  AdminModel.findOne({ address: req.params.address }, "address -_id", function(err, admin) {
    res.send(admin);
  });
};
