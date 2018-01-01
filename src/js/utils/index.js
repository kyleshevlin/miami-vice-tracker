// eslint-disable-next-line no-alert
export const confirmWithUser = message => () => confirm(message)

export const objectToArray = object => {
  let obj = object

  if (obj === null || obj === undefined) {
    obj = {}
  }

  return Object.keys(obj).reduce((acc, cur) => {
    acc.push(obj[cur])

    return acc
  }, [])
}

export const strToFloat = str => {
  const float = parseFloat(Number(str).toFixed(2))

  if (isNaN(float)) {
    return null
  }

  return float
}
