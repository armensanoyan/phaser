const recursiveValidateScopes = (input, index, counter) => {
  if (index === input.length) {
    return counter === 0
  }

  if (input[index] === '(') {
    return recursiveValidateScopes(input, index + 1, counter + 1)
  }

  if (input[index] === ')') {
    if (counter === 0) {
      return false
    }
    return recursiveValidateScopes(input, index + 1, counter - 1)
  }

  return recursiveValidateScopes(input, index + 1, counter)
}

const validateScopes = (input) => {
  let counter = 0

  const arrayOfInput = input.split('')
  return recursiveValidateScopes(arrayOfInput, 0, 0)

  
}

console.log(validateScopes('())(()'))