import xhr from "@plugins/axios"
exports.get = function (api, params, timeout) {
  return xhr({
    url: api,
    method: 'get',
    params,
    timeout
  })
}
exports.post = function (api, data, timeout) {
  return xhr({
    url: api,
    method: 'post',
    data,
    timeout
  })
}
exports.put = function (api, data) {
  return xhr({
    url: api,
    method: 'put',
    data
  })
}
exports.delete = function (api, params) {
  return xhr({
    url: api,
    method: 'delete',
    params
  })
}

exports.uploadFile = function (api, data, onUploadProgress) {
  return xhr({
    url: api,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: [(data) => {
      return data
    }],
    data,
    onUploadProgress
  })
}

exports.downloadFile = function (api, data) {
  return xhr({
    url: api,
    method: 'post',
    responseType: 'blob',
    data
  })
}
