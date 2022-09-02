# 数据包络



## 请求方法与路径

+ 请求方法：POST
+ 请求路径：`/api/algorithm/v1/analysis/quantify/dea`



## 请求参数

| 名称             | 类型             | 必填 | 备注     |
| ---------------- | ---------------- | ---- | -------- |
| input_indicator  | DataFrame[Float] | 是   | 投入指标 |
| output_indicator | DataFrame[Float] | 是   | 产出指标 |
| index            | Series[String]   | 否   | 索引项   |


## 响应参数

| 名称                                 | 类型          | 必填 | 备注                                                         |
| ------------------------------------ | ------------- | ---- | ------------------------------------------------------------ |
| code                                 | String        | 是   | 响应码                                                       |
| message                              | String        | 是   | 响应码的描述                                                 |
| data                                 | Object        | 是   |                                                              |
|   ∟ dea               |  | 是   | 数据包络分析结                                             |
|   ∟ name | String        | 是   | 索引项名称                                                   |
|   ∟ benefit_analysis | Object        | 是   | 效益分析                                                     |
|     ∟ technical_benefits | Float         | 是   | 技术效益                                                     |
|     ∟ economies_scale | Float         | 是   | 规模效益                                                     |
|     ∟ overall_benefit | Float         | 是   | 综合效益                                                     |
|     ∟ slack_variable_s_reduce | Float         | 是   | 松弛变量 S-                                                  |
|     ∟ slack_variable_s_add           | Float         | 是   | 松弛变量 S+                                                  |
|     ∟ returns_scale_coef             | Float         | 是   | 规模报酬系数                                                 |
|   ∟ quadrant_analysis                | Object        | 是   | 象限分析                                                     |
|       ∟ input                          | Float         | 是   | 投入                                                         |
|     ∟ output                         | Float         | 是   | 产出                                                         |
|     ∟ quadrant_distribution          | String        | 是   | 象限分布；<br />第一象限：FIRST_QUADRANT；<br />第二象限：SECOND_QUADRANT<br />第三象限：THIRD_QUADRANT<br />第四象限：FOURTH_QUADRANT |
|   ∟ input_redundancy_analysis        | Object        | 是   | 投入冗余分析                                                 |
|     ∟ relaxed_variable_s_reduce_analysis | Array[Object] | 是   | 松弛变量 S- 分析                                             |
|       ∟ name                         | String        | 是   | 字段名                                                       |
|       ∟ value                        | Float         | 是   | 数值                                                         |
|     ∟ input_redundancy_rate          | Array[Object] | 是   | 投入冗余率                                                   |
|       ∟ name                         | String        | 是   | 字段名                                                       |
|       ∟ value                        | String        | 是   | 数值                                                         |
|     ∟ pool                           | Float         | 是   | 汇总                                                         |
|   ∟ underproduction_analysis         | Object        | 是   | 产出不足分析                                                 |
|     ∟ slack_variable_s_add_analysis  | Array[Object] | 是   | 松弛变量 S+ 分析                                             |
|       ∟ name                         | String        | 是   | 字段名                                                       |
|       ∟ value                        | String        | 是   | 数值                                                         |
|     ∟ underproduction_rate           | Array[Object] | 是   | 产出不足率                                                   |
|       ∟ name                         | String        | 是   | 字段名                                                       |
|       ∟ value                        | String        | 是   | 数值                                                         |
|     ∟ pool                           | Float         | 是   | 汇总                                                         |



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
  "code": "OK",
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