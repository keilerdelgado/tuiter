import Keitit from "components/Keitit"
import {useRouter} from 'next/router'


//lo importamos para hacer la peticion a la BD ya que staticsProps intenta hacer la peticion por medio de la api y como la api no esta funcionando al momento del build que es cuando se generan los documentos estaticos que se guardaran en pages entonces falla, por ello hacemos directo la peticion a la bd desde este componente
//import {firestore} from 'firebase/admin'

export default function TuitPage(props) {
  const router = useRouter()
  //creamos esta linea ya que en el momento de que se hace la peticion por staticsProps si el path no esta en la lista entonces necesita generar el build en el fallback, para ello intenta generar la pagina pero el render continua, por ello entonces falla, para evitar esto agregamos un loading para dar tiempo a que se genere la pagina estatica y el servidor la devuelva. El fallback genera automaticamente las paginas qeu no fueron creadas en el proceso de build que es donde se generan todas las paginas estaticas de este metodo getStaticProps
  if(router.isFallback) return 'Loading...'
  return (
    <>
      <Keitit {...props}/>
      <style jsx>
        {`
          
        `}
      </style>
    </>
  )
}

//DEPRECATED
/* TuitPage.getInitialProps = (context) => {
  const { query } = context
  const { id } = query
  return fetch(`http://localhost:3000/api/tuits/${id}`)
    .then(apiRes => {
      if(apiRes.ok) return apiRes.json()
      if(res) {
        res.writeHead(301,{Location:"/home"}).end()
      }
    })
} */

//SSR (Server Side Rendering, genial para SEO)
export async function getServerSideProps (context) {
  //context = params, req, res, query
  const { params,res } = context
  const { id } = params
  const apiRes = await fetch(`http://localhost:3000/api/tuits/${id}`)
  if(apiRes.ok){
    const props = await apiRes.json()
    return {props}
  }
  if(res) {
    res.writeHead(301,{Location:"/home"}).end()
  }
}


/* export async function getStaticPaths(){
  return {
    paths:[{params:{id:'u8MNqDlYfPuxkLmmLVGa'}}],
    fallback:false
  }
}



export async function getStaticProps(context) {
  //context = params, req, res, query
  const { params,res } = context
  const { id } = params
  return firestore
    .collection('tuits')
    .doc(id)
    .get()
    .then(doc => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data
      const props = ({
        ...data,
        id,
        createdAt: +createdAt.toDate()
      })
      return {props}
    }).catch(()=>{
      return {props:{}}
    })
} */