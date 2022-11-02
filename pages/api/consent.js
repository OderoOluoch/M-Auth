export default async function handler(req, res) {
  console.log('req', req);
  if (req.method == 'GET') {
    //path: /auth/:session_id/consent
    try {
      res.status(200).json({
        application: {
          client_id: 'm-duka',
          name: 'M-duka',
          description: 'M-Duka Online Shopping',
          callback_url: 'http://localhost:3005',
          redirect_url:
            'http://localhost:3005/auth/mauth/callback,http://localhost:3000/auth/callback',
          date_registered: null,
          status: 'A',
        },
        scopes: [
          {
            name: 'read:customer.info',
            description: 'Read your KYC information',
          },
          {
            name: 'authorize:transactions',
            description: 'Initate Checkout transactions',
          },
        ],
        transaction: null,
      });
    } catch (error) {
      console.log('error', error);
      res.status(400).json(new Error(error));
    }
  }
}
