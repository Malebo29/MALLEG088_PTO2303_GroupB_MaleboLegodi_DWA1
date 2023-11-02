function getES() {
    var array = []
    if (!Array.isArray) {
      return 3
    } else if (!window.Promise) {
      return 5
    } else if (!array.includes) {
      return 6
    } else if (!"".padStart) {
      return 7
    } else if (!Promise.prototype.finally) {
      return 8
    } else if (!window.BigInt) {
      return 9
    } else if (!Promise.allSettled) {
      return 10
    } else if (!"".replaceAll) {
      return 11
    } else if (!array.at) {
      return 12
    } else if (!array.with) {
      return 13
    } else {
      return 14
    }
  }
  
  var ecmascript = getES()
  var year = 1999
  if (ecmascript !== 3) {
    year = ecmascript + 2009
  }
  console.log("Version " + ecmascript + ", Year " + year)