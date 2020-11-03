<template>
  <div class="container">
    <div class="setting-wrapper">
      <Icon @click="openDraw = true" class="setting-btn" type="ios-settings" />
    </div>
    <button v-if="!isChose" class="btn startBtn" @click="randomShop">今天吃什么？</button>

    <div class="introduce-card" v-if="isChose">
      <h3 class="title">{{ shopName }}</h3>
      <h6 class="distance subtitle">{{ distance }}m</h6>
      <h5 class="address subtitle">{{ address }}</h5>
      <div class="changeBtn-wrapper">
        <button class="btn" @click="randomShop">换一个</button>
      </div>
    </div>

    <Drawer title="设置" v-model="openDraw" width="720" :mask-closable="true">
      <Form :model="formData" ref="formVal">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="大类" label-position="top" prop="firstType">
              <Select @on-select="selectFirstType" v-model="formData.firstType" placeholder="请选择一个大类">
                <Option v-for="(item, index) in typeList" :value="item.value" :key="index">{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="小类" label-position="top" prop="type">
              <Select
                multiple
                @on-change="selectSecondType"
                :disabled="disableChose"
                v-model="formData.type"
                placeholder="请选择小类"
              >
                <Option v-for="(item, index) in restaurantList" :value="item.value" :key="index">
                  {{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row :gutter="32">
          <Col span="12">
            <FormItem label="搜寻半径" prop="radius">
              <Input v-model="formData.radius">
                <span slot="append">M</span>
              </Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="数据排序" label-position="top" prop="sort">
              <Select @on-select="choseSortRule" v-model="formData.sort">
                <Option value="weight">综合排序</Option>
                <Option value="distance">距离排序</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row :gutter="32">
          <Col span="24">
            <FormItem label="关键词" prop="radius" label-position="top">
              <Tag
                color="primary"
                type="dot"
                v-for="(item, index) in keywordsList"
                :key="index"
                :name="item"
                closable
                @on-close="closeKeywords"
              >
                {{ item }}
              </Tag>
              <Input v-model="formData.keywords" class="mt10">
                <Button @click="addKeywords" slot="append" icon="ios-add">添加</Button>
              </Input>
            </FormItem>
          </Col>
        </Row>

        <Row :gutter="32">
          <Col span="24">
            一共匹配到 {{ fullShopData.length || 0 }} 条
            <a @click.stop="checkData = true">数据</a>
          </Col>
        </Row>

        <Row :gutter="32">
          <FormItem>
            <div class="drawer-footer tc">
              <Button style="margin-right: 18px" @click="resetForm('formVal')">随便吃什么</Button>
              <Button type="primary" @click="getFilterData">我今天就吃这个</Button>
            </div>
          </FormItem>
        </Row>
      </Form>
    </Drawer>

    <div class="modal-wrapper">
      <Modal v-model="checkData" title="匹配数据" :transfer="false" width="900">
        <Table :columns="column" :data="fullShopData" max-height="500">
          <template slot-scope="{ row }" slot="name">
            <span>{{ row.name }}</span>
          </template>
          <template slot-scope="{ row }" slot="distance">
            <span>{{ row.distance }}</span>
          </template>
          <template slot-scope="{ row }" slot="tel">
            <span>{{ row.tel }}</span>
          </template>
          <template slot-scope="{ row }" slot="rate">
            <span>{{ row.biz_ext.rating }}</span>
          </template>
          <template slot-scope="{ row }" slot="cost">
            <span>{{ row.biz_ext.cost }}</span>
          </template>
        </Table>
        <p class="mt10">
          更详细的数据可看
          <a
            :href="`https://restapi.amap.com/v3/place/around?key=${apiOption.key}&keywords=${apiOption.keywords}&location=${lng},${lat}&radius=${apiOption.radius}&types=${apiOption.types}&offset=${apiOption.pageSize}&page=${apiOption.page}&extensions=${apiOption.extensions}&sortrule=${apiOption.sortrule}`"
            target="_blank"
          >
            接口
          </a>
        </p>
      </Modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../config/index.js';
export default {
  name: 'Home',
  data() {
    return {
      lat: '', // 纬度
      lng: '', // 经度
      apiOption: {
        key: config.key,
        keywords: '',
        lat: '',
        lng: '',
        types: config.type,
        radius: config.distance,
        pageSize: config.pageSize,
        page: 1,
        extensions: config.extensions,
        sortrule: config.sortrule,
      },
      fullShopData: [],
      shopName: '',
      distance: '',
      isChose: false,
      address: '',

      openDraw: false,
      disableChose: true,

      column: [
        {
          title: '店名',
          slot: 'name',
        },
        {
          title: '距离',
          slot: 'distance',
        },
        {
          title: '电话',
          slot: 'tel',
        },
        {
          title: '人均消费',
          slot: 'cost',
        },
        {
          title: '评分',
          slot: 'rate',
        },
      ],

      keywordsList: [],

      checkData: false,

      restaurantList: [],
      typeList: [
        {
          name: '中餐厅',
          value: '050100',
          types: [
            {
              name: '综合酒楼',
              value: '050101',
            },
            {
              name: '四川菜(川菜)',
              value: '050102',
            },
            {
              name: '广东菜(粤菜)',
              value: '050103',
            },
            {
              name: '山东菜(鲁菜)',
              value: '050104',
            },
            {
              name: '江苏菜',
              value: '050105',
            },
            {
              name: '浙江菜',
              value: '050106',
            },
            {
              name: '上海菜',
              value: '050107',
            },
            {
              name: '湖南菜(湘菜)',
              value: '050108',
            },
            {
              name: '安徽菜(徽菜)',
              value: '050109',
            },
            {
              name: '福建菜',
              value: '050110',
            },
            {
              name: '北京菜',
              value: '050111',
            },
            {
              name: '湖北菜(鄂菜)',
              value: '050112',
            },
            {
              name: '东北菜',
              value: '050113',
            },
            {
              name: '云贵菜',
              value: '050114',
            },
            {
              name: '西北菜',
              value: '050115',
            },
            {
              name: '老字号',
              value: '050116',
            },
            {
              name: '火锅店',
              value: '050117',
            },
            {
              name: '特色/地方风味餐厅',
              value: '050118',
            },
            {
              name: '海鲜酒楼',
              value: '050119',
            },
            {
              name: '中式素菜馆',
              value: '050120',
            },
            {
              name: '清真菜馆',
              value: '050121',
            },
            {
              name: '台湾菜',
              value: '050122',
            },
            {
              name: '潮州菜',
              value: '050123',
            },
          ],
        },
        {
          name: '外国餐厅',
          value: '050200',
          types: [
            {
              name: '西餐厅(综合风味)',
              value: '050201',
            },
            {
              name: '日本料理',
              value: '050202',
            },
            {
              name: '韩国料理',
              value: '050203',
            },
            {
              name: '法式菜品餐厅',
              value: '050204',
            },
            {
              name: '意式菜品餐厅',
              value: '050205',
            },
            {
              name: '泰国/越南菜品餐厅',
              value: '050206',
            },
            {
              name: '地中海风格菜品',
              value: '050207',
            },
            {
              name: '美式风味',
              value: '050208',
            },
            {
              name: '印度风味',
              value: '050209',
            },
            {
              name: '英国式菜品餐厅',
              value: '050210',
            },
            {
              name: '牛扒店(扒房)',
              value: '050211',
            },
            {
              name: '俄国菜',
              value: '050212',
            },
            {
              name: '葡国菜',
              value: '050213',
            },
            {
              name: '德国菜',
              value: '050214',
            },
            {
              name: '巴西菜',
              value: '050215',
            },
            {
              name: '墨西哥菜',
              value: '050216',
            },
            {
              name: '其它亚洲菜',
              value: '050217',
            },
          ],
        },
        {
          name: '快餐厅',
          value: '050300',
          types: [
            {
              name: '肯德基',
              value: '050301',
            },
            {
              name: '麦当劳',
              value: '050302',
            },
            {
              name: '必胜客',
              value: '050303',
            },
            {
              name: '永和豆浆',
              value: '050304',
            },
            {
              name: '茶餐厅',
              value: '050305',
            },
            {
              name: '大家乐',
              value: '050306',
            },
            {
              name: '大快活',
              value: '050307',
            },
            {
              name: '美心',
              value: '050308',
            },
            {
              name: '吉野家',
              value: '050309',
            },
            {
              name: '仙跡岩',
              value: '050310',
            },
            {
              name: '呷哺呷哺',
              value: '050311',
            },
          ],
        },
        {
          name: '休闲餐饮',
          value: '050400',
        },
        {
          name: '咖啡厅',
          value: '050500',
          types: [
            {
              name: '星巴克咖啡',
              value: '050501',
            },
            {
              name: '上岛咖啡',
              value: '050502',
            },
            {
              name: 'Pacific Coffee Company',
              value: '050503',
            },
            {
              name: '巴黎咖啡店',
              value: '050504',
            },
          ],
        },
        {
          name: '茶艺馆',
          value: '050600',
        },
        {
          name: '冷饮店',
          value: '050700',
        },
        {
          name: '糕饼店',
          value: '050800',
        },
        {
          name: '甜品店',
          value: '050900',
        },
      ],
      formData: {
        firstType: '',
        type: [],
        radius: config.distance,
        sort: config.sortrule,
        keywords: '',
      },
    };
  },
  created() {
    this.getLocation();
  },
  methods: {
    // 获取当前位置
    getLocation() {
      const that = this;
      AMap.plugin('AMap.Geolocation', () => {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          timeout: 10000,
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', (data) => {
          // console.log('纬度:', data.position.lat);
          // console.log('经度:', data.position.lng);
          that.lat = data.position.lat;
          that.lng = data.position.lng;
          this.getData();
        });
        AMap.event.addListener(geolocation, 'error', (err) => {
          console.log(err);
          console.log('获取定位失败');
        });
      });
    },

    // 获取附近25家店铺信息
    getData() {
      const url = `https://restapi.amap.com/v3/place/around?key=${this.apiOption.key}&keywords=${this.apiOption.keywords}&location=${this.lng},${this.lat}&radius=${this.apiOption.radius}&types=${this.apiOption.types}&offset=${this.apiOption.pageSize}&page=${this.apiOption.page}&extensions=${this.apiOption.extensions}&sortrule=${this.apiOption.sortrule}`;
      axios(url)
        .then((res) => {
          // console.log(res.data.pois);
          this.fullShopData = res.data.pois;
        })
        .catch((err) => {
          console.log(err);
          console.log('获取店铺信息失败');
        });
    },

    // 生成随机数
    random(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },

    // 随机抽取一家店铺
    randomShop() {
      if (!this.fullShopData || this.fullShopData.length === 0) {
        // console.log('附近无店铺或者获取店铺数据失败');
        this.$Notice.info({
          title: '附近无店铺信息，吃点正常的东西吧!',
        });
        return false;
      }

      const total = this.fullShopData.length;
      const randomIndex = this.random(0, total);

      this.shopName = this.fullShopData[randomIndex].name;
      this.distance = this.fullShopData[randomIndex].distance;
      this.address = this.fullShopData[randomIndex].address;
      this.isChose = true;
    },

    // 筛选大类
    selectFirstType(val) {
      // 筛选出当前选中项的数据，方便取子项目
      const result = this.typeList.filter((item) => item.value === val.value);
      this.restaurantList = result[0].types;
      this.apiOption.types = val.value;
      this.disableChose = false;
    },

    // 筛选小类
    selectSecondType(val) {
      if (this.formData.type.length === 0) {
        // 小类选择后又取消，types传默认值
        this.apiOption.types = config.type;
      } else if (Array.isArray(this.formData.type) && this.formData.type.length > 1) {
        // 大于两条数据拼接数据格式
        this.apiOption.types = this.formData.type.join('|');
      } else {
        // 一条数据直接传入第一条数据
        this.apiOption.types = this.formData.type[0];
      }
      console.log(this.apiOption.types);
    },

    // 获取筛选后的数据
    getFilterData() {
      this.getKeywords();
      this.getData();
    },

    // 清除所有选择的筛选项
    resetForm(name) {
      this.$refs[name].resetFields();
      this.apiOption.types = config.type;
      this.apiOption.radius = config.distance;
      this.getData();
    },

    // 设置排序规则
    choseSortRule(val) {
      this.apiOption.sortrule = val.value;
    },

    // 添加关键词
    addKeywords() {
      this.keywordsList.push(this.formData.keywords);
    },

    // 删除关键词
    closeKeywords(event, name) {
      const index = this.keywordsList.indexOf(name);
      this.keywordsList.splice(index, 1);

      // 如果删除了所以关键词，重置
      if (this.keywordsList.length === 0) {
        this.apiOption.keywords = '';
      }
    },

    // 获取关键词数组
    getKeywords() {
      this.apiOption.keywords = this.keywordsList.join('|');
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  // text-align: center;
  .startBtn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 100px;
  }
  .introduce-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    color: #fff;
    .title {
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      letter-spacing: 2px;
    }
    .subtitle {
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      margin: 0;
      margin: 10px 0px;
    }
    .changeBtn-wrapper {
      margin-top: 40px;
      text-align: center;
      .btn {
        border-radius: 20px;
      }
    }
  }
  .setting-wrapper {
    position: absolute;
    top: 30px;
    right: 50px;
    .setting-btn {
      font-size: 40px;
      color: #fff;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
.btn {
  padding: 10px 40px;
  // background-color: #1f2b37;
  background-color: transparent;
  outline: none;
  color: white;
  border: 2px solid white;
  border-radius: 50px;
  font-size: 25px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 400ms ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255);
    color: #0f1822;
  }
}
</style>
