import Create from 'components/Icons/Create.js'
import Home from 'components/Icons/Home.js'
import Search from 'components/Icons/Search.js'
import Link from 'next/link'
import styles,{globalStyles} from './styles.js'

export default function AppLayout({children}) {
  return (
    <>
      <div>
        <main>
          {children}
        <section>
          <nav>
            <Link href='/home'>
              <a>
                <Home width={32} height={32} stroke='#09f'/>
              </a>
            </Link>
            <Link href='/compose/tuit'>
              <a>
                <Search width={32} height={32} stroke='#09f'/>
              </a>
            </Link>
            <Link href='/compose/tuit'>
              <a>
                <Create width={32} height={32} stroke='#09f'/>
              </a>
            </Link>
          </nav>
        </section>
        </main>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>{globalStyles}</style>
    </>
  )
}