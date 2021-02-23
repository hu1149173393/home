<template>
  <div class="InvitePage">
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
        <p class="InvitePageWord">邀请企业关联</p>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>

    <div style="margin-left: 31px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="300px"
        class="demo-ruleForm"
        :label-position="labelPosition"
      >
        <el-form-item label="选择企业:" prop="region">
          <el-input
            suffix-icon="el-icon-arrow-down"
            @click.native="dialogVisible = true"
            v-model="ruleForm.region"
            placeholder="请选择"
            style="width: 382px"
          ></el-input>
          <p class="firmCode" ref="textWord"></p>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-left: 31px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-height="10px"
        class="demo-ruleForm"
        :label-position="labelPosition"
      >
        <el-form-item label="企业类型:" prop="selectedValue">
          <el-select
            v-model="ruleForm.selectedValue"
            placeholder="请选择"
            style="width: 382px"
          >
            <el-option
              v-for="(item, index) in ceshi"
              :key="index"
              :label="item.name"
              :value="item.id"
              style="width: 382px"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form
        :model="ruleForm"
        :rules="rules"
        label-width="130px"
        class="demo-ruleForm"
        :label-position="labelPositions"
      >
        <el-form-item label="企业负责人" prop="type" :required="required">
          <p @click="addHead" style="display: inline-black">
            <img style="vertical-align: middle" :src="add" alt="" /> &nbsp;
            &nbsp; 添加
          </p>
        </el-form-item>
      </el-form>
      <div class="AddHead">
        <ul v-for="mm in me" :key="mm.id">
          <div class="headArray">
            <div
              style="
                width: 32px;
                height: 32px;
                margin-top: 15px;
                margin-left: 10px;
              "
            >
              <img
                style="width: 100%; height: 100%; border-radius: 50%"
                :src="mm.profilePicture"
                alt=""
              />
            </div>
            <div style="margin-top: 16px; margin-left: 12px; width: 113px">
              <p class="headName">{{ mm.name }}</p>
              <p class="headPhone">电话：{{ mm.phone }}</p>
              <p class="headPhone">岗位：{{ jobs }}</p>
            </div>
            <div>
              <el-dropdown trigger="click">
                <img style="margin-top: 5px" :src="EditorImg" alt="" />
                <el-dropdown-menu
                  slot="dropdown"
                  style="width: 120px; padding-left: 10px"
                >
                  <p @click="EditMan(mm)">编辑</p>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </ul>
        <ul
          v-for="(item, index) in headList"
          :key="index"
          class="headArray"
          style="margin-bottom: 16px"
        >
          <div
            style="
              width: 32px;
              height: 32px;
              margin-top: 15px;
              margin-left: 10px;
            "
          >
            <img
              style="width: 100%; height: 100%; border-radius: 50%"
              :src="item.img"
              alt=""
              v-if="item.img"
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
                text-align: center;
              "
              >{{ CutName }}</span
            >
          </div>
          <div style="margin-top: 16px; margin-left: 12px; width: 113px">
            <p class="headName">{{ item.name }}</p>
            <p class="headPhone">电话：{{ item.phone }}</p>
            <p class="headPhone">岗位：{{ item.jobs }}</p>
          </div>

          <div>
            <el-dropdown trigger="click">
              <img style="margin-top: 5px" :src="EditorImg" alt="" />
              <el-dropdown-menu
                slot="dropdown"
                style="width: 120px; padding-left: 10px"
              >
                <p @click="EditWuman(item)">编辑</p>
                <p @click="DeleteMan(item, index)">移除</p>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </ul>
      </div>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          :label-position="labelPosition"
        >
          <el-form-item label="邀请理由:" prop="desc" style="width: 710px">
            <el-input
              style="width: 710px"
              type="textarea"
              v-model="ruleForm.desc"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <el-row :mutter="0">
        <el-col :span="3"> <el-button @click="cancel">取消</el-button> </el-col>
        <el-col :span="3">
          <el-button @click="invitationBtn" type="primary">发送邀请</el-button>
        </el-col>
      </el-row>
    </div>
        <el-dialog title="选择企业" :visible.sync="dialogVisible" width="442px">
      <div style="width: 100%; text-align: center">
        <el-input
          placeholder="输入企业名称/完整企业编码"
          v-model="searchInput"
          class="input-with-select"
          style="width: 100%"
        >
          <el-button
            @click="searchFiirm"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <p
          style="
            width: 394px;
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: left;
            color: #999999;
            line-height: 20px;
          "
          v-if="showFind"
        >
          共找到 {{ this.tableArray.length }} 家公司
        </p>
      </div>
      <div class="NoEnterprise" v-if="showNoEnterprise">
        <img style="margin-top: 91px" :src="NoEnterprise" alt="" />
        <span class="NoEntWord">暂无企业</span>
      </div>
      <div>
        <ul
          v-for="(item, index) in tableArray"
          :key="index"
          :class="
            index == isActive ? 'SelectbusinessListB' : 'SelectbusinessList'
          "
        >
          <div style="display: flex; justify-content: left">
            <div style="line-height: 80px; width: 50px">
              <div
                v-if="item.relationStatus == -1 || item.relationStatus == 3" 
                style="width: 50px"
              >
                <el-radio
                  v-if="item.isMyOrg == false"
                  style="margin-left: 20px"
                  v-model="radio"
                  :label="index"
                  @change.native="radioChange(item, index)"
                  >{{ empty }}</el-radio
                >
              </div>
            </div>
            <div
              style="
                width: 58px;
                height: 58px;
                border-radius: 8px;
                margin-top: 11px;
                margin-left: 10px;
                overflow: hidden;
              "
            >
              <img
                style="width: 100%; hegiht: 100%"
                :src="item.logoUrl"
                alt=""
              />
            </div>
            <div style="margin-top: 14px; margin-left: 10px; width: 140px">
              <p class="CompanyName">{{ item.name }}</p>
              <p class="CompanyCode">{{ item.code }}</p>
              <p class="CompanyCode">{{ item.address }}</p>
            </div>
            <div style="">
              <!-- <p
                class="NotAssociated"
                v-if="item.relationStatus == 0 && item.isMyOrg == false"
              >
                未关联
              </p> -->
              <p
                class="associated"
                v-if="item.relationStatus == 0 && item.isMyOrg == false"
              >
                已关联
              </p>
              <p class="NotAssociated" v-else-if="item.relationStatus == 1">
                已解绑
              </p>
              <p class="NotAssociated" v-else-if="item.relationStatus == 2">
                已解除
              </p>
              <p style="" class="Enterprise" v-if="item.isMyOrg == true">
                当前所在企业
              </p>
            </div>
          </div>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="InviteFirmCancel">取 消</el-button>
        <el-button type="primary" @click="InviteFirmSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import yiyun from "yiyun-components";
