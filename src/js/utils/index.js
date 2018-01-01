// eslint-disable-next-line no-alert
export const confirmWithUser = message => () => confirm(message)

export const objectToArray = obj =>
  Object.keys(obj).reduce((acc, cur) => {
    acc.push(obj[cur])

    return acc
  }, [])
