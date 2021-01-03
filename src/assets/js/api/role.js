import xhr from '@utils/http'

export function getRolesAll(keyword) {
  return xhr.get('/sys/sys-role', {
    keyword
  })
}

export function getRolesByPage(page, size, keyword) {
  return xhr.get('/sys/sys-role/withAccess/page', {
    page,
    size,
    keyword
  })
}

export function addRole(name, code, accessList, remarks) {
  return xhr.post('/sys/sys-role/withAccess', {
    name,
    code,
    accessList,
    remarks
  })
}

export function editRole(id, name, code, accessList, remarks) {
  return xhr.put('/sys/sys-role/withAccess/' + id, {
    name,
    code,
    accessList,
    remarks
  })
}

export function deleteRole(id) {
  return xhr.delete('/sys/sys-role/' + id, {
    logDel: 1
  })
}

