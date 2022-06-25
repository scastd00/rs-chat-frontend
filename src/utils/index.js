export function headers(__token__) {
  return {
    headers: {
      Authorization: 'Bearer ' + __token__
    }
  }
}
