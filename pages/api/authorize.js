export default async function handler(req, res) {
  console.log('req', req);
  if (req.method == 'GET') {
    res.status(200).json({ info: 'get info' });
  }
  // post request
  if (req.method == 'POST') {
    //path: auth/authorize
    try {
      res.status(200).json({
        session_id: '3012d085-8dad-456b-a003-71fa979d3a1b',
      });
    } catch (error) {
      console.log('error', error);
      res.status(400).json(new Error(error));
    }
  }
}
