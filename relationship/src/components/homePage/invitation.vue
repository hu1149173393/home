<template>
  <div class="invitation">
    <el-row
      :mutter="0"
      class=""
      style="height: 63px; border-bottom: 1px solid #e1e1e1; line-height: 63px"
    >
      <el-col :span="7" style="">
        <button class="return" @click="goBack">
          <i class="el-icon-arrow-left"></i><span class="goon">返回</span>
        </button>
      </el-col>
      <el-col :span="9">
        <!-- <p @click="invitationPage" :class="wordColor ? 'InvitationsIssuedB':'InvitationsIssued' ">发出的邀请</p>
        <p @click="ReceivedPage" :class="wordColorB  ?  'InvitationsReceivedB':'InvitationsReceived' ">收到的邀请</p> -->
        <router-link class="InvitationsIssued" :to=" { name :'emit' } " exact>发出的邀请</router-link>
        <router-link class="InvitationsReceived" :to=" { name:'InvitationsReceived' } ">收到的邀请</router-link>
        <!-- <p @click="invitationPage" class="InvitationsIssued">发出的邀请</p>
        <p @click="ReceivedPage" class="InvitationsReceived">收到的邀请</p> -->
      </el-col>
      <el-col :span="8" style="text-align: right">
        <button
          class="EnterpriseAssociation"
          @click="InviteEnterpriseAssociation"
        >
          邀请企业关联
        </button>
      </el-col>
    </el-row>
    <div>
      <router-view></router-view>
    </div>
    <!-- 点击邀请企业关联后 出现的页面 -->
    <!-- <div v-else>
        <InvitePage></InvitePage>
    </div> -->
  </div>
</template>

<script>
import InvitePage from './InvitePage'
export default {
  name: 'invitation',
  components: {
    InvitePage
  },
  data () {
    return {
      options: [
        {
          value: '选项5',
          label: '全部'
        },
        {
          value: '选项1',
          label: '待通过'
        },
        {
          value: '选项2',
          label: '已同意'
        },
        {
          value: '选项3',
          label: '已拒绝'
        },
        {
          value: '选项4',
          label: '已失效'
        }
      ],
      value: '',

      inviteTable: [],

      showInvitePage: true,

      searchInput: '',
      wordColor: true,
      wordColorB: true
    }
  },
  methods: {
    results (item, index) {},

    // 邀请企业关联
    InviteEnterpriseAssociation () {
      // this.showInvitePage = false
      this.$router.push({
        path: '/InvitePage'
      })
    },
    invitationPage () {
      this.wordColor = true
      this.wordColorB = false
      this.$router.push({
        path: '/invitation'
      })
    },
    ReceivedPage () {
      this.wordColor = false
      this.wordColorB = true
      this.$router.push({
        path: '/InvitationsReceived'
      })
    },
    goBack () {
      this.$router.push({
        path: '/HomePageRight'
      })
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.return {
  width: 68px;
  height: 32px;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  background: #ffffff;
  border: 1px solid #e1e1e1;
  margin-left: 31px;
}
.goon {
  width: 28px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #192025;
  line-height: 20px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}

.InvitationsIssued {
  width: 90px;
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: rgba(0, 0, 0, 0.25);
  line-height: 25px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  display: inline-block;
}
.InvitationsIssued.router-link-active{
  width: 90px;
height: 25px;
font-size: 18px;
font-family: PingFangSC, PingFangSC-Regular;
font-weight: 400;
text-align: left;
color: #000000;
line-height: 25px;
text-shadow: 0px 2px 13px 0px rgba(0,0,0,0.05);
  display: inline-block;
}
.InvitationsReceived {
  width: 90px;
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: rgba(0, 0, 0, 0.25);
  line-height: 25px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  display: inline-block;
  margin-left: 50px;
}
.InvitationsReceived.router-link-active{
  width: 90px;
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
color: #000000;
  line-height: 25px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  display: inline-block;
  margin-left: 50px;
}

.EnterpriseAssociation {
  width: 118px;
  height: 32px;
  background: #3389ff;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
  line-height: 14px;
  border: 1px solid #3389ff;
  margin-right: 30px;
}
.EnterpriseAssociation:focus,
.EnterpriseAssociation:active:focus,
.EnterpriseAssociation.active:focus,
.EnterpriseAssociation.focus,
.EnterpriseAssociation:active.focus,
.EnterpriseAssociation.active.focus {
  outline: none;
  /* border-color: transparent; // 若是本身具有 border 请删除此属性 */
  box-shadow: none;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.result {
  width: 56px;
  height: 22px;
  opacity: 0.85;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: right;
  color: #000000;
  line-height: 22px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  margin-left: 30px;
}
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
