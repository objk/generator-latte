# API goes here ~~~

每个接口在 `apis.js` 文件创建一条记录

每个接口会通过 **APIPlugin** 注入 Vue Instance,

会自动帮你识别生产环境调用生产接口，测试环境调用测试接口，开发环境调用 Mock data

例如：
```
  {

    ...

    getUser: 'rsbDomain:/bron/bbc/cust/plugin/portal/tpa/user',
    -------   --------- -------------------------------------
       1           2                      3
  }

  1: 你使用接口的名字 ex: this.APIs.getUser().then()
  2: 接口的 domain,  ex: rsbDomain, pafa5Domain
  3: 接口的路径

```