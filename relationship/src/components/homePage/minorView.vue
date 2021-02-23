<template>
  <!-- 次要负责人查看页面 -->
  <div class="minor">
    <el-row
      :mutter="0"
      style="height: 63px; border-bottom: 1px solid #e1e1e1; line-height: 63px"
    >
      <el-col :span="8">
        <button class="return" @click="goBack">
          <i class="el-icon-arrow-left"></i><span class="goon">返回</span>
        </button>
      </el-col>
      <el-col :span="8">
        <p class="EditRelation">查看企业外部关系</p>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>

    <div
      style="
        display: flex;
        justify-content: space-between;
        width: 920px;
        margin-left: 31px;
        padding-top: 23px;
        border-bottom: 1px solid #eeeeee;
        height: 64px;
      "
    >
      <div style="display: flex; justify-content: space-between; width: 325px">
        <p class="EditName">{{ EditName }} - {{ EditCode }} <br> <span>{{concept}}</span> </p>
        <p class="EditType">{{ selectedValue }}</p>
      </div>
      <div>
        <div class="EditState" v-if="EditStatus == 0">
          <img :src="AssociatedImg" alt="" />已关联
        </div>
        <div class="AssociatedStates unbundling" v-if="EditStatus == 1">
          已解绑
        </div>
        <div class="AssociatedStates remove" v-if="EditStatus == 2">
          已解除
        </div>
      </div>
    </div>

    <p class="EditContact">外部企业联系人</p>
    <div class="AddHead">
      <ul
        v-for="(item, index) in contact"
        :key="index"
        class="headArray"
        style="margin-bottom: 16px"
      >
        <div
          style="width: 32px; height: 32px; margin-top: 15px; margin-left: 10px"
        >
          <img
            style="width: 100%; height: 100%; border-radius: 50%"
            :src="item.img"
            alt=""
            v-if="item.img"
          />
          <span style="text-align:center; display:inline-black;widht:32px;height:32px; border-radius:50%;background:#3389FF;color:#ffffff;">{{item.ImgName}}</span>
        </div>
        <div style="margin-top: 16px; margin-left: 12px; width: 113px">
          <p class="headName">{{ item.name }}</p>
          <p class="headPhone">电话：{{ item.phone }}</p>
          <p class="headPhone">岗位：{{ item.job }}</p>
        </div>
      </ul>
    </div>

    <div class="addEffect">
      <p class="EditContact">企业负责人</p>
    </div>

    <div class="AddHead">
      <ul
        v-for="(item, index) in headList"
        :key="index"
        class="headArray"
        style="margin-bottom: 16px"
      >
        <div
          style="width: 32px; height: 32px; margin-top: 15px; margin-left: 10px"
        >
          <img
            style="width: 100%; height: 100%; border-radius: 50%"
            :src="item.memberIcon"
            alt=""
            v-if="item.memberIcon == '' ? false : true"
          />
          <span
            v-else
            style="
              width: 100%;
              height: 100%;
              border-radius: 50%;
              display: block;
              border: 1px solid;
              background: #3389ff;
              color: #ffffff;
              line-height: 32px;
              text-align:center;
            "
            >{{ CutName }}</span
          >
        </div>
        <div
          style="margin-top: 16px; margin-left: 12px; width: 113px"
          v-if="item.memberName"
        >
          <p class="headName">{{ item.memberName }}</p>
          <p class="headPhone">电话：{{ item.memberPhone }}</p>
          <p class="headPhone">岗位：{{ item.memberJob }}</p>
        </div>
        <div style="margin-top: 16px; margin-left: 12px; width: 113px" v-else>
          <p class="headName">{{ item.name }}</p>
          <p class="headPhone">电话：{{ item.phone }}</p>
          <p class="headPhone">岗位：{{ item.job }}</p>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "minor",
  data() {
    return {
      EditName: "",
      EditCode: "",
      types: "",
      EditStatus: "",
      contact: [],
      headList: [],
      id: "",
      AssociatedImg: require("../../static/AssociatedImg.png"),
      CutName: "",
      region: "",
      selectedValue: "",
      concept:'',
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.initialData();
  },
  methods: {
    ...mapActions([
      "RelationshipDetails",
      "EditMan",
      "DeleteMember",
      "addContact",
    ]),
    goBack() {
      this.$router.go(-1);
    },
    async initialData() {
      const res = await this.RelationshipDetails({ id: this.id });
      console.log(res);
      if (res.code == 1000) {
        this.selectedValue = res.data.relationCategoryName
        this.EditName = res.data.targetOrgName;
        this.EditCode = res.data.targetOrgCode;
        this.EditStatus = res.data.status;
        // res.data.targetMembers;
        res.data.targetMembers.map(succes =>{
          this.contact = [{
            img:succes.memberIcon, 
            name:succes.memberName,
            phone:succes.memberPhone,
            job:succes.memberJob,
            id:succes.memberId,
            ImgName: succes.memberName.substring(succes.memberName.length - 2),
          }]
        })
        this.headList = res.data.ourMembers;
        this.concept = res.data.targetOrgConcept
        this.headList.map((item) => {
          console.log(item);
          this.CutName = item.memberName.substring(item.memberName.length - 2);
        });
      } else {
        // this.$alert("");
      }
    },
  },
};
</script>

<style scoped>
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
.EditRelation {
  width: 144px;
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #000000;
  line-height: 25px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}
.EditRelation {
  height: 32px;
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: #000000;
  line-height: 63px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
}

.AddHead {
  width: 980px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin-left: 31px;
}
.headArray {
  width: 212px;
  height: 88px;
  background: #ffffff;
  border: 1px solid #f4f4f4;
  border-radius: 4px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: left;
  margin-right: 24px;
}
.headName {
  width: 113px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #2e2e2e;
  line-height: 20px;
}
.headPhone {
  width: 133px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #999999;
  line-height: 17px;
    white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.EditName {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #2e2e2e;
  line-height: 25px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}
.EditType {
  width: 58px;
  height: 24px;
  background: #fdf6ec;
  border: 1px solid #ffe3ba;
  border-radius: 4px;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #e8ac57;
  line-height: 24px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}
.EditState {
  width: 70px;
  height: 24px;
  background: #f0f9eb;
  border: 1px solid #ace98e;
  border-radius: 4px;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #77c753;
  line-height: 24px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}
.EditContact {
  width: 202px;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #2e2e2e;
  line-height: 22px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  margin-left: 31px;
  margin-top: 20px;
  margin-bottom: 13px;
}
.EditEdit {
  width: 24px;
  height: 14px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #5a5e66;
  line-height: 14px;
  margin-bottom: 20px;
}
.EditDelete {
  width: 24px;
  height: 14px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #5a5e66;
  line-height: 14px;
  margin-bottom: 20px;
}
.addEffect {
  width: 284px;
  display: flex;
  justify-content: space-between;
}
.addImg {
  width: 50px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  height: 20px;
}
.addImg img {
  width: 16px;
  height: 16px;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  margin-top: 2px;
}
.add {
  width: 28px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #3389ff;
  line-height: 20px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}
</style>
