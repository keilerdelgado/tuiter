import css from 'styled-jsx/css'
import {breakPoints,fonts,colors} from '../../styles/theme'
import {addOpacityToColor} from '../../styles/utils.js'

const backgroundColor = addOpacityToColor(colors.primary,0.3)

export const globalStyles = css.global`
  html,
  body {
    background-image:
      radial-gradient(${backgroundColor} 1px, #fdfdfd 1px),
      radial-gradient(${backgroundColor} 1px, #fdfdfd 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    font-family: ${fonts.base};
    overflow:hidden;
  }
  * {
    box-sizing: border-box;
  }
  textarea, input {
    font-family:${fonts.base};
  }
`

export default css`
  div {
    display:grid;
    height: 100vh;
    place-items:center;
  }
  main {
    background: #fff;
    display:flex;
    flex-direction:column;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,.1);
    width: 100vw;
    height:100vh;
    position:relative;
    overflow-y:auto;
  }
  @media (min-width: ${breakPoints.mobile}){
    main {
      height: 90vh;
      max-width: ${breakPoints.mobile};
      width:100%;
    }
  }
  nav {
    border-top:1px solid #eee;
    height: 49px;
    background: #FFFFFF;
    display: flex;
  }
  nav a {
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    align-items:center;
    transition: all .3s ease;
  }
  nav a:hover {
    background: radial-gradient(#0099ff22 15%, transparent 16%);
    background-size: 180px 180px;
    background-position: center;
  }
  nav a:hover > :global(svg) {
    stroke: ${colors.primary}
  }
  section {
    position:sticky;
    bottom:0;
    width: 100%;
    z-index:111;
  }
`