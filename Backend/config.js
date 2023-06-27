require('dotenv').config()
const cfg = {};
cfg.port = process.env.PORT || 8000;
cfg.secret = process.env.APP_SECRET || 'Mercor';
cfg.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || 'ACa1b97b2067cf53d969ac42d8a8a8b827';
cfg.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || '3456922b65d542853f412357f5854664';
cfg.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '+13612823581';
cfg.mongoAtlasURI = process.env.MONGOLAB_URI || 'mongodb+srv://imaraUser:imara123@imara-health2.l2kxkzz.mongodb.net/';
module.exports = cfg;