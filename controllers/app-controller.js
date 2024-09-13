const asyncHandler = require("express-async-handler");

exports.app_get = asyncHandler(async (req, res, next) => {
  res.render("home", { user: req.user });
});
