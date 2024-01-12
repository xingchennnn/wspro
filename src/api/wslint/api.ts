import request from "@/api/axios"

// 上传文件
export const wsconnect = (data?: object) => {
  return request({
    method: 'post',
    data
  })
}