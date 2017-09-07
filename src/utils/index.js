export function sortNumbersAr(numAr) {
  let sortedAr = []

  for (var i = 0; i < numAr.length; i++) {
    if (sortedAr.length === 0) {
      sortedAr.push(numAr[i])
    } else if (numAr[i] < sortedAr[0]) {
      sortedAr.unshift(numAr[i])
    } else if (numAr[i] > sortedAr[sortedAr.length - 1]) {
      sortedAr.push(numAr[i])
    } else {
      for (var j = 0; j < sortedAr.length - 1; j++) {
        if (numAr[i] >= sortedAr[j] && numAr[i] <= sortedAr[j + 1]) {
          let end = j + 1
          if (j === 0) {
            end = 1
          }
          let tempAr = sortedAr.slice(0, end).concat([numAr[i]]).concat(sortedAr.slice(j + 1))
          sortedAr = tempAr.slice(0)
          break
        }
      }         
    }
  }
  return sortedAr
}
