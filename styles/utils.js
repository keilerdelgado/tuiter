export const addOpacityToColor = (color,opacity) => {
  //para convertir el numero de la opacidad al color hexadecimal
  //los exadecimales pueden tenero dos caracteres mas que indican el valor de la opacidad
  //#ffffffff los ultimos dos son 100$
  //#ffffff00 los ultimos dos son 0%
  //con opacityHex estamos convirtiendo un 0.5 que recibamos por parametro en el exadecimal correspondiente a ese 0.5
  const opacityHex = Math.round(opacity * 255).toString(16)
  return `${color}${opacityHex}`
}