# 效度分析



## 请求方法与路径

+ 请求方法：`POST`

+ 请求路径：`/api/v1/analysis/questionnaire/validity`

  

## 请求参数

<json-table>

{"$schema":"http://json-schema.org/draft-04/schema#","type":"object","properties":{"data":{"type":"DataFrame[float]","properties":{},"description":"变量"},"n_factors":{"type":"integer","description":"因子维度"}},"required":["data","n_factors"]}

</json-table>



## 响应参数

<json-table>

{"$schema":"http://json-schema.org/draft-04/schema#","type":"object","properties":{"code":{"type":"string","description":"响应码"},"message":{"type":"string","description":"响应码的描述"},"data":{"type":"object","properties":{"kmo_bartlett_result":{"type":"object","properties":{"kmo_value":{"type":"number","description":"KMO值"},"bartlett_value":{"type":"object","properties":{"chi_square_value":{"type":"number","description":"近似卡方值"},"df_value":{"type":"number","description":"自由度"},"p":{"type":"number","description":"P值"}},"required":["chi_square_value","df_value","p"],"description":"Bartlett检验的结果"}},"required":["kmo_value","bartlett_value"],"description":"KMO检验和Bartlett检验的结果"},"explain_total_variance":{"type":"object","properties":{"characteristic_root":{"type":"array","items":{"type":"object","properties":{"ingredient":{"type":"string","description":"成分"},"total":{"type":"number","description":"特征根的总计"},"var_percentage":{"type":"number","description":"特征根的方差百分比"},"accumulation":{"type":"number","description":"特征根的累积"}},"required":["ingredient","total","var_percentage","accumulation"]},"description":"特征根"},"rotate_variance_explained_rate":{"type":"array","items":{"type":"object","properties":{"ingredient":{"type":"string","description":"成分"},"total":{"type":"number","description":"特征根的总计"},"var_percentage":{"type":"number","description":"特征根的方差百分比"},"accumulation":{"type":"number","description":"特征根的累积"}},"required":["ingredient","total","var_percentage","accumulation"]},"description":"旋转后方差解释率"}},"required":["characteristic_root","rotate_variance_explained_rate"],"description":"总方差解释"},"factor_coef":{"type":"array","items":{"type":"object","properties":{"column":{"type":"string","description":"字段名"},"factor_coef":{"type":"array","items":{"type":"number"},"description":"因子载荷系数"},"degree_commonality":{"type":"number","description":"共同度(公因子方差)"}},"required":["column","factor_coef","degree_commonality"]},"description":"因子载荷系数表"}},"required":["kmo_bartlett_result","explain_total_variance","factor_coef"]}},"required":["code","message","data"]}

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
  },
  "n_factors": 1
}
```



## 响应示例

```json
{
  "code": "OK",
  "message": "操作成功",
  "data": {
    "kmo_bartlett_result": {
      "kmo_value": 0.5,
      "bartlett_value": {
        "chi_square_value": 2.165366670143181,
        "df_value": 1,
        "p": 0.2823019010359391
      }
    },
    "explain_total_variance": {
      "characteristic_root": [
        {
          "ingredient": "1",
          "total": 1.9933992677987824,
          "var_percentage": 0.9966996338993914,
          "accumulation": 0.9966996338993914
        },
        {
          "ingredient": "2",
          "total": 0.006600732201217097,
          "var_percentage": 0.003300366100608549,
          "accumulation": 1
        }
      ],
      "rotate_variance_explained_rate": [
        {
          "ingredient": "1",
          "total": 1.9933992677987824,
          "var_percentage": 0.9966996338993914,
          "accumulation": 0.9966996338993914
        }
      ]
    },
    "factor_coef": [
      {
        "column": "No.",
        "factor_coef": [
          0.9983484531461904
        ],
        "degree_commonality": 0.9966996338993911
      },
      {
        "column": "Age",
        "factor_coef": [
          0.9983484531461904
        ],
        "degree_commonality": 0.9966996338993911
      }
    ]
  }
}
```

