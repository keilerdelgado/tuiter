import { colors } from 'styles/theme';
import { useEffect } from 'react';
import { loginWithGitHub } from 'firebase/client.js'
import Button from 'components/Button'
import GitHub from 'components/Icons/Github.js'
import Head from 'next/head'
import Logo from 'components/Icons/logo.js'
import { useRouter } from 'next/router'
import useUser, { USER_STATES } from 'hooks/useUser';


export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClick = () => {
    loginWithGitHub()
      .catch(err => {
        console.log(err)
      }
      )
  }
  return (
    <>
      <Head>
        <title>Tuiter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <section>
          <Logo />
          <h1>Tuiter</h1>
          <h2>Hablemos de desarrollo</h2>
          {
            user === USER_STATES.NOT_LOGGED &&
            <Button onClick={handleClick}>
              <GitHub />
              Login with Github
            </Button>
          }
          {
            user === USER_STATES.NOT_KNOWN && <span>Loading...</span>
          }
        </section>
      </div>
      <style jsx>
        {`
          div {
            display:grid;
            height:100%;
            place-content:center;
            place-items:center;
          }
          section {
            display: flex;
            flex-direction:column;
            align-items: center;
          }
          h1 {
            color: ${colors.secondary};
            font-weight: 800;
            margin-bottom: 0;
          }
          h2 {
            color:${colors.primary};
            font-size:16px;
            margin:0;
            margin-bottom:16px;
          }
        `}
      </style>
    </>
  )
}