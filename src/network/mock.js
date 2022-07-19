import Mock from 'mockjs'
import homeApi from './mockServeData/mockHome'
import UserApi from './user'
import permissionApi from './mockServeData/permission'
Mock.mock('/home/getData',homeApi.getStatisticalData)
Mock.mock(/user\/add/,'post',UserApi.createUser)
Mock.mock(/user\/edit/,'post',UserApi.updateUser)
Mock.mock(/user\/getUser/,'get',UserApi.getUserList)
Mock.mock(/user\/del/,'get',UserApi.deleteUser)

Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)