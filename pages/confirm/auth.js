import redirect from 'nextjs-redirect'

const Redirect = redirect('https://m-duka.vercel.app/')

export default () => (
  <Redirect>
    {/* <MyLayout>Redirecting </MyLayout> */}
    <h1>Redirecting to shopping page</h1>
  </Redirect>
)