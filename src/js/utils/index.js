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

export const daysSinceStartOfYear = date => {
  const firstDay = new Date(date.getFullYear(), 0, 1)
  const secondsInDay = 24 * 60 * 60 * 1000

  return (
    Math.floor(
      Math.abs(date.getTime() - firstDay.getTime()) / secondsInDay
    ) + 1
  )
}