import { mapActions } from "vuex";
// import yiyun from 'yiyun-components'
export default {
  name: "InvitePage",
  component: {},
  data() {
    return {
      NoEnterprise: require("../../static/NoEnterprise.png"),
      EditorImg: require("../../static/pointImg.png"),
      add: require("../../static/add.png"),
      labelPosition: "top",
      labelPositions: "left",
      ruleForm: {
        region: "",
        selectedValue: "",
        desc: "",
      },
      rules: {
        region: [{ required: true, message: "请选择企业", trigger: "change" }],
        selectedValue: [
          { required: true, message: "请选择企业类型", trigger: "blur" },
        ],
        desc: [{ required: true, message: "请填写邀请理由", trigger: "blur" }],
      },
      searchInput: "",
      dialogVisible: false,

      // 弹窗搜索后显示的数组数据
      tableArray: [],

      radio: "",
      radioSelect: "", // 选中的数据赋值给它
      empty: "",
      firmType: [],
      ceshi: [],

      // 同时加入的成员,
      members: [],
      // 申请理由,
      reason: "",
      // 企业类型ID,
      categoryId: "",
      toOrgId: "",
      showFind: false,
      showNoEnterprise: true,

      isActive: "",
      headList: [],

      // 已选人的id name
      selectedId: "",
      selectedName: "",
      CutName: "",
      selectedMan: [],
      required: true,
      relationStatus: "",
      me: [],
      jobs: "",
      AgionInvited:{},
    };
  },
  mounted() {
    this.text();
    this.getMe();
    this.ruleForm.region = this.$route.query.AgionInvited
    this.ruleForm.selectedValue = this.$route.query.AgionInvitedCategory
    if (this.ruleForm.region == undefined) {
      this.ruleForm.region =  '' 
    }
    this.ruleForm.desc = "欢迎与" + this.ruleForm.region + "一起开启企业关联，更好地沟通合作";
  },
  computed: {},
  methods: {
    ...mapActions([
      "QueryEnterprise",
      "invitationList",
      "Typelist",
      "ByApplyingFor",
      "addContact",
      "applyFor",
      "RelationshipDetails",
      "DeleteMember",
      "EditMan",
      "getme",
    ]),

    async getMe() {
      const res = await this.getme();
      console.log(res.data);
      this.me.push(res.data);
    },
    //   查询企业 弹窗列表
    async searchFiirm() {
      console.log(this.searchInput.length);
      if (this.searchInput.length < 3) {
      } else {
        this.showFind = true;
        this.showNoEnterprise = false;
        this.tableArray = [];
        const res = await this.QueryEnterprise({
          page: 1,
          limit: 5,
          keywords: this.searchInput,
        });
        console.log(res);
        res.data.map((item) => {
          this.tableArray.push(item);
        });
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    // 添加负责人
    async addHead() {
      const _this = this;
      // yiyun.initEvn("test_*");
      yiyun.organizationSelect({
        isOnly: false,
        mode: "member",
        orgId: "",
        needMember: true,
        isActiveMember: false,
        needPost: true,
        // selected: _this.selectedMan,
        state: 1,
        authorization: window.sessionStorage.getItem("Authorization"),
        close: function () {
          // 点取消按钮的回调函数
        },
        confirm: function (data) {
          console.log(data);
          data.map((item) => {
            console.log(item);
            _this.selectedMan.push({
              id: item.id,
              name: item.name,
            });
            console.log(_this.selectedMan);
            _this.members.push(item.name);
            _this.CutName = item.name.substring(item.name.length - 2);
            let taxon = {img:'',name:'',phone:'',jobs:'',id:'',}
            if (
              JSON.stringify(_this.headList).indexOf(JSON.stringify(taxon.id)) ===
              -1
            ) {
              console.log("不存在");
              if (_this.headList.length >= 10) {
                this.$alert("负责人最多添加10个。");
              } else {
                // _this.headList.push(item);
                _this.headList.push(
                  taxon = {
                  img: item.headPortrait,
                  name: item.name,
                  phone: item.phone,
                  jobs: "",
                  id:item.id,
                });
              }
            } else {
              console.log("已存在");
            }
          });
        },
      });
      console.log(this.headList);
    },

    checked(scope) {},
    radioChange(row, index) {
      this.isActive = index;
      console.log(this.isActive);
      console.log(row.relationStatus);
      this.relationStatus = row.relationStatus;
      this.toOrgId = row.id;
      this.ruleForm.region = row.name;

      this.ruleForm.desc =
        "欢迎与" + row.name + "一起开启企业关联，更好地沟通合作";

      this.$refs.textWord.innerHTML = "企业编码:" + row.code;
    },
    async text() {
      const res = await this.Typelist();
      res.data.map((item) => {
        this.ceshi.push(item);
      });
    },
    async invitationBtn() {
      if (this.ruleForm.region == "") {
        this.$alert("企业必填");
      } else if (this.ruleForm.selectedValue == "") {
        this.$alert("企业类型必填");
      } else if (this.ruleForm.desc == "") {
        this.$alert("邀请理由必填");
      } else {
        console.log("发起申请");
        const res = await this.ByApplyingFor({
          members: this.members,
          reason: this.ruleForm.desc,
          categoryId: this.ruleForm.selectedValue,
          toOrgId: this.toOrgId,
        });
        console.log(res);
        if (res.code == 1000) {
          this.$router.push({
            path: "/emit",
          });
        } else if (res.code == 29002) {
          this.$alert(this.ruleForm.region + "已邀请过，7日内不能重复邀请");
        } else if (res.code == 29003) {
          this.$alert("关联中不可重复邀请");
        } else if (res.code == 29004) {
          this.$alert("解绑不可重复邀请，请重新绑定");
        }
      }
    },
    InviteFirmSure() {
      this.dialogVisible = false;
      if (this.relationStatus == 3) {
        this.$alert(
          "关联企业重新建立联系，您将作为主要负责人加入到负责团队中。企业审核通过后，您可以转让管理权给其他成员负责外部企业关系的管理。",
          "提示",
          {
            confirmButtonText: "确定",
            callback: (action) => {},
          }
        );
      }
      this.searchInput = "";
      this.tableArray = [];
      this.showNoEnterprise = true;
      this.showFind = false;
    },
    InviteFirmCancel() {
      this.dialogVisible = false;
      this.relationStatus = "";
      this.toOrgId = "";
      this.ruleForm.region = "";

      this.ruleForm.desc = "";

      this.$refs.textWord.innerHTML = "";

      this.searchInput = "";
      this.tableArray = [];
      this.showNoEnterprise = true;
      this.showFind = false;
    },
    goBack() {
      this.$router.push({
        path: "/emit",
      });
    },
    async EditMan(item) {
      console.log(item);
      let _this = this;
      // let res = await this.EditMan({id:'',memberId:'',job:'',})
      // console.log(res);
      this.$prompt("", "编辑对外岗位", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入对外岗位名称",
        // inputPattern: /^[\u4e00-\u9fa5]{1,10}$|^[\dA-Za-z_]{1,10}$/,
        inputPattern: /^[\u4e00-\u9fa5]{3,10}$/
      }).then(async ({ value }) => {
        _this.jobs = value;
      });
    },
    EditWuman(item) { 
      console.log(item);
      this.$prompt("", "编辑对外岗位", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入对外岗位名称",
        // inputPattern: /^[\u4e00-\u9fa5]{1,10}$|^[\dA-Za-z_]{1,10}$/,
        inputPattern: /^[\u4e00-\u9fa5]{3,10}$/
      }).then(async ({ value }) => {
        item.jobs = value;
      });
    },
    async DeleteMan(item, index) {
      console.log(item, index);
      // let res = await this.DeleteMember({id:'',memberId:'',})
      // console.log(res);
      this.headList.splice(index, 1);
      console.log(this.headList);
    },
    cancel() {
      this.$router.push({
        path: "/HomePageRight",
      });
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.el-form-item{
  margin-bottom: 0;
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
.InvitePageWord {
  width: 108px;
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
.firmCode {
  width: 132px;
  height: 16px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #999999;
  line-height: 16px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}
.dialog {
  width: 442px;
}

.NoEnterprise {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.el-dialog__body {
  text-align: center;
}
.SelectbusinessList {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-top: 13px;
}
.SelectbusinessListB {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  border: 1px solid #3389ff;
  border-radius: 4px;
  margin-top: 13px;
}
.CompanyName {
  height: 16px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #606266;
  line-height: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.CompanyCode {
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #909399;
  line-height: 18px;
  margin-top: 3px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.NotAssociated {
  width: 46px;
  background: #f2f2f3;
  border-radius: 4px;
  height: 21px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #909399;
  line-height: 21px;
  margin-top: 21px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.associated {
  width: 46px;
  height: 21px;
  background: #e1f3d8;
  border-radius: 4px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #67c23a;
  line-height: 21px;
  margin-top: 21px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.AddHead {
  width: 970px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
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
}
.Enterprise {
  width: 120px;
  border-radius: 4px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #67c23a;
  line-height: 21px;
  margin-top: 21px;
  background: #e1f3d8;
  margin-right: 10px;
  /* border: 1px solid; */
}
.NoEntWord {
  width: 56px;
  height: 132px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #d6d6d6;
  line-height: 20px;
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}
</style>

          data.map(item => {
            _this.members.push(item)
          })

          data.map( async (item) => {
            console.log(item);
            let res = await _this.addContact({ id:'', memberId: item.userId });
            console.log(res);
            if (res.code == 29006) {
              this.$alert("企业关系不存在")
                          // 测试 如果行的写法
            _this.headList.push(item);
            }else{
              _this.headList.push(item);
            }

          });
