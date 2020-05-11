import xhr from '@utils/http'

export function getGroupsAll(keyword) {
  return xhr.get('/sys/sys-group', {
    keyword
  })
}

export function getGroupsByPage(page, size, keyword) {
  return xhr.get('/sys/sys-group/page', {
    page,
    size,
    keyword
  })
}

export function addGroup(name, code, sort, remarks) {
  return xhr.post('/sys/sys-group', {
    name,
    code,
    sort,
    remarks
  })
}

export function editGroup(id, name, code, sort, remarks) {
  return xhr.put('/sys/sys-group/' + id, {
    name,
    code,
    sort,
    remarks
  })
}

export function deleteGroup(id) {
  return xhr.delete('/sys/sys-group/' + id, {
    logDel: 1
  })
}

