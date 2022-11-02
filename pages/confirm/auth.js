/* eslint-disable react/display-name */
import redirect from 'nextjs-redirect';

const Redirect = redirect('http://localhost:3005/m-auth/authenticate/callback');

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Redirect>
    <h1>Redirecting to shopping page</h1>
  </Redirect>
);
