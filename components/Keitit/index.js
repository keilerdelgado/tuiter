import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'
import Link from 'next/link'
import {useRouter} from 'next/router'

export default function Keitit({ avatar, username, content, createdAt, id, img }) {
  const timeago = useTimeAgo(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article onClick={handleArticleClick}>
        <div>
          <Avatar src={avatar} alt={username} />
        </div>
        <section>
          <header>
            <strong>{username}</strong>
            <span> . </span>
            <Link href={`/status/${id}`}>
              <a>
                <time>{timeago}</time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {
            img && <img src={img}/>
          }
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom:1px solid #eaf7ff;
          display:flex;
          padding: 10px 15px;
        }
        article:hover {
          background: #f5f8fa;
          cursor:pointer;
        }
        img {
          border-radius: 10px;
          height: auto;
          width:100%;
          margin-top: 10px;
        }
        div {
          padding-right: 8px;
        }
        p {
          margin: 0;
          line-height: 1.3125;
        }
        time {
          color: #555;
          font-size: 14px;
        }
        a {
          color: #555;
          font-size: 14px;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
