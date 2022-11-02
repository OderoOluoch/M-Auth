export default async function handler(req, res) {
  console.log('req', req);
  if (req.method == 'GET') {
    res.status(200).json({ info: 'get info' });
  }
  // post request
  if (req.method == 'POST') {
    //path: /auth/:session_id/otp
    try {
      res.status(200).json({
        message: 'OTP sent successfully',
      });
    } catch (error) {
      console.log('error', error);
      res.status(400).json(new Error(error));
    }
  }
}
