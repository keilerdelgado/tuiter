import { listenLatestTuits } from 'firebase/client'
import { useEffect, useState } from 'react'
import Keitit from 'components/Keitit'
import Head from 'next/head'
import useUser from 'hooks/useUser'

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    //en firestore el metodo onSnapshot devuelve un metodo llamado unsuscribe que cierra la conexion con la base de datos y deja de escuchar, de esa forma no recibimos el error en react al intentar actualizar un componente que ha sido desmontado, ademas de dejar de ocupar ancho de banda
    let unsuscribe
    if(user){
      //listenLatestTuits recibe un callback como parametro por ello le pasamos la funcion setTimeline con la cual vamos a asigmar los nuevos tuits al state de timeline
      unsuscribe = listenLatestTuits(setTimeline)
    }
    //cierra la conexion una vez hecho el render, asi limpiamos el efecto 
    return () => unsuscribe && unsuscribe()
    //user && fetchLatestTuits().then(setTimeline)
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / Tuiter</title>
      </Head>
      <div>
        <header>
          <h1>Inicio</h1>
        </header>
        <section>
          {timeline.map(({ id, img, username, avatar, content, createdAt }) => (
            <Keitit
              createdAt={createdAt}
              avatar={avatar}
              id={id}
              key={id}
              content={content}
              username={username}
              img={img}
            />
          ))}
        </section>
        {/* <nav>
          <Link href='/compose/tuit'>
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
        </nav> */}
      </div>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        header {
          align-items: center;
          border-bottom:1px solid #ccc;
          height: 49px;
          display:flex;
          position:sticky;
          top:0;
          width: 100%;
          background: #FFFFFFee;
          backdrop-filter: blur(10px);
        }
        section {
          flex:1;
        }
        h2 {
          font-size:21px;
          font-weight: 800;
          padding-left:15px;
        }
      `}</style>
    </>
  )
}
