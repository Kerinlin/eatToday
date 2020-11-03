export default {
  type: '050000', //类别
  distance: 2000, //搜寻半径 取值范围:0-50000。
  key: '8b50915d673c8619bcb2b9ad3cc154f5', //高德地图私钥
  pageSize: 50, //每页数据条数
  sortrule: 'weight', // 排序规则 weight | distance
  extensions: 'all', //返回结果  base返回基本地址信息；取值为all返回地址信息、附近POI、道路以及道路交叉口信息。
  restaurantTypes: [
    {
      name: '中餐厅',
      value: '050100',
      types: [
        {
          name: '综合酒楼',
          value: '050101'
        },
        {
          name: '四川菜(川菜)',
          value: '050102'
        },
        {
          name: '广东菜(粤菜)',
          value: '050103'
        },
        {
          name: '山东菜(鲁菜)',
          value: '050104'
        },
        {
          name: '江苏菜',
          value: '050105'
        },
        {
          name: '浙江菜',
          value: '050106'
        },
        {
          name: '上海菜',
          value: '050107'
        },
        {
          name: '湖南菜(湘菜)',
          value: '050108'
        },
        {
          name: '安徽菜(徽菜)',
          value: '050109'
        },
        {
          name: '福建菜',
          value: '050110'
        },
        {
          name: '北京菜',
          value: '050111'
        },
        {
          name: '湖北菜(鄂菜)',
          value: '050112'
        },
        {
          name: '东北菜',
          value: '050113'
        },
        {
          name: '云贵菜',
          value: '050114'
        },
        {
          name: '西北菜',
          value: '050115'
        },
        {
          name: '老字号',
          value: '050116'
        },
        {
          name: '火锅店',
          value: '050117'
        },
        {
          name: '特色/地方风味餐厅',
          value: '050118'
        },
        {
          name: '海鲜酒楼',
          value: '050119'
        },
        {
          name: '中式素菜馆',
          value: '050120'
        },
        {
          name: '清真菜馆',
          value: '050121'
        },
        {
          name: '台湾菜',
          value: '050122'
        },
        {
          name: '潮州菜',
          value: '050123'
        }
      ]
    },
    {
      name: '外国餐厅',
      value: '050200',
      types: [
        {
          name: '西餐厅(综合风味)',
          value: '050201'
        },
        {
          name: '日本料理',
          value: '050202'
        },
        {
          name: '韩国料理',
          value: '050203'
        },
        {
          name: '法式菜品餐厅',
          value: '050204'
        },
        {
          name: '意式菜品餐厅',
          value: '050205'
        },
        {
          name: '泰国/越南菜品餐厅',
          value: '050206'
        },
        {
          name: '地中海风格菜品',
          value: '050207'
        },
        {
          name: '美式风味',
          value: '050208'
        },
        {
          name: '印度风味',
          value: '050209'
        },
        {
          name: '英国式菜品餐厅',
          value: '050210'
        },
        {
          name: '牛扒店(扒房)',
          value: '050211'
        },
        {
          name: '俄国菜',
          value: '050212'
        },
        {
          name: '葡国菜',
          value: '050213'
        },
        {
          name: '德国菜',
          value: '050214'
        },
        {
          name: '巴西菜',
          value: '050215'
        },
        {
          name: '墨西哥菜',
          value: '050216'
        },
        {
          name: '其它亚洲菜',
          value: '050217'
        }
      ]
    },
    {
      name: '快餐厅',
      value: '050300',
      types: [
        {
          name: '肯德基',
          value: '050301'
        },
        {
          name: '麦当劳',
          value: '050302'
        },
        {
          name: '必胜客',
          value: '050303'
        },
        {
          name: '永和豆浆',
          value: '050304'
        },
        {
          name: '茶餐厅',
          value: '050305'
        },
        {
          name: '大家乐',
          value: '050306'
        },
        {
          name: '大快活',
          value: '050307'
        },
        {
          name: '美心',
          value: '050308'
        },
        {
          name: '吉野家',
          value: '050309'
        },
        {
          name: '仙跡岩',
          value: '050310'
        },
        {
          name: '呷哺呷哺',
          value: '050311'
        }
      ]
    },
    {
      name: '休闲餐饮',
      value: '050400'
    },
    {
      name: '咖啡厅',
      value: '050500',
      types: [
        {
          name: '星巴克咖啡',
          value: '050501'
        },
        {
          name: '上岛咖啡',
          value: '050502'
        },
        {
          name: 'Pacific Coffee Company',
          value: '050503'
        },
        {
          name: '巴黎咖啡店',
          value: '050504'
        }
      ]
    },
    {
      name: '茶艺馆',
      value: '050600'
    },
    {
      name: '冷饮店',
      value: '050700'
    },
    {
      name: '糕饼店',
      value: '050800'
    },
    {
      name: '甜品店',
      value: '050900'
    }
  ]
};
