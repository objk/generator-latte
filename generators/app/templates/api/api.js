/*
* @Author: WUZHILONG860
* @Date:   2017-12-25 12:19:41
* @Last Modified by:   WUZHILONG860
* @Last Modified time: 2018-03-16 14:36:39
*/
const rsb = 'rsbDomain' // rsbDomain
const pafa5 = 'pafa5Domain' // pafa5Domain

module.exports = {
  // 框架测试
  getUser: `${rsb}:/bron/bbc/cust/plugin/portal/tpa/user`,

  // BBC
  nonFreeRegister: `${rsb}:/bron/bbc/cust/plugin/portal/tpa/nonFreeRegister`,
  getProductInfo: `${rsb}:/bron/bbc/cust/plugin/portal/tpa/getProductInfo`,
  qryUserStatus: `${rsb}:/bron/bbc/cust/plugin/tpa/individual/experienceOfficer/info`,

  // 会员中心
  updateYZBflag: `${pafa5}:/brcp/uc/cust/updateYZBflag.do`,
}
