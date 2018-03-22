export default {
  // 分享4大项
  shareObj: {
    title: '理财要选极好的：预期年化收益率5.10％，限量发售！',
    content: '安全理好财，专享高收益！平安银行爆款理财产品，限时限量抢购。',
    picture: 'https://bank-static.pingan.com.cn/app_img/logo/bankapplogo.png',
  },

  // 分享url集合
  shareUrlObj: {
    url: window.location.origin + window.location.pathname,
    search: window.location.search,
    hash: '',
  },

  // 业绩统计8大项, umMode-默认为空,userType-破冰专用 根据实际需求传值
  paramObj: {
    rec_type: '',
    media_source: '',
    channel_source: '',
    source: '',
    outerSource: '',
    activity_Id: '',
    activity_FlowId: '',
  },

  // 调用ucp需求参数
  ucpParamObj: {
    appId: 'wx95415c456652ce73',
    weappNo: 'bank',
    ucp_url: `${location.protocol}//eim.pingan.com.cn/bank/getSignature`,
    backUrl: location.origin,
    openid: 'oiBF4juARSrSbe1-bHAl2zQc8P3w',
  },

  // 页面按扭及弹层展示 0-不展示 1-展示
  sharChannelArr: {
    btn: '1',
    wx: '1',
    qqZone: '1',
    sina: '1',
    erweima: '1',
    changeRecNo: '1',
    recNoLayer: '1',
  },

  // 其他统计参数, 非必传,
  otherObj: {
    intentCust: '',
    productCode: '',
    pubOrgCode: '',
  },

  // 是否自定义样式 1-自定义; 默认为空
  customCSS: '0',
  webtrendsTitle: '',
  environment: window.RUNTIME_ENV === 'prd' ? 'prd' : 'stg',
  isKDAPP2: false,
  pactivityId: 'V0443',
  notFlowIdShare: false,
}
