exports.portId = process.env.PORT || 5678;

exports.pathName = (exports.portId === 5678) ? 'mongodb://localhost:27017/toolbox' : 'mongodb://admin:machmango@ds127936.mlab.com:27936/heroku_htdsz891';
