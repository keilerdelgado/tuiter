import Button from "components/Button";
import { useEffect, useState } from 'react'
import useUser from 'hooks/useUser'
import { useRouter } from 'next/router'

import { addTuit, uploadImage } from 'firebase/client'
import Head from "next/head";
import Avatar from "components/Avatar";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export default function ComposeTuit() {
  const user = useUser()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [message, setMessage] = useState('')
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)
  const router = useRouter()

  useEffect(() => {
    console.log('eff')
    if (task) {
      let onProgress = () => { }
      let onError = () => { }
      let onComplete = () => {
        console.log('onComplete')
        task.snapshot.ref.getDownloadURL().then(setImgURL)
      }
      task.on('state_changed',
        onProgress,
        onError,
        onComplete
      )
    }
  }, [task])

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addTuit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      username: user.username,
      img: imgURL
    })
      .then(() => {
        router.push('/home')
      })
      .catch(err => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = e => {
    e.preventDefault()
    console.log('over')
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    console.log('leave')
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    console.log(file)
    const task = uploadImage(file)
    setTask(task)
  }

  const handleOver = e => {
    e.stopPropagation()
    e.preventDefault()
    console.log('over')
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Crear Tuit / Tuiter</title>
      </Head>
      <section className='form-container'>
        {
          user &&
            <section className='avatar-container'>
              <Avatar src={user.avatar} />
            </section>
        }
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragOver={handleOver}
            placeholder="¿Qué esta pasando?"
            value={message}
          ></textarea>
          {
            imgURL &&
            <section className='image'>
              <button onClick={() => setImgURL(null)}>x</button>
              <img src={imgURL} />
            </section>
          }
          <div>
            <Button disabled={isButtonDisabled}>Tuitear</Button>
          </div>
        </form>
      </section>
      <style jsx>{`
        div {
          padding: 15px;
        }
        .form-container {
          display:flex;
          align-items: flex-start;
          height:100%;
        }
        .avatar-container {
          padding-top: 10px;
          padding-left: 10px;
        }
        textarea {
          width:100%;
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
          ? '3px dashed #09f'
          : '3px dashed transparent'};
          border-radius:10px;
          resize:none;
          font-size:21px;
          padding: 15px;
          outline: 0;
          min-height:200px;
        }
        .image {
          position:relative;
        }
        button {
          background:rgba(0,0,0,.3);
          border-radius:999px;
          border:0;
          color:#fff;
          cursor:pointer;
          font-size:24px;
          height:30px;
          position: absolute;
          right: 15px;
          top: 15px;
          width:30px;
        }
        img {
          border-radius: 10px;
          height: auto;
          width:100%;
        }
        form {
          flex: 1;
          padding:10px;
        }
      `}</style>
    </>
  )
}
