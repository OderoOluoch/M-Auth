/* eslint-disable react/display-name */
import redirect from 'nextjs-redirect';
import { useRouter } from 'next/router';

const Redirect = redirect('http://localhost:3005/m-auth/authenticate/callback');
const Redirect1 = redirect(
  'http://localhost:3005/m-auth/authenticate/callback1'
);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { query } = useRouter;

  return (
    <Redirect1>
      <h1>Redirecting ...</h1>
    </Redirect1>
  );
};
