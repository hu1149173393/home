<template>
  <div class="homePageRight">
    <div v-if="showrelationships">
      <el-row :mutter="0">
        <el-col :span="17" class="homePageRightTop"
          ><p class="homePageRightTopWord">企业关系</p></el-col
        >
        <el-col :span="7" class="homePageRightTop">
          <p
            class="invitationBtn"
            @click="invitationPage"
            style="margin-right: 17px"
          >
            <img class="InvitationImg" :src="invitationImg" alt="" />
            <span class="relevance">邀请关联</span>
          </p>
          <p
            class="invitationBtn"
            @click="newInvitationPage"
            style="margin-right: 60px"
          >
            <img class="InvitationImg" :src="newinvitationImg" alt="" />
            <span class="newInvitation">新的邀请</span>
            <span v-if="ShowRedBoll" class="redBoll"></span>
          </p>
        </el-col>
      </el-row>

      <div style="text-align: center; margin-top: 130px" v-if="showHomePageImg">
        <img :src="homepageimg" alt="" />
      </div>

      <el-row :gutter="0" style="margin-top: 26px" v-if="showFrom">
        <el-col :span="10" style="margin-left: 42px">
          <el-input
            class="rightSearchBox"
            prefix-icon="el-icon-search"
            v-model="TableSerch"
            placeholder="输入企业名称/企业编码"
            style="width: 400px"
          ></el-input>
        </el-col>
        <el-col :span="6" style="padding-left: 20px">
          <span class="state" style="width: 100px">关联状态：</span>
          <el-select v-model="value" placeholder="已关联" style="width: 106px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              style="width: 106px"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="1" style="text-align: left">
          <el-button @click="Query" type="primary">查询</el-button>
        </el-col>
      </el-row>

      <div v-if="showFrom">
        <el-table
          :data="tableData"
          style="width: 873px; margin-left: 42px; margin-top: 20px"
        >
          <el-table-column label="企业编码" width="120">
            <template slot-scope="scope">
              <p class="coding">{{ scope.row.orgCode }}</p>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <p class="enterpriseName">{{ scope.row.orgName }}</p>
            </template>
          </el-table-column>
          <el-table-column label="关联状态" width="120">
            <template slot-scope="scope">
              <div
                class="AssociatedStates associated"
                v-if="scope.row.status == 0"
              >
                已关联
              </div>
              <div
                class="AssociatedStates unbundling"
                v-if="scope.row.status == 1"
              >
                已解绑
              </div>
              <div class="AssociatedStates remove" v-if="scope.row.status == 2">
                已解除
              </div>
            </template>
          </el-table-column>
          <el-table-column label="关系类型" width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{
                scope.row.relationCategory
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业联系人" width="120">
            <template slot-scope="scope">
              <p
                class="FunctionalView"
                @click="contact(scope.$index, scope.row)"
              >
                查看
              </p>
            </template>
          </el-table-column>
          <el-table-column label="企业负责人" width="100">
            <template slot-scope="scope">
              <p class="FunctionalView" @click="head(scope.$index, scope.row)">
                查看
              </p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <img @click="judgeShow(scope.row)" :src="operationImg" alt="" />
                <el-dropdown-menu
                  slot="dropdown"
                  style="width: 120px; padding-left: 10px"
                >
                  <div v-if="minor">
                    <p class="styles" @click="view(scope.row)">查看详情</p>
                    <p class="styles" @click="EdmitGobs(scope.row)">
                      编辑对外岗位
                    </p>
                  </div>
                  <!-- v-if="edmitOperation" -->
                  <div v-if="edmitOperation">
                    <p class="styles" size="mini" @click="edmit(scope.row)">
                      编辑
                    </p>
                    <p
                      class="styles"
                      size="mini"
                      @click="unbundling(scope.row)"
                    >
                      解绑
                    </p>
                    <p class="styles" size="mini" @click="transfer(scope.row)">
                      转让管理权
                    </p>
                  </div>

                  <div v-if="removeOperation">
                    <p
                      class="styles"
                      @click="viewDetails(scope.row)"
                      size="mini"
                    >
                      查看详情
                    </p>
                    <p class="styles" @click="ToInvite(scope.row)" size="mini">重新邀请</p>
                  </div>

                  <div v-if="unbundlingOperation">
                    <p
                      class="styles"
                      @click="viewDetails(scope.row)"
                      size="mini"
                    >
                      查看详情
                    </p>
                    <p class="styles" size="mini" @click="rebind(scope.row)">
                      重新绑定
                    </p>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right; margin-right: 28px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="size"
            layout="prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="ContactView" width="450px">
      <el-table
        :data="ContactList"
        style="text-align: center"
        border
        :header-cell-style="{ background: '#fafafa' }"
      >
        <el-table-column
          property="memberName"
          label="姓名"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          property="memberPhone"
          label="联系电话"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column property="memberJob" label="岗位" align="center">
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="remove" width="384px">
      <p>是否解除与【{{ company }}】的外部关系？</p>
      <el-row style="margin-top: 12px">
        <el-col :span="19" style="text-align: right; margin-right: 8px">
          <el-button size="mini" @click="cancel">取消</el-button>
        </el-col>
        <el-col :span="4" style="text-align: center">
          <el-button size="mini" @click="SureUnbundling" type="primary"
            >确定</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script scoped>
import invitation from "./invitation";
import { mapActions, mapState } from "vuex";
import Bus from "./bus";
import yiyun from "yiyun-components";
export default {
  name: "homePageRight",
  components: {
    invitation,
  },
  data() {
    return {
      showHomePageImg: true,
      showFrom: false,

      homepageimg: require("../../static/HomePageImg.png"),
      total: null,
      size: 4,
      ShowRedBoll: Boolean,
      showrelationships: true,
      invitationImg: require("../../static/invite.png"),
      newinvitationImg: require("../../static/newinvite.png"),
      operationImg: require("../../static/operation.png"),
      // 右侧企业搜索框
      TableSerch: "",
      // 右侧关联状态
      options: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "0",
          label: "已关联",
        },
        {
          value: "1",
          label: "已解绑",
        },
        {
          value: "2",
          label: "已解除",
        },
      ],
      value: "0",

      // 表格数据
      tableData: [],
      // 分页
      currentPage3: 1,
      ContactView: false,
      ContactList: [],
      title: "",
      remove: false,
      company: "",
      id: "",

      mainMan: true,

      edmitOperation: false,
      removeOperation: false,
      unbundlingOperation: false,

      itemid: "",
      minor: false,
      EditGobs: false,
      job: "",
      relationID: "",
      memberId: "",
      categoryId: "",
      
    };
  },
  mounted() {
    this.defaultShow();
    Bus.$on("getTarget", (id) => {
      console.log(id);
      this.categoryId = id;
      this.defaultShow();
    });
    console.log(this.categoryId);
  },
  components: {
    ...mapState(["editorRelation"]),
  },
  computed: {},
  methods: {
    ...mapActions([
      "ListOf",
      "untie",
      "rebinding",
      "RelationshipDetails",
      "transferHead",
      "EditMan",
      "ReceivedInvitation",
    ]),
    async Query() {
      const _this = this;
      const res = await this.ListOf({
        relationStatus: _this.value,
        page: 1,
        limit: _this.size,
        keywords: _this.TableSerch,
        // categoryId: _this.TableSerch,
      });
      console.log(res);
      if (res.code == 1000) {
        this.tableData = [];
        res.data.map((item) => {
          this.tableData.push(item);
        });
      }
      if (this.TableSerch == "" && this.value == "") {
        this.tableData = [];
        this.defaultShow();
      }
    },
    async defaultShow() {
      this.tableData = [];
      const res = await this.ListOf({
        relationStatus: this.value,
        page: this.currentPage3,
        limit: this.size,
        keywords: this.TableSerch,
        categoryId: this.categoryId,
      });
      console.log(res);
      this.ShowRedBoll = res.hasUnreadApply
      res.data.map((item) => {
        this.tableData.push(item);
      });
      console.log(res);
      this.total = res.total;
      if (res.total == 0) {
        this.showHomePageImg = true;
        this.showFrom = false;
      } else {
        this.showHomePageImg = false;
        this.showFrom = true;
      }
    },
    //   跳转到发出邀请洁面
    invitationPage() {
      // this.showrelationships = false
      this.$router.push({
        path: "/invitation",
      });
    },
    //   跳转到收到邀请洁面
    newInvitationPage() {
      this.ShowRedBoll = false;
      this.$router.push({
        path: "/InvitationsReceived",
      });
    },
    //   企业联系人查看
    async contact(index, row) {
      console.log(index, row);
      this.title = "企业联系人";
      this.ContactView = true;
      this.ContactList = [];
      const res = await this.RelationshipDetails({ id: row.id });
      res.data.targetMembers.map((item) => {
        this.ContactList.push(item);
      });
      console.log(res);
    },
    //   负责人查看
    async head(index, row) {
      console.log(index, row);
      this.title = "负责人";
      this.ContactView = true;
      this.ContactList = [];
      const res = await this.RelationshipDetails({ id: row.id });
      res.data.ourMembers.map((item) => {
        this.ContactList.push(item);
      });
      console.log(this.ContactList);
    },
    //   操作
    operation(index, row) {
      console.log(index, row);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.defaultShow();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage3 = val;
      this.defaultShow();
    },

    // 编辑企业外部关系
    edmit(item) {
      console.log(item);
      this.$router.push({
        path: "/EmitPage",
        query: {
          text: 1,
          id: item.id,
          typef: item.relationCategory,
          relationCategory: item.relationCategory,
          // 名称
          // 编号
          // 类型
          // 状态
          // 外部企业联系人数组
          // 负责人
        },
      });
    },
    unbundling(item) {
      console.log(item);
      this.remove = true;
      this.company = item.orgName;
      this.id = item.id;
    },

    // 取消
    cancel() {
      this.remove = false;
    },
    async SureUnbundling() {
      const res = await this.untie({ id: this.id });
      console.log(res);
      this.$router.go(0);
      this.remove = false;
    },

    // 转让管理权
    async transfer(item) {
      console.log(item);
      const _this = this;
      yiyun.organizationSelect({
        isOnly: true,
        mode: "member",
        orgId: "",
        needMember: true,
        isActiveMember: false,
        needPost: true,
        // selected: { "id": item.id, "name": item.name },
        state: 1,
        authorization: window.sessionStorage.getItem("Authorization"),
        close: function () {
          // 点取消按钮的回调函数
        },
        confirm: async function (data) {
          // 点确定按钮的回调函数，返回选中项
          console.log(data);
          const res = await _this.transferHead({
            id: _this.relationID,
            memberId: _this.memberId,
          });
          console.log(res);
          if (res.code == 29006) {
            this.$alert("企业关系不存在");
          } else if (res.code == 29007) {
            this.$alert("企业关系成员未加入");
          } else if (res.code == 29008) {
            this.$alert("不是团队领导，没有权限");
          }
        },
      });
    },

    async judgeShow(item) {
      this.relationID = item.id;
      console.log(item.id);
      console.log(item);
      let hosrOrNext;
      const res = await this.RelationshipDetails({ id: item.id });
      console.log(res);
      res.data.ourMembers.map((es) => {
        hosrOrNext = es.isLeader;
        // this.jobs = es.memberJob;
        this.memberId = es.memberId;
      });
      console.log(hosrOrNext);
      if (item.status == 0) {
        this.minor = false;
        this.edmitOperation = true;
        this.removeOperation = false;
        this.unbundlingOperation = false;
        if (hosrOrNext == true) {
          this.minor = false;
          this.edmitOperation = true;
          this.removeOperation = false;
          this.unbundlingOperation = false;
        } else {
          this.minor = true;
          this.edmitOperation = false;
          this.removeOperation = false;
          this.unbundlingOperation = false;
        }
      } else if (item.status == 1) {
        this.unbundlingOperation = true;
        this.minor = false;
        this.edmitOperation = false;
        this.removeOperation = false;
        if (hosrOrNext == false) {
          this.unbundlingOperation = false;
        }
      } else if (item.status == 2) {
        this.removeOperation = true;
        this.unbundlingOperation = false;
        this.minor = false;
        this.edmitOperation = false;
        if (hosrOrNext == false) {
          this.removeOperation = false;
        }
      }
    },
    async rebind(item) {
      this.itemid = item.id;
      const res = await this.rebinding({ id: this.itemid });
      console.log(res);
      this.$router.go(0);
    },
    ToInvite(item) {
      console.log(item);
      this.$router.push({
        path: "/InvitePage",
        query:{
          AgionInvited: item.orgName,
          AgionInvitedCategory:item.relationCategory
        }
      });
    },
    view(item) {
      console.log(item);
      this.$router.push({
        path: "/minorView",
        query: {
          id: item.id,
          AgionInvited: item.orgName,
          AgionInvitedCategory:item.relationCategory
        },
      });
    },
    EdmitGobs(item) {
      console.log(item);
      this.EditGobs = true;
      this.$prompt('', '编辑对外岗位', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: '请输入对外岗位名称',
        inputPattern: /^[\u4e00-\u9fa5]{2,10}$/,
        inputErrorMessage: '请输入对外岗位名称'
      })
        .then(async ({ value }) => {
          const res = await this.EditMan({
            id: this.relationID,
            memberId: this.memberId,
            job: this.job,
          });
          console.log(res);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    // 判断此负责人能不能查看
    async viewDetails(item) {
      const res = await this.RelationshipDetails({ id: item.id });
      console.log(res.data);
      res.data.ourMembers.map((sucess) => {
        if (sucess.isLeader == false && item.status == 1 && item.status == 2) {
          this.$alert("次负责人不能查看");
        } else {
          this.view(item);
        }
      });
    },
  },
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
}
.homePageRight {
  width: 100%;
}
.redBoll {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #f62340;
  border-radius: 50%;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 20px;
  right: 88px;
}
.invitationBtn {
  display: inline-block;
  width: 88px;
  height: 28px;
  background: #e8f2ff;
  border-radius: 14px;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  margin-top: 19px;
}

.relevance {
  width: 48px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #3389ff;
  line-height: 17px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  margin-left: 7px;
}
.newInvitation {
  width: 48px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #3389ff;
  line-height: 17px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  margin-left: 10px;
}
.InvitationImg {
  height: 17px;
  margin-left: 5px;
  vertical-align: middle;
}
.homePageRightTop {
  border-bottom: 1px solid #e1e1e1;
  height: 62px;
}
.homePageRightTopWord {
  width: 108px;
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #2e2e2e;
  line-height: 25px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  margin-left: 42px;
  margin-top: 19px;
}

.state {
  width: 70px;
  height: 22px;
  opacity: 0.85;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: right;
  color: #000000;
  line-height: 22px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}

.FunctionalView {
  width: 28px;
  height: 14px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #3389ff;
  line-height: 14px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}
.coding {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #606266;
  line-height: 14px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}
.enterpriseName {
  height: 14px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #606266;
  line-height: 14px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}
.AssociatedStates {
  margin-left: 8px;
}

.associated {
  width: 46px;
  height: 21px;
  background: #e1f3d8;
  border-radius: 4px;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #67c23a;
  line-height: 21px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}
.unbundling {
  width: 46px;
  height: 21px;
  background: #f2f2f3;
  border-radius: 4px;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #909399;
  line-height: 21px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}
.remove {
  width: 46px;
  height: 21px;
  background: #f2f2f3;
  border-radius: 4px;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #909399;
  line-height: 21px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}
.styles {
  width: 80px;
  height: 14px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #5a5e66;
  line-height: 30px;
  padding-left: 20px;
  margin-bottom: 20px;
}
</style>

              <el-Popover placement="right" width="100" trigger="click">
                <div v-if="minor">
                  <el-button @click="view(scope.row)">查看详情</el-button>
                  <el-button @click="EdmitGobs(scope.row)"
                    >编辑对外岗位</el-button
                  >
                </div>
                <div v-if="edmitOperation">
                  <el-button size="mini" @click="edmit(scope.row)"
                    >编辑</el-button
                  >
                  <el-button size="mini" @click="unbundling(scope.row)"
                    >解绑</el-button
                  >
                  <el-button size="mini" @click="transfer(scope.row)"
                    >转让管理权</el-button
                  >
                </div>

                <div v-if="removeOperation">
                  <el-button size="mini">查看详情</el-button>
                  <el-button @click="ToInvite" size="mini">重新邀请</el-button>
                </div>

                <div v-if="unbundlingOperation">
                  <el-button size="mini">查看详情</el-button>
                  <el-button size="mini" @click="rebind(scope.row)"
                    >重新绑定</el-button
                  >
                </div>

                <img
                  @click="judgeShow(scope.row)"
                  slot="reference"
                  :src="operationImg"
                  alt=""
                />
              </el-Popover>
