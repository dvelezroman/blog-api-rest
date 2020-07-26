const Session = require('../../models').Session;

module.exports.isAuthorized = async function (req, res, next) {
	const sessionForUserSelected = await Session.findAll({
		where: {
			userId: req.params.userId || req.body.userId,
			status: true,
		},
	});
	if (sessionForUserSelected.length) {
		return next();
	}
	res.status(200).json({
		status: false,
		message: 'User Not Authenticated',
	});
};
