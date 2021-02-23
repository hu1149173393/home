<template>
  <div id="app">
    <div style="height:70px;background: #223361;">
      <ul class="homepageTop">
        <li class=""><img @click="HomePage" :src="yiyun" alt=""></li>
        <li class="relationshipsWord">外部关系</li>
        <li class=""></li>
      </ul>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data () {
    return {
      yiyun: require('./static/Bitmap.png')
    }
  },
  methods: {
    HomePage(){
      window.location.href = 'http://192.168.200.4:7000/pc/platform/index.html#/homePage'; 
    }
  },
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
ul li{
  list-style: none;
}
.homepageTop{
width: 1200px;
margin: 0 auto;
display: flex;
align-items: center;
padding-top: 23px;
}
li{
  width: 72px;
  flex: auto;
}
.relationshipsWord{
  width: 72px;
height: 24px;
font-size: 18px;
font-family: MicrosoftYaHei;
margin: 0 auto;
text-align: center;
color: #ffffff;
line-height: 24px;
}
</style>
