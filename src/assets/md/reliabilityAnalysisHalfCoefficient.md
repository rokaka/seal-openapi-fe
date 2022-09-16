# 信度分析-折半系数



## 请求方法与路径

+ 请求方法：`POST`

+ 请求路径：`https://openapi.spsspro.com/openapi/v1/domain/algorithm/analysis/quantify/reliability-analysis-split-half`

  

## 请求参数

<json-table>

{"$schema":"http://json-schema.org/draft-04/schema#","type":"object","properties":{"data":{"type":"DataFrame[float]","properties":{},"description":"变量"}},"required":["data"]}

</json-table>



## 响应参数

<json-table>

{"$schema":"http://json-schema.org/draft-04/schema#","type":"object","properties":{"code":{"type":"string","description":"响应码"},"message":{"type":"string","description":"响应码的描述"},"data":{"type":"object","properties":{"split_half_data":{"type":"object","properties":{"first_half_value":{"type":"number","description":"Cronbach's α系数前半部数值"},"first_half_coef":{"type":"number","description":"Cronbach's α系数前半部项"},"second_half_value":{"type":"number","description":"Cronbach's α系数后半部数值"},"second_half_coef":{"type":"number","description":"Cronbach's α系数后半部项"},"cronbach_total":{"type":"number","description":"Cronbach's α系数后总项数"},"corr":{"type":"number","description":"前后两部分间的相关系数值"},"spearmen_brown_equal":{"type":"number","description":"折半系数（Spearman-Brown系数）等长"},"spearmen_brown_unequal":{"type":"number","description":"折半系数（Spearman-Brown系数）不等长"},"split_half_coef":{"type":"number","description":"Split-Half 系数"}},"description":"折半信度系数","required":["first_half_value","first_half_coef","second_half_value","second_half_coef","cronbach_total","corr","spearmen_brown_equal","spearmen_brown_unequal","split_half_coef"]}},"description":"算法返回结果","required":["split_half_data"]}},"required":["code","message","data"]}

</json-table>

## 请求示例

```json
{
  "data": {
    "columns": [
      "No.",
      "Age"
    ],
    "data": [
      [
        1,
        18
      ],
      [
        2,
        20
      ],
      [
        3,
        23
      ]
    ]
  }
}
```



## 响应示例

```json
{
  "code": "OK",
  "message": "操作成功",
  "data": {
    "split_half_data": {
      "first_half_value": 1,
      "first_half_coef": 1,
      "second_half_value": 1,
      "second_half_coef": 1,
      "cronbach_total": 2,
      "corr": 0.9933992677987831,
      "spearmen_brown_equal": 0.9966887054149941,
      "spearmen_brown_unequal": 0.9966887054149922,
      "split_half_coef": 0.810810810810811
    }
  }
}
```

