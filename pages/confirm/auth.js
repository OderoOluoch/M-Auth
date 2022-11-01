import redirect from 'nextjs-redirect'

const Redirect = redirect('http://localhost:3000')

export default () => (
  <Redirect>
    {/* <MyLayout>Redirecting </MyLayout> */}
    <h1>Redirecting to shopping page</h1>
  </Redirect>
)