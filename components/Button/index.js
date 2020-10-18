import {colors} from '../../styles/theme.js'

export default function Button({children,onClick,disabled}) {
  return (
    <>
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>
      <style jsx>
        {`
          button {
            border: 0;
            background: ${colors.black};
            color: #fff;
            cursor: pointer;
            border-radius:9999px;
            fontweight:800;
            padding: 8px 24px;
            font-size: 16px;
            transition: opacity .3s ease;
            display:flex;
            align-items:center;
            user-select: none;
          }
          button[disabled]{
            pointer-events:none;
            opacity:.2;
          }
          button > :global(svg) {
            margin-right: 8px;
          }
          button:hover {
            opacity: .7;
          }
        `}
      </style>
    </>
  )
}
