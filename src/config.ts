import * as admin from 'firebase-admin';

const serviceAccount = require('../pushnotificationnl-firebase-adminsdk-q5n1c-83a4919537.json');

console.log('DATA', serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pushnotificationnl.firebaseio.com',
});

export default admin;
