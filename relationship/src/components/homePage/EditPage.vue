<template>
  <div class="Edit">
    <!-- 编辑企业外部关系 -->
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
        <p class="EditRelation">编辑企业外部关系</p>
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
      <div style="display: flex; justify-content: space-between">
        <p class="EditName">
          {{ EditName }} - {{ EditCode }} <br />
          <span class="concept">{{ concept }}</span>
        </p>
        <el-select
          v-model="value"
          :placeholder="value"
          style="width: 126px"
          @click.native="selectChanged"
          @change="selectValue"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            style="width: 106px"
          >
          </el-option>
        </el-select>
        <!-- <p class="EditType">{{ types }}</p> -->
      </div>
      <div>
        <p class="EditState" v-if="EditStatus == 0">
          <img :src="AssociatedImg" alt="" /> 已关联
        </p>
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
            :src="item.memberIcon"
            alt=""
            v-if="item.memberIcon"
          />
          <span style="text-align:center; display:inline-black;widht:32px;height:32px; border-radius:50%;background:#3389FF;color:#ffffff;">{{ImgName}}</span>
          
        </div>
        <div style="margin-top: 16px; margin-left: 12px; width: 113px">
          <p class="headName">{{ item.memberName }}</p>
          <p class="headPhone">电话：{{ item.memberPhone }}</p>
          <p class="headPhone">岗位：{{ item.memberJob }}</p>
        </div>
      </ul>
    </div>

    <div class="addEffect">
      <p class="EditContact">{{ourOrgName}}企业负责人</p>
      <p @click="addHead" class="addImg">
        <img style="" :src="addImg" alt="" /><span class="add">添加</span>
      </p>
    </div>

    <div class="AddHead">
      <ul
        v-for="item in headList"
        :key="item.id"
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
          />
        </div>
        <div style="margin-top: 16px; margin-left: 12px; width: 113px">
          <p class="headName">{{ item.memberName }}</p>
          <p class="headPhone">电话：{{ item.memberPhone }}</p>
          <p class="headPhone">岗位：{{ item.memberJob }}</p>
        </div>
        <div>
          <el-dropdown trigger="click">
            <img
              style="margin-top: 5px; text-align: center"
              :src="EditorImg"
              alt=""
            />
            <el-dropdown-menu
              slot="dropdown"
              style="width: 92px; text-align: center"
            >
              <p @click="Edit(item)" style="margin-left: 20px" class="EditEdit">
                编辑
              </p>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </ul>
      <ul
        v-for="(item, index) in addHeadList"
        :key="index"
        class="headArray"
        style="margin-bottom: 16px"
      >
        <div
          style="width: 32px; height: 32px; margin-top: 15px; margin-left: 10px"
        >
          <img
            style="width: 100%; height: 100%; border-radius: 50%"
            :src="item.newheadPortrai"
            alt=""
          />
        </div>
        <div style="margin-top: 16px; margin-left: 12px; width: 113px">
          <p class="headName">{{ item.newname }}</p>
          <p class="headPhone">电话：{{ item.newphone }}</p>
          <p class="headPhone">岗位：{{ item.newjob }}</p>
        </div>
        <div>
          <el-dropdown trigger="click">
            <img
              style="margin-top: 5px; text-align: center"
              :src="EditorImg"
              alt=""
            />
            <el-dropdown-menu
              slot="dropdown"
              style="width: 92px; text-align: center"
            >
              <p
                @click="EditEdit(item, index)"
                style="margin-left: 20px"
                class="EditEdit"
              >
                编辑
              </p>
              <p
                @click="EditDelete(item, index)"
                style="margin-left: 20px"
                class="EditDelete"
              >
                删除
              </p>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import yiyun from "yiyun-components";
