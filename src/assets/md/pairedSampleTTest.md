# 配对样本T检验



## 请求方法与路径

+ 请求方法：`POST`

+ 请求路径：`https://openapi.spsspro.com/openapi/v1/domain/algorithm/analysis/parameter-test/paired-sample-t-test`

  

## 请求参数

<json-table>

{"$schema":"http://json-schema.org/draft-04/schema#","type":"object","properties":{"data_x1":{"type":"DataFrame[float]","properties":{},"description":"变量X1"},"data_x2":{"type":"DataFrame[float]","properties":{},"description":"变量X2"}},"required":["data_x1","data_x2"]}

</json-table>



## 响应参数

<json-table>

{"$schema":"http://json-schema.org/draft-04/schema#","type":"object","properties":{"code":{"type":"string","description":"响应码"},"message":{"type":"string","description":"响应码的描述"},"data":{"type":"object","properties":{"normality_test":{"type":"array","items":{"type":"object","properties":{"pair_data_1":{"type":"object","properties":{"name":{"type":"string","description":"变量名"},"sample":{"type":"number","description":"样本量"},"mean_value":{"type":"number","description":"平均值"},"std_value":{"type":"number","description":"标准差"},"skewness":{"type":"number","description":"偏度"},"kurtosis":{"type":"number","description":"峰度"},"sw_statistics":{"type":"number","description":"S-W检验值"},"sw_p":{"type":"number","description":"S-W检验 P值"},"ks_statistics":{"type":"number","description":"K-S检验值"},"ks_p":{"type":"number","description":"K-S检验 P值"}},"required":["name","sample","mean_value","std_value","skewness","kurtosis","sw_statistics","sw_p","ks_statistics","ks_p"],"description":"配对变量1的正态性检验结果"},"pair_data_2":{"type":"object","properties":{"name":{"type":"string","description":"变量名"},"sample":{"type":"number","description":"样本量"},"mean_value":{"type":"number","description":"平均值"},"std_value":{"type":"number","description":"标准差"},"skewness":{"type":"number","description":"偏度"},"kurtosis":{"type":"number","description":"峰度"},"sw_statistics":{"type":"number","description":"S-W检验值"},"sw_p":{"type":"number","description":"S-W检验 P值"},"ks_statistics":{"type":"number","description":"K-S检验值"},"ks_p":{"type":"number","description":"K-S检验 P值"}},"required":["name","sample","mean_value","std_value","skewness","kurtosis","sw_statistics","sw_p","ks_statistics","ks_p"],"description":"配对变量2的正态性检验结果"},"diff_data":{"type":"object","properties":{"name":{"type":"string","description":"变量名"},"sample":{"type":"number","description":"样本量"},"mean_value":{"type":"number","description":"平均值"},"std_value":{"type":"number","description":"标准差"},"skewness":{"type":"number","description":"偏度"},"kurtosis":{"type":"number","description":"峰度"},"sw_statistics":{"type":"number","description":"S-W检验值"},"sw_p":{"type":"number","description":"S-W检验 P值"},"ks_statistics":{"type":"number","description":"K-S检验值"},"ks_p":{"type":"number","description":"K-S检验 P值"}},"required":["name","sample","mean_value","std_value","skewness","kurtosis","sw_statistics","sw_p","ks_statistics","ks_p"],"description":"配对差值正态性检验结果"}},"required":["pair_data_1","pair_data_2","diff_data"]},"description":"正态性检验结果"},"paired_t_test_result":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","description":"变量名"},"mean_diff_value":{"type":"number","description":"配对平均值差值"},"data1_mean":{"type":"number","description":"配对1平均值"},"data1_std":{"type":"number","description":"配对1标准差"},"data2_mean":{"type":"number","description":"配对2平均值"},"data2_std":{"type":"number","description":"配对2标准差"},"std_diff_value":{"type":"number","description":" 配对标准差差值"},"t_value":{"type":"number","description":"T检验值"},"df":{"type":"number","description":"自由度"},"p_value":{"type":"number","description":"T检验 P值"},"cohen_s_d":{"type":"number","description":"Cohen's d值"}},"required":["name","mean_diff_value","data1_mean","data1_std","data2_mean","data2_std","std_diff_value","t_value","df","p_value","cohen_s_d"]},"description":"配对样本T结果"}},"required":["normality_test","paired_t_test_result"],"description":"算法返回数据"}},"required":["code","message","data"]}

</json-table>

## 请求示例

```json
{
  "data_x1": {
    "columns": [
      "No.",
      "Age"
    ],
    "data": [
      [
        1,
        13
      ],
      [
        2,
        22
      ],
      [
        7,
        24
      ],
      [
        8,
        21
      ],
      [
        5,
        29
      ]
    ]
  },
  "data_x2": {
    "columns": [
      "No.",
      "Age"
    ],
    "data": [
      [
        7,
        18
      ],
      [
        2,
        20
      ],
      [
        4,
        23
      ],

      [
        4,
        22
      ],
      [
        2,
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
    "normality_test": [
      {
        "pair_data_1": {
          "name": "No.",
          "sample": 5,
          "mean_value": 4.6,
          "std_value": 3.0495901363953815,
          "skewness": -0.162193486269149,
          "kurtosis": -2.5008671522719412,
          "sw_statistics": 0.9228788614273071,
          "sw_p": 0.5486792325973511,
          "ks_statistics": 0.5779875296676942,
          "ks_p": 0.04093304647779234
        },
        "pair_data_2": {
          "name": "No.",
          "sample": 5,
          "mean_value": 3.8,
          "std_value": 2.04939015319192,
          "skewness": 1.0223715049937019,
          "kurtosis": 0.9183673469387763,
          "sw_statistics": 0.8622022867202759,
          "sw_p": 0.23626375198364258,
          "ks_statistics": 0.46112892982603093,
          "ks_p": 0.17295161469059195
        },
        "diff_data": {
          "name": "No.配对No.",
          "sample": 5,
          "mean_value": 0.8,
          "std_value": 4.08656334834051,
          "skewness": -1.59277649239705,
          "kurtosis": 2.2650507368496537,
          "sw_statistics": 0.8132316470146179,
          "sw_p": 0.10341956466436386,
          "ks_statistics": 0.3048321643719206,
          "ks_p": 0.6449424485143799
        }
      },
      {
        "pair_data_1": {
          "name": "Age",
          "sample": 5,
          "mean_value": 21.8,
          "std_value": 5.805170109479997,
          "skewness": -0.6348582162363112,
          "kurtosis": 1.584675395574493,
          "sw_statistics": 0.9570562243461609,
          "sw_p": 0.7873505353927612,
          "ks_statistics": 0.9967527623602257,
          "ks_p": 7.221050090497237e-13
        },
        "pair_data_2": {
          "name": "Age",
          "sample": 5,
          "mean_value": 21.2,
          "std_value": 2.16794833886788,
          "skewness": -0.9127170462413424,
          "kurtosis": -0.7378904481665938,
          "sw_statistics": 0.8713003396987915,
          "sw_p": 0.2717289924621582,
          "ks_statistics": 0.999999999998819,
          "ks_p": 4.596011160673312e-60
        },
        "diff_data": {
          "name": "Age配对Age",
          "sample": 5,
          "mean_value": 0.6,
          "std_value": 4.03732584763727,
          "skewness": -0.12308456985909065,
          "kurtosis": 0.6763521397116978,
          "sw_statistics": 0.9902304410934448,
          "sw_p": 0.9804955124855042,
          "ks_statistics": 0.16438424353729053,
          "ks_p": 0.9957515627149778
        }
      }
    ],
    "paired_t_test_result": [
      {
        "name": "No.配对No.",
        "mean_diff_value": 0.7999999999999998,
        "data1_mean": 4.6,
        "data1_std": 3.0495901363953815,
        "data2_mean": 3.8,
        "data2_std": 2.04939015319192,
        "std_diff_value": 1.0001999832034616,
        "t_value": 0.43774052413166625,
        "df": 4,
        "p_value": 0.6841735724143465,
        "cohen_s_d": 0.1957635136929585
      },
      {
        "name": "Age配对Age",
        "mean_diff_value": 0.6000000000000014,
        "data1_mean": 21.8,
        "data1_std": 5.805170109479997,
        "data2_mean": 21.2,
        "data2_std": 2.16794833886788,
        "std_diff_value": 3.637221770612117,
        "t_value": 0.3323092653730268,
        "df": 4,
        "p_value": 0.7563404785450805,
        "cohen_s_d": 0.14861322138542132
      }
    ]
  }
}
```

