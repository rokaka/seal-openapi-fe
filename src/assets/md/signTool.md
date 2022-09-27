# 签名规则

SPSSPRO 开放平台中每一个接口都遵循本签名规则。在签名时需要用到应用的 `appKey` 和 `appSecret`，如果您不清楚可以查阅相关文档先获取 `appKey` 和 `appSecret`。

## 签名步骤

1. 将请求的 query 参数按照 key 的 ascii 码从小到大重新排序得到字符串 `sortedQueryString`
2. 将 `RequestMethod（大写）`、`RequestPath`、`sortedQueryString`、`RequestBody` 使用换行符 `\n` 进行拼接得到 `signingString`
3. 使用应用的 `appSecret` 对 `singingString` 进行 `hmac sha256` 签名得到 `signature`
4. 以 "`appKey`<空格>`signature`" 的格式拼接得到认证头部 `authorization`
5. 在后续的 API 请求时，以 key 为 `Authorization`，value 为上一步的 `authroiztaion` 的组合加入到请求头里

注意：

1. _为了避免混淆，对值类型为列表的参数格式为 `?keys=1,2,3` 而不是 `?keys=1&keys=2&keys=3`，不过本平台会尽可能避免在 query 参数中传递列表变量_
1. _如果不存在 ` QueryString` 或 `RequestBody` ，则使用空字符串而非 `null`_

### 例子

现在有一个 API 请求如下：

```http
POST /api/v1/example?key2=value2&key1=value1&key3=
{
    "bodyKey": "bodyValue",
    "bodyKey2": "bodyValue2"
}
```

1. 经过签名步骤第一步得到 `sortedQueryString` 值为 `key1=value1&key2=value2&key3=`
2. 经过签名步骤第二部得到 `signingString` 值为

```
POST\n
/api/v1/example\n
key1=value1&key2=value2&key3=\n
{
    "bodyKey": "bodyValue",
    "bodyKey2": "bodyValue2"
}
```

_上述的 `signingString` 为了更直观的显示所以换行展示了每一项，实际上的真实值如下：_

_`POST\n/api/v1/example\nkey1=value1&key2=value2&key3=\n{\n. "bodyKey": "bodyValue2",\n "bodyKey2": "bodyValue2"\n}`_

3. 经过签名步骤三得到 `authorization` 值为 `YourAppKey 2579b7b487d66d4dd0e2ec289702d70442777dcd957936e2d56a7c677c59240c`
4. 请求时 `"Authorization": "YourAppKey 2579b7b487d66d4dd0e2ec289702d70442777dcd957936e2d56a7c677c59240c"` 加入到 Header 当中

## 签名工具

### Postman

1. 拷贝以下脚本到 `Postman` 中请求的 `Pre-request script` 配置项中
2. 设置环境变量 `appKey` 和 `appSecret`

```javascript
const appKey = pm.variables.get('appKey')
const appSecret = pm.variables.get('appSecret')

function sortQueryAsString() {
  keys = []
  params = {}
  pm.request.url.query.all().forEach((param) => {
    keys.push(param.key)
    params[param.key] = param.value
  })
  keys.sort()

  buf = []
  for (let i = 0; i < keys.length; i++) {
    buf.push(keys[i])
    buf.push('=')
    buf.push(params[keys[i]])
    buf.push('&')
  }
  if (buf.length > 1) {
    buf.pop()
  }
  return buf.join('')
}

var method = request.method
var path = pm.request.url.getPath()
var queryString = sortQueryAsString()
var body = pm.request.body.raw

var signature = CryptoJS.HmacSHA256(
  [method, path, queryString, body].join('\n'),
  appSecret
).toString()

pm.request.headers.add({
  key: 'Authorization',
  value: appKey + ' ' + signature,
})
```

<div style="width: 88px;height: 34px;background: #2572ff;border-radius: 2px;color: #ffffff;font-weight: 400;line-height: 34px;text-align: center;font-size: 12px;cursor: pointer;"><a href="/sign_tool" style="color: #fff;
text-decoration: none;">去签名 ></a></div>