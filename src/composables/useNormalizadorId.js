export function normalizarIdObjeto(objeto) {
  return objeto ? {
    ...objeto,
    id: String(objeto.id),
  } : objeto
}
