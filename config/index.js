const dev = process.env.NODE_ENV !== 'production';

export const server = dev
  ? 'http://localhost:3000'
  : 'https://m-duka.vercel.app';

export const getUrl = (path = '') => {
  if (path) {
    return `https://apistg.safaricom.co.ke/v1/m-auth/${path}`;
  }
  return 'https://apistg.safaricom.co.ke/v1/m-auth/';
};
