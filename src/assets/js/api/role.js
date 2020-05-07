import xhr from '@utils/http'

export function getRolesByPage(page, size, keyword) {
  return xhr.get('/sys/sys-role/page', {
    page,
    size,
    keyword
  })
}

export function addRole(name, code, accesses, remarks) {
  return xhr.post('/sys/sys-role/withAccess', {
    name,
    code,
    accesses,
    remarks
  })
}

export function editRole(id, name, code, sort, remarks) {
  return xhr.put('/sys/sys-role/' + id, {
    name,
    code,
    sort,
    remarks
  })
}

export function deleteRole(id) {
  return xhr.delete('/sys/sys-role/' + id, {})
}

