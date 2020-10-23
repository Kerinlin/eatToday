<template>
  <div class="container">
    <button v-if="!isChose" class="btn startBtn" @click="randomShop">今天吃什么？</button>
    <div v-if="isChose" class="title-container">
      <p class="title">{{ shopName }}</p>
      <button class="btn" @click="randomShop">换一个</button>
    </div>

    <div class="introduce-card"></div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      lat: '', // 纬度
      lng: '', // 经度
      apiOption: {
        key: '8b50915d673c8619bcb2b9ad3cc154f5',
        lat: '',
        lng: '',
        types: '050000',
        radius: 1000,
        pageSize: 100,
        page: 1,
        extensions: 'all',
        sortrule: 'weight',
      },
      fullShopData: [],
      shopName: '',
      isChose: false,
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
        });
      });
    },

    // 获取附近25家店铺信息
    getData() {
      const url = `https://restapi.amap.com/v3/place/around?key=${this.apiOption.key}&location=${this.lng},${this.lat}&radius=${this.apiOption.radius}&types=${this.apiOption.types}&offset=${this.apiOption.pageSize}&page=${this.apiOption.page}&extensions=${this.apiOption.extensions}&sortrule=${this.apiOption.sortrule}`;
      axios(url)
        .then((res) => {
          // console.log(res.data.pois);
          this.fullShopData = res.data.pois;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    random(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },

    // 随机抽取一家店铺
    randomShop() {
      const total = this.fullShopData.length;
      const randomIndex = this.random(0, total);
      this.shopName = this.fullShopData[randomIndex].name;
      this.isChose = true;
      console.log(randomIndex);
      console.log(this.fullShopData[randomIndex].name);
      console.log(this.fullShopData[randomIndex]);
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
  .title-container {
    padding: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 25px;
    text-align: center;
    .btn {
      margin-top: 20px;
      padding: 10px 40px;
    }
  }
  // .introduce-card {
  //   position: absolute;
  //   left: 50%;
  //   top: 30%;
  // }

  .btn {
    background-color: #1f2b37;
    outline: none;
    color: white;
    border: 4px solid white;
    border-radius: 50px;
    font-size: 25px;
    font-weight: 400;
    letter-spacing: 1px;
    cursor: pointer;
    transition: 400ms ease-in-out;
    &:hover {
      background-color: #fff;
      color: #253241;
    }
  }
}
</style>
