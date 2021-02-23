<template>
  <div class="homePage">
    <el-row :mutter="0" style=" margin: 0 auto; width: 1203px">
      <el-col :span="5" class="homePageLeft">
        <HomePageLeft></HomePageLeft>
      </el-col>
      <el-col :span="19" class="homePageRight">
        <!-- <HomePageRight></HomePageRight> -->
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HomePageLeft from './HomePageLeft.vue'
import HomePageRight from './homePageRight.vue'
export default {
  name: 'homePage',
  components: {
    HomePageLeft,
    HomePageRight
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.homePage {
  width: 100%;
  padding-top: 21px;
  min-width: 1200px;
}
.homePageLeft {
  min-width: 220px;
  width: 220px;
  height: 639px;
  background: #FFFFFF;
  border: 1px solid #e1e1e1;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
.homePageRight{
  min-width: 981px;
  width: 981px;
  height: 639px;
  background: #FFFFFF;
  box-shadow: 0px 2px 13px 0px rgba(0,0,0,0.05);
}
</style>
