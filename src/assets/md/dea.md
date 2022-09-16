# 数据包络



## 请求方法与路径

+ 请求方法：`POST`

+ 请求路径：`https://openapi.spsspro.com/openapi/v1/domain/algorithm/analysis/questionnaire/validity`

  

## 请求参数

<json-table>

{"type":"object","title":"empty object","properties":{"input_indicator":{"type":"DataFrame[float]"},"output_indicator":{"type":"DataFrame[float]"}},"required":["input_indicator","output_indicator"]}

</json-table>



## 响应参数

<json-table>

{"type":"object","title":"empty object","properties":{"code":{"type":"string"},"message":{"type":"string"},"data":{"type":"object","properties":{"dea":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","description":"索引项名称"},"benefit_analysis":{"type":"object","properties":{"technical_benefits":{"type":"number","description":"技术效益"},"economies_scale":{"type":"number","description":"规模效益"},"overall_benefit":{"type":"number","description":"综合效益"},"slack_variable_s_reduce":{"type":"number","description":"松弛变量S-"},"slack_variable_s_add":{"type":"number","description":"松弛变量S+"},"returns_scale_coef":{"type":"number","description":"规模报酬系数"}},"required":["technical_benefits","economies_scale","overall_benefit","slack_variable_s_reduce","slack_variable_s_add","returns_scale_coef"],"description":"效益分析"},"quadrant_analysis":{"type":"object","properties":{"input":{"type":"number","description":"投入"},"output":{"type":"number","description":"产出"},"quadrant_distribution":{"type":"string","description":"象限分布; FIRST_QUADRANT: 第一象限; SECOND_QUADRANT: 第二象限; THIRD_QUADRANT: 第三象限; FOURTH_QUADRANT: 第四象限"}},"required":["input","quadrant_distribution","output"],"description":"象限分析"},"input_redundancy_analysis":{"type":"object","properties":{"relaxed_variable_s_reduce_analysis":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","description":"字段名"},"value":{"type":"number","description":"数值"}},"required":["name","value"]},"description":"松驰变量S-分析"},"input_redundancy_rate":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","description":"字段名"},"value":{"type":"number","description":"数值"}},"required":["name","value"]},"description":"投入冗余率"},"pool":{"type":"number","description":"汇总"}},"description":"投入冗余分析","required":["relaxed_variable_s_reduce_analysis","input_redundancy_rate","pool"]},"underproduction_analysis":{"type":"object","properties":{"slack_variable_s_add_analysis":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","description":"字段名"},"value":{"type":"number","description":"数值"}},"required":["name","value"]}},"underproduction_rate":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","description":"字段名"},"value":{"type":"number","description":"数值"}},"required":["name","value"]}},"pool":{"type":"number","description":"汇总"}},"description":"产出不足分析","required":["slack_variable_s_add_analysis","underproduction_rate","pool"]}},"required":["name","benefit_analysis","quadrant_analysis","input_redundancy_analysis","underproduction_analysis"]}}},"required":["dea"]}},"required":["code","message","data"]}

</json-table>



## 请求示例

```json
{
  "input_indicator": {
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
  },
  "output_indicator": {
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
  },
  "index": {
    "name": "Age",
    "values": [
      18,
      20,
      23
    ]
  }
}
```



## 响应示例

```json
{
  "code": "0",
  "message": "操作成功",
  "data": {
    "dea": [
      {
        "name": "18",
        "benefit_analysis": {
          "technical_benefits": 1,
          "economies_scale": 0.9999999999999997,
          "overall_benefit": 0.9999999999999997,
          "slack_variable_s_reduce": 0,
          "slack_variable_s_add": 0,
          "returns_scale_coef": 0.9999999999999997
        },
        "quadrant_analysis": {
          "input": -0.9999999999999997,
          "output": -2.537573376920677,
          "quadrant_distribution": "THIRD_QUADRANT"
        },
        "input_redundancy_analysis": {
          "relaxed_variable_s_reduce_analysis": [
            {
              "name": "No.",
              "value": 0
            }
          ],
          "input_redundancy_rate": [
            {
              "name": "No.",
              "value": 0
            }
          ],
          "pool": 0
        },
        "underproduction_analysis": {
          "slack_variable_s_add_analysis": [
            {
              "name": "No.",
              "value": 0
            },
            {
              "name": "Age",
              "value": 0
            }
          ],
          "underproduction_rate": [
            {
              "name": "No.",
              "value": 0
            },
            {
              "name": "Age",
              "value": 0
            }
          ],
          "pool": 0
        }
      },
      {
        "name": "20",
        "benefit_analysis": {
          "technical_benefits": 1,
          "economies_scale": 0.9999999999999999,
          "overall_benefit": 0.9999999999999999,
          "slack_variable_s_reduce": 0,
          "slack_variable_s_add": 0,
          "returns_scale_coef": 0.9677419354838708
        },
        "quadrant_analysis": {
          "input": 0,
          "output": -0.30997645108944005,
          "quadrant_distribution": "THIRD_QUADRANT"
        },
        "input_redundancy_analysis": {
          "relaxed_variable_s_reduce_analysis": [
            {
              "name": "No.",
              "value": 0
            }
          ],
          "input_redundancy_rate": [
            {
              "name": "No.",
              "value": 0
            }
          ],
          "pool": 0
        },
        "underproduction_analysis": {
          "slack_variable_s_add_analysis": [
            {
              "name": "No.",
              "value": 0
            },
            {
              "name": "Age",
              "value": 0
            }
          ],
          "underproduction_rate": [
            {
              "name": "No.",
              "value": 0
            },
            {
              "name": "Age",
              "value": 0
            }
          ],
          "pool": 0
        }
      },
      {
        "name": "23",
        "benefit_analysis": {
          "technical_benefits": 1,
          "economies_scale": 1,
          "overall_benefit": 1,
          "slack_variable_s_reduce": 0,
          "slack_variable_s_add": 0,
          "returns_scale_coef": 1
        },
        "quadrant_analysis": {
          "input": 1,
          "output": 2.8475498280101212,
          "quadrant_distribution": "FIRST_QUADRANT"
        },
        "input_redundancy_analysis": {
          "relaxed_variable_s_reduce_analysis": [
            {
              "name": "No.",
              "value": 0
            }
          ],
          "input_redundancy_rate": [
            {
              "name": "No.",
              "value": 0
            }
          ],
          "pool": 0
        },
        "underproduction_analysis": {
          "slack_variable_s_add_analysis": [
            {
              "name": "No.",
              "value": 0
            },
            {
              "name": "Age",
              "value": 0
            }
          ],
          "underproduction_rate": [
            {
              "name": "No.",
              "value": 0
            },
            {
              "name": "Age",
              "value": 0
            }
          ],
          "pool": 0
        }
      }
    ]
  }
}
```