export default {
  name: "Edit",
  data() {
    return {
      HomePageid: "",
      InvitePageid: "",
      id: "",

      relationId: "",
      ReceiveData: [],

      contact: [],

      headList: [],
      addImg: require("../../static/add.png"),
      EditorImg: require("../../static/pointImg.png"),
      AssociatedImg: require("../../static/AssociatedImg.png"),
      types: "",
      EditName: "",
      EditCode: "",
      concept: "",
      EditStatus: "",
      job: "",
      labelPosition: "left",
      jobs: "",
      memberId: "",
      selected: [],
      relationCategory: "",
      ourOrgName:'',
      addHeadList: [
      ],
      options: [],
      value: "",
      ImgName:"",
    };
  },
  computed: {},
  mounted() {
    this.HomePageid = this.$route.query.id;
    this.$nextTick(function () {
      this.value = this.$route.query.typef;
    });
    console.log(this.value);
    this.relationCategory = this.$route.query.relationCategory;

    this.InvitePageid = this.$route.params.id;
    this.value = this.$route.params.Data;
    this.relationCategory = this.$route.params.relationCategory;

    console.log(this.InvitePageid, this.HomePageid);
    if (this.HomePageid == undefined) {
      this.id = this.InvitePageid;
    }
    if (this.InvitePageid == undefined) {
      this.id = this.HomePageid;
    }

    this.ReceiveData = this.$route.query.Data;
    console.log(this.ReceiveData);

    this.initialData();
  },
  methods: {
    ...mapActions([
      "RelationshipDetails",
      "EditMan",
      "DeleteMember",
      "addContact",
      "Typelist",
      "rename",
      "SetCate",
    ]),
    goBack() {
      this.$router.push({
        path: "/HomePageRight",
      });
    },
    async initialData() {
      const res = await this.RelationshipDetails({ id: this.id });
      console.log(res);
      if (res.code == 1000) {
        this.EditName = res.data.targetOrgName;
        this.EditCode = res.data.targetOrgCode;
        this.concept = res.data.targetOrgConcept;
        this.EditStatus = res.data.status;

        this.contact = res.data.targetMembers;
        console.log(this.contact);
        this.contact.map(succes => {
          this.ImgName = succes.memberName.substring(succes.memberName.length - 2)
        })
        this.headList  = res.data.ourMembers;
        this.relationId = res.data.id;
        this.job = res.data.memberJob;
        this.value = res.data.relationCategoryName;
        this.ourOrgName = res.data.ourOrgName
        console.log(this.relationId);
      } else {
        // this.$alert("");
      }
      const Typelist = await this.Typelist();
      console.log(Typelist.data);
      Typelist.data.map((succes) => {
        this.options.push(succes);
      });
    },
    async Edit(item) {
      console.log(item);
      let _this = this
      this.$prompt("", "编辑对外岗位", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: "请输入对外岗位名称",
        inputPattern: /^[\u4e00-\u9fa5]{2,10}$/,
        inputErrorMessage: "请输入对外岗位名称",
      })
        .then(async ({ value }) => {
          const res = await this.EditMan({
            id: _this.relationId,
            memberId: item.memberId,
            job: value,
          });
          console.log(res);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    async EditEdit(item, index) {
      console.log(item);
      console.log(this.job);
      let _this = this
      this.memberId = item.id;
      this.$prompt("", "编辑对外岗位", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: "请输入对外岗位名称",
        inputPattern: /^[\u4e00-\u9fa5]{2,10}$/,
        inputErrorMessage: "请输入对外岗位名称",
      })
        .then(async ({ value }) => {
          const res = await this.EditMan({
            id: _this.relationID,
            memberId: item.memberId,
            job: value,
          });
          console.log(res);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    addHead(){
      const _this = this;
      console.log(this.relationId);
      yiyun.organizationSelect({
        isOnly: false,
        mode: "member",
        orgId: "",
        needMember: true,
        isActiveMember: false,
        needPost: true,
        state:1,
        authorization: window.sessionStorage.getItem("Authorization"),
        close: function () {
          // 点取消按钮的回调函数
        },
        confirm: function (data) {
          // 点确定按钮的回调函数，返回选中项
          console.log(data);
          
          data.map(async wq => {
          const res = await _this.addContact({
            memberId: wq.id,
            id: _this.relationId,
          });
          console.log(res);
          if (res.code == 29006) {
            this.$alert("企业关系不存在");
          } else if (res.code == 1000) {
            if (
              JSON.stringify(_this.addHeadList).indexOf(
                JSON.stringify(data)
              ) === -1
            ) {
              console.log("不存在");
              if (data.name == "") {
              } else {
                if (_this.addHeadList > 10) {
                } else {
                 _this.addHeadList = [{
                    newheadPortrai:wq.headPortrai,
                    newid:wq.id,
                    newname:wq.name,
                    newphone:wq.phone,
                    newtype:wq.type,
                    newuserID:wq.userID,
                    newjob:"",
                  }]
                }
              }
            } else {
              console.log("已存在");
            }
          }
          })
        },
      });
    },
    async EditDelete(item, index) {
      console.log(item);
      console.log(item.id);
      this.$confirm("是否确认删除" + item.name + "负责人？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          console.log(item.id);
          const res = await this.DeleteMember({
            id: this.id,
            memberId: item.newid,
          });
          if (res.code == 29006) {
            this.$alert("企业关系不存在");
          } else if (res.code == 29007) {
            this.$alert("企业关系成员未加入");
          } else if (res.code == 29008) {
            this.$alert("不是团队领导，没有权限");
          } else if (res.code == 29009) {
            this.$alert("不能移除领导");
          } else if (res.code == 1000) {
            this.addHeadList.splice(index,1)
          } 
          console.log(res);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    selectChanged() {
      console.log(this.value);
      let id;
      this.options.map((item) => {
        if (item.name == this.value) {
          id = item;
        }
      });
      console.log(id);
    },
    async selectValue(val) {
      console.log(val);
      let res = await this.SetCate({ id: this.id, relationCategoryId: val });
      console.log(res);
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
  width: 960px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin-left: 31px;
}
.headArray {
  width: 212px;
  height: 78px;
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
.EditName {
  margin-right: 20px;
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
.concept {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #999999;
  line-height: 20px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}
</style>
