import xhr from '@utils/http'

export function getAccessesAll(keyword) {
  return xhr.get('/sys/sys-access', {
    keyword
  })
}

export function getAccessesByPage(page, size, keyword) {
  return xhr.get('/sys/sys-access/page', {
    page,
    size,
    keyword
  })
}

export function addAccess(name, code, sort, remarks) {
  return xhr.post('/sys/sys-access', {
    name,
    code,
    sort,
    remarks
  })
}

export function editAccess(id, name, code, sort, remarks) {
  return xhr.put('/sys/sys-access/' + id, {
    name,
    code,
    sort,
    remarks
  })
}

export function deleteAccess(id) {
  return xhr.delete('/sys/sys-access/' + id, {
    logDel: 1
  })
}

