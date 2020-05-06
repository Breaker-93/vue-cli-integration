import xhr from '@utils/http'

export function getRolesByPage(page, size, keyword) {
  return xhr.get('/sys/sys-access/page', {
    page,
    size,
    keyword
  })
}

export function addRole(name, code, sort, remarks) {
  return xhr.post('/sys/sys-access', {
    name,
    code,
    sort,
    remarks
  })
}

export function editRole(id, name, code, sort, remarks) {
  return xhr.put('/sys/sys-access/' + id, {
    name,
    code,
    sort,
    remarks
  })
}

export function deleteRole(id) {
  return xhr.delete('/sys/sys-access/' + id, {})
}

