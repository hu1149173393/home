<template>
  <div class="invitation">
    <el-row :gutter="0" class="demo" style="border: 1px solid">
      <el-col class="invitationLeft" :span="6">
        <!-- <TypeTable></TypeTable> -->
      </el-col>
      <el-col class="invitationRight" :span="18" style="border: 1px solid">
        <div v-if="showone">
          <router-link to="">返回</router-link>
          <el-row :gutter="0" style="border: 1px solid">
            <el-col :span="5"><p @click="a1">发出的邀请</p> </el-col>
            <el-col :span="15"><p @click="a2">收到的邀请</p> </el-col>
            <el-col :span="3" style="text-align: right"
              ><el-button @click="yincang" size="middle"
                >邀请企业关联</el-button
              ></el-col
            >
          </el-row>
          <div v-if="showinvite">
            <invitelist></invitelist>
          </div>
          <div v-if="showreceinvite">
            <receivendinvite></receivendinvite>
          </div>
        </div>

        <div v-else>
          <InvitePage></InvitePage>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import InvitePage from '../components/InvitePage'
import invitelist from '../components/inviteList'
import receivendinvite from '../components/ReceivedInvite'
// import TypeTable from "../components/TypeTable";
export default {
  name: 'invitation',
  components: {
    InvitePage,
    // TypeTable,
    invitelist,
    receivendinvite
  },
  data () {
    return {
      showone: true,

      showinvite: true,
      showreceinvite: false,
      // 右边上面搜索框
      LeftSearchBox: '',
      //   左边表格数据
      Relationship_types: [],
      // 左边表格 定义显示什么
      defaultProps: {
        label: 'name'
      }
    }
  },
  created () {
    this.leftlist()
  },
  mounted () {},
  methods: {
    ...mapActions(['Typelist']),
    // 获取类型列表
    async leftlist () {
      const res = await this.Typelist()
      console.log(res)
    },

    yincang () {
      this.showone = false
    },
    //   编辑
    leftCompile (item, index) {},
    // 左侧删除
    leftDelte (item, index) {},
    // 左侧输入框筛选
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    a1 () {
      this.showinvite = true
      this.showreceinvite = false
    },
    a2 () {
      this.showinvite = false
      this.showreceinvite = true
    }
  },
  watch: {
    LeftSearchBox (val) {
      // 然后 下面的表格数据 数组 通过 筛选后 再次刷新 实现 搜索功能
      this.$refs.tree.filter(val)
    }
  }
}
</script>

<style>
.demo {
  min-width: 1200px;
  width: 1600px;
  margin: 0 auto;
}
.left-table {
  display: flex;
  justify-content: space-between;
}
</style>
