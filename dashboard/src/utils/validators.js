export function validateEmptyAndLength3 (value) {
  if (!value) {
    return '*Este campo é obrigatório'
  } else if (value.length < 3) {
    return '*Este campo precisa de no mínimo 3 caracteres'
  }

  return true
}

export function validateEmptyAndEmail (value) {
  if (!value) {
    return '*Este campo é obrigatório'
  } else if (!(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value))) {
    return '*Este campo precisa ser um email válido'
  }

  return true
}
