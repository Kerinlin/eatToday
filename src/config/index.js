export default {
  type: '050000', //类别
  distance: 2000, //搜寻半径 取值范围:0-50000。
  key: '8b50915d673c8619bcb2b9ad3cc154f5', //高德地图私钥
  pageSize: 50, //每页数据条数
  sortrule: 'weight', // 排序规则 weight | distance
  extensions: 'all' //返回结果  base返回基本地址信息；取值为all返回地址信息、附近POI、道路以及道路交叉口信息。
};
