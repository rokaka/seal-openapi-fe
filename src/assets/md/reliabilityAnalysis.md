# 信度分析-Cronbach's α



## 请求方法与路径

+ 请求方法：`POST`

+ 请求路径：`/api/v1/analysis/quantify/reliability-analysis-cronbach`

  

## 请求参数

<json-table>

{"$schema":"http://json-schema.org/draft-04/schema#","type":"object","properties":{"data":{"type":"DataFrame[float]","properties":{},"description":"变量"}},"required":["data"]}

</json-table>



## 响应参数

<json-table>

{"$schema":"http://json-schema.org/draft-04/schema#","type":"object","properties":{"code":{"type":"string","description":"响应码"},"message":{"type":"string","description":"响应码的描述"},"data":{"type":"object","properties":{"cronbach_data":{"type":"object","properties":{"cronbach_coef":{"type":"number","description":"Cronbach α系数"},"std_cronbach_coef":{"type":"number","description":"标准化Cronbach α系数"},"items":{"type":"integer","description":"项数"},"total":{"type":"integer","description":"样本数"}},"required":["cronbach_coef","std_cronbach_coef","items","total"],"description":"Cronbach’s α系数结果"},"item_total_statistics":{"type":"array","items":{"type":"object","properties":{"column":{"type":"string","description":"字段名"},"del_item_avg":{"type":"number","description":"删除项后的平均值"},"del_item_var":{"type":"number","description":"删除项后的方差"},"del_item_corr":{"type":"number","description":"删除的项与删除项后的总体的相关性"},"del_item_cronbach":{"type":"number","description":"删除项后的Cronbach α系数"}},"required":["column","del_item_avg","del_item_var","del_item_corr","del_item_cronbach"]},"description":"项总计统计"}},"required":["cronbach_data","item_total_statistics"]}},"required":["code","message","data"]}

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
    "cronbach_data": {
      "cronbach_coef": 0.810810810810811,
      "std_cronbach_coef": 0.9966887054149941,
      "items": 2,
      "total": 3
    },
    "item_total_statistics": [
      {
        "column": "No.",
        "del_item_avg": 20.333333333333332,
        "del_item_var": 6.333333333333334,
        "del_item_corr": 0.9933992677987831,
        "del_item_cronbach": 1
      },
      {
        "column": "Age",
        "del_item_avg": 2,
        "del_item_var": 1,
        "del_item_corr": 0.9933992677987827,
        "del_item_cronbach": 1
      }
    ]
  }
}
```

