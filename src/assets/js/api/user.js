import xhr from '@utils/http'

export function login(username, password) {
  return xhr.post('/login', {
    username,
    password
  })
}


export function getUsersByPage(page, size, keyword, roleId, groupId) {
  return xhr.get('/sys/sys-user/withAccessAndGroup/page', {
    page,
    size,
    keyword,
    roleId,
    groupId
  })
}

export function addUser(username, password, roleList, groupList, detailInfo) {
  // console.log(username, password, roleList, groupList)
  // return null
  return xhr.post('/sys/sys-user/withRoleAndGroup', {
    username,
    password,
    roleList,
    groupList,
    detailInfo
  })
}

export function editUser(id, name, code, sort, remarks) {
  return xhr.put('/sys/sys-user/' + id, {
    name,
    code,
    sort,
    remarks
  })
}

export function deleteUser(id) {
  return xhr.delete('/sys/sys-user/' + id, {})
}
