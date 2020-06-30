import { Request, Response } from 'express';
import admin from '../../config';

const sendNotifications = (req: Request, res: Response): void => {
  const devicesIds: any = {
    android:
      'fpzdt4g2RyO1mTbh00-Ek_:APA91bFDBsKVodGmIhOq1ZRDAKsdlWraZ_3Dmn59CEIFc1ijPErvJ9hiqOi231uqQV9CsH5fr_PFz3pRtLvmHJSGuhPsvNlSS6wfKnDOfXbu3qTH_Z3RH1N4RFen3nPb7NNYZBsa-mg-',
    ios:
      'cTj534SeakB6pejSdJGchF:APA91bFzJaNH6R4Er5FSC6lKB-OOqcJvIfa7QFE1XeNdUIeXivw0f8R8jSbHH2tX8KcWT7kgA4HIOP26p81-bY_rHDYko_HS_5LG_HnkyTscQewgvGBLOfnz9DdDejQHdPc0bY9WEFiH',
  };

  const singleNotification = {
    notification: {
      title: req.body.title,
      body: req.body.message,
    },
    token: devicesIds[req.body.device],
  };

  admin
    .messaging()
    .send(singleNotification)
    .then((response) => {
      console.log('Successfully sent message:', response);
      res
        .status(200)
        .send({ status: 'OK', message: 'Successfully sent message' });
    })
    .catch((err) => {
      console.error('Error sending message:', err);
      res.status(500).send({ status: 'ERROR', message: err.message });
    });
};

export default { sendNotifications };
