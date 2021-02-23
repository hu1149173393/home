<template>
  <div class="InvitationsReceiveds">
    <!-- 收到的邀请 -->
    <div style="width: 400px">
      <el-input
        placeholder="输入企业名称/企业编码"
        v-model="EdmitsearchInput"
        class="input-with-select"
        style="margin-top: 23px; height: 31px; min-width: 350px"
      >
        <el-button
          @click="Query"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
    </div>
    <div style="min-width: 919px; width: 919px">
      <el-table :data="inviteEdmitTable" style="width: 100%; margin: 30px auto">
        <el-table-column label="" width="10">
          <template slot-scope="scope">
            <p v-if="scope.row.isRead" style="width:9px;height:9px;border-radius: 50%;background: #3389ff;"></p>
          </template>
        </el-table-column>
        <el-table-column label="企业编码" width="120">
          <template slot-scope="scope">
            <p>{{ scope.row.orgCode }}</p>
          </template>
        </el-table-column>
        <el-table-column label="企业名称" width="220" show-overflow-tooltip>
          <template slot-scope="scope">
            <p class="enterpriseName">{{ scope.row.orgName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.applyTime | formatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核结果" width="150">
          <template slot-scope="scope">
            <!-- <span style="margin-left: 10px">{{ scope.row.status }}</span> -->
            <p class="ToAudit" v-if="scope.row.status == 0">待审核</p>
            <p class="HasAgreed" v-if="scope.row.status == 1">已同意</p>
            <p class="rejected" v-if="scope.row.status == 2">被驳回</p>
            <p class="lostEfficacy" v-if="scope.row.status == 3">已失效</p>
          </template>
        </el-table-column>
        <el-table-column label="审核人员" width="130">
          <template slot-scope="scope">
            <p v-if="scope.row.replyMemberName">
              {{ scope.row.replyMemberName }}
            </p>
            <span v-else> - </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <p
              class="audit"
              v-if="scope.row.status == 0"
              @click="EdmitPageOperation(scope.$index, scope.row)"
            >
              审核
            </p>
            <p
              class="viewDetails"
              @click="viewDetails(scope.row, scope.$index)"
              v-else
            >
              查看详情
            </p>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
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
    <!-- 审核弹窗 -->
    <el-dialog title="邀请单审核" :visible.sync="outerVisible" width="40%">
      <p class="head">{{ head }} &nbsp; - &nbsp; {{ DetailsCode }}</p>
      <el-row>
        <el-col class="AuditPopupLeft" :span="3">申请时间</el-col>
        <el-col class="AuditPopupRight" :span="12" style="margin-left:20px;">{{
          DetailsTime | formatTime
        }}</el-col>
      </el-row>
      <el-row>
        <el-col class="AuditPopupLeft" :span="3"
          >企业介绍</el-col
        >
        <el-col class="AuditPopupRight" style="margin-left:20px;">{{ DetailsIntroduce }}</el-col>
      </el-row>
      <div style="margin-bottom: 22px">
        <el-table :data="auditList" style="width: 100%; margin: 0px auto">
          <el-table-column label="外部企业联系人" align="center">
            <el-table-column
              prop="memberName"
              label="联系人名称"
              width="230"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="memberPhone"
              label="联系人电话"
              width="230"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="memberJob" label="联系人岗位" align="center">
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>

      <el-row :gutter="0">
        <el-col class="AuditPopupLeft" :span="3">申请理由</el-col>
        <el-col class="AuditPopupRight" style="margin-left:20px;" :span="12">{{ DetailsReason }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col class="AuditPopupLeft" :span="3">审核结果</el-col>
        <el-col class="AuditPopupRight" :span="12" style="margin-left:20px;">
          <el-radio v-model="radio" label="1">同意</el-radio>
          <el-radio v-model="radio" label="2">拒绝</el-radio>
        </el-col>
      </el-row>
      <el-row :gutter="0" style="margin-bottom: 16px">
        <div v-if="radio == 1">
          <el-col class="AuditPopupLeft" :span="3"></el-col>
          <el-col class="AuditPopupRightEnd" :span="12" style="margin-left:20px;"
            >*
            审核通过，将自动将您作为该外部关系企业的主要负责人。您可以通过转让管理权，将企业转让给其他人员负责管理</el-col
          >
        </div>
        <div v-if="radio == 2">
          <el-col class="AuditPopupLeft" :span="3">拒绝原因</el-col>
          <el-col class="AuditPopupRight" :span="12">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="0px"
              class="demo-ruleForm"
              :label-position="labelPosition"
            >
              <el-form-item label="" prop="desc" style="width: 510px">
                <el-input
                  style="width: 510px"
                  type="textarea"
                  v-model="ruleForm.textarea2"
                  maxlength="100"
                  show-word-limit
                  placeholder="拒绝理由内容"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-row>
      <div style="margin-bottom: 16px; height: 40px">
        <el-form
          :model="newShip"
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
        >
          <el-form-item label="设置企业关系" :required="required">
            <el-select
              v-model="newShip.value"
              placeholder="请选择"
              style="width: 214px"
            >
              <el-option
                v-for="(item, index) in shipData"
                :key="index"
                :label="item.name"
                :value="item.id"
                style="width: 214px"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-row style="padding-top: 16px; height: 56px">
        <el-col :span="11" style="text-align: right"
          ><el-button @click="cancel">取消</el-button></el-col
        >
        <el-col :span="12" style="padding-left: 16px"
          ><el-button type="primary" @click="Popupagree"
            >确认</el-button
          ></el-col
        >
      </el-row>
    </el-dialog>

    <!-- 弹窗 已同意 不同意 -->
    <el-dialog
      title="邀请单详情"
      :visible.sync="AgreeWhether"
      width="40%"
      id="dialogClass"
    >
      <el-row :gutter="0">
        <el-col :span="12" style="line-height: 54px">
          <p class="DetailsName">
            {{ DetailsName }} &nbsp; - &nbsp; {{ DetailsCode }}
          </p>
        </el-col>
        <el-col :span="12" style="text-align: right; padding-right: 70px">
          <div>
            <img v-if="showagree" :src="agree" alt="" />
            <img v-if="showrefuse" :src="refuse" alt="" />
            <img v-if="showfailure" :src="failure" alt="" />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="0" style="height: 34px">
        <el-col :span="3" class="DetailsLeft">申请时间</el-col>
        <el-col :span="21" class="DetailsRight">{{
          DetailsTime | formatTime
        }}</el-col>
      </el-row>
      <el-row style="height: 54px">
        <el-col :span="3" class="DetailsLeft">企业介绍</el-col>
        <el-col :span="21" class="DetailsRight">{{ DetailsIntroduce }}</el-col>
      </el-row>
      <el-row :gutter="0" style="height: 34px" v-if="showMan">
        <el-col :span="3" class="DetailsLeft">审核人</el-col>
        <el-col :span="21" class="DetailsRight" v-if="DetailsMan">{{
          DetailsMan
        }}</el-col>
        <el-col :span="21" class="DetailsRight" v-else>-</el-col>
      </el-row>
      <el-row :gutter="0" style="height: 34px" v-if="ShowTime">
        <el-col :span="3" class="DetailsLeft">审核时间</el-col>
        <el-col :span="21" class="DetailsRight">{{
          DetailsTimeAuditTime | formatTime
        }}</el-col>
      </el-row>
      <div>
        <happy-scroll color="rgba(0,0,0,0.5)" size="0" style="">
          <el-table :data="DetailsList" style="">
            <el-table-column label="外部企业联系人" align="center">
              <el-table-column
                prop="memberName"
                label="联系人名称"
                width="230"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="memberPhone"
                label="联系人电话"
                width="230"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="memberJob"
                width="240"
                label="联系人岗位"
                align="center"
              >
              </el-table-column>
            </el-table-column>
          </el-table>
        </happy-scroll>
      </div>
      <el-row :gutter="0" v-if="reason" style="height: 40px; margin-top: 10px">
        <el-col :span="3" class="DetailsLeft">申请理由</el-col>
        <el-col :span="21" class="DetailsRight">{{ DetailsReason }}</el-col>
      </el-row>

      <el-row :gutter="0" v-if="why" style="height: 40px">
        <el-col :span="3" class="DetailsLeft">拒绝原因</el-col>
        <el-col :span="21" class="DetailsRight">{{ reply }}</el-col>
      </el-row>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="prompt" width="384px">
      <p>是否立即管理关联企业信息</p>
      <el-row :gutter="0">
        <el-col :span="18" style="text-align: right">
          <el-button size="mini" @click="no">否</el-button>
        </el-col>
        <el-col :span="3" style="margin-left: 8px">
          <el-button type="primary" size="mini" @click="yes">是</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  Time_transformation,
  Time_conversion_timestamp,
} from "../../api/Time_transformation.js";
export default {
  name: "InvitationsReceived",
  data() {
    return {
      total: null,
      size: 7,
      ruleForm: {
        textarea2: "",
      },
      rules: {},
      EdmitsearchInput: "",
      inviteEdmitTable: [],
      currentPage3: 1,

      outerVisible: false,
      // 审核弹窗表
      auditList: [],
      newShip: {
        value: "",
      },
      shipData: [
        {
          id: 1,
          name: "随便",
        },
      ],
      radio: "1",

      stance: true,

      untieList: " 【？？】负责人 ",
      untieEmitinvitation: [],

      AgreeWhether: false,
      prompt: false,

      agree: require("../../static/agree.png"),
      refuse: require("../../static/refuse.png"),
      failure: require("../../static/failure.png"),
      ID: "",

      transferData: [],
      expireTime: "",

      DetailsName: "",
      DetailsCode: "",
      DetailsIntroduce: "",
      DetailsTime: "",
      DetailsMan: "",
      DetailsTimeAuditTime: "",
      DetailsList: [],
      DetailsReason: "",
      head: "",
      reply: "",

      showagree: false,
      showrefuse: false,
      showfailure: false,
      ShowTime: true,
      showMan: true,

      reason: false,
      why: false,
      status: "",
      FlirmName: "",
      detailsListBottom: [],
      required:true,
    };
  },
  mounted() {
    this.arrayList();
    this.dropDown();
  },
  methods: {
    ...mapActions([
      "ReceivedInvitation",
      "applyFor",
      "ProcessingApplication",
      "ListOf",
      "Typelist",
    ]),
    async Query() {
      const _this = this;
      const res = await this.ReceivedInvitation({
        page: 1,
        limit: 1,
        keywords: _this.EdmitsearchInput,
      });
      console.log(res);
      if (res.code == 1000) {
        this.inviteEdmitTable = [];
        res.data.map((item) => {
          this.inviteEdmitTable.push(item);
        });
        console.log(this.inviteEdmitTable);
      }
    },

    async EdmitPageOperation(index, item) {
      this.outerVisible = true;
      console.log(index, item);
      this.newShip.value = "";
      const res = await this.applyFor({ id: item.id });
      console.log(res.data);
      this.ID = item.id;
      this.DetailsName = res.data.fromOrgName;
      // 编码
      this.DetailsCode = res.data.fromOrgCode;
      // 时间
      this.DetailsTime = res.data.createTime;
      // 企业介绍
      this.DetailsIntroduce = res.data.fromOrgConcept;
      // 审核人
      this.DetailsMan = item.replyMemberName;
      // 审核时间
      this.DetailsTimeAuditTime = res.data.processTime;
      // 表 这个需要map
      this.auditList = [];
      this.auditList.push(res.data.creator);
      // 理由
      this.DetailsReason = res.data.applyReason;
      // this.prompt = true;
      this.head = res.data.fromOrgName;
      this.untieList = "【" + res.data.toOrgName + "好企业】" + "负责人";
    },

    async arrayList() {
      const _this = this;
      this.inviteEdmitTable = [];
      const res = await this.ReceivedInvitation({
        page: _this.currentPage3,
        limit: _this.size,
        keywords: "",
      });
      console.log(res);
      res.data.map((item) => {
        this.inviteEdmitTable.push(item);
      });
      console.log(this.inviteEdmitTable);
      this.total = res.total;
      // let resdetails = await this.applyFor();
      // console.log(resdetails);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.arrayList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage3 = val;
      this.arrayList();
    },

    // 审核弹窗确认 确认
    async Popupagree() {
      console.log(this.radio);
      let word, information;
      if (this.radio == 1) {
        if (this.newShip.value == "") {
        } else {
          word = true;
          const res = await this.ProcessingApplication({
            id: this.ID,
            isPass: word,
            reason: information,
            members: null,
          });
          console.log(res);
          this.transferData = [];
          this.transferData.push(res);
          this.prompt = true;
        }
      } else {
        word = false;
        information = this.ruleForm.textarea2;
        if (information == "") {
        } else {
          const res = await this.ProcessingApplication({
            id: this.ID,
            isPass: word,
            reason: information,
            members: null,
          });
          console.log(res);
          // 拒绝的结果
          this.transferData = [];
          this.transferData.push(res);
        }
        this.prompt = false;
        this.outerVisible = false;
      }
    },
    no() {
      this.prompt = false;
      this.outerVisible = false;
    },
    async yes() {
      let relationID, status, relationCategory;
      const res = await this.ListOf({
        relationStatus: 0,
        page: 1,
        limit: 1,
        keywords: this.DetailsName,
      });
      console.log(res.data);
      res.data.map((item) => {
        relationID = item.id;
        status = item.status;
        relationCategory = item.relationCategory;
      });
      this.$router.push({
        name: "EmitPage",
        params: {
          id: relationID,
          Data: status,
          relationCategory: relationCategory,
        },
      });
    },
    // 查看详情
    async viewDetails(item, index) {
      // this.outerVisible = true
      console.log(item);
      this.ID = item.id;
      this.AgreeWhether = true;
      this.status = item.status;
      console.log(item, index);
      if (item.status == 1) {
        this.showagree = true;
        this.showrefuse = false;
        this.showfailure = false;
        this.why = false;
      } else if (item.status == 2) {
        this.showagree = false;
        this.showrefuse = true;
        this.showfailure = false;
      } else if (item.status == 3) {
        this.showagree = false;
        this.showrefuse = false;
        this.showfailure = true;
        this.why = false;
        this.ShowTime = false;
        this.showMan = false;
      }
      if (item.status == 1) {
        this.reason = true;
      } else if (item.status == 2) {
        this.reason = true;
        this.why = true;
      }else if(item.status == 3){
        this.reason = true;
      }
      const res = await this.applyFor({ id: item.id });
      console.log(res.data);
      // 名字
      this.DetailsName = res.data.fromOrgName;

      // 编码
      this.DetailsCode = res.data.fromOrgCode;
      // 时间
      this.DetailsTime = res.data.createTime;
      // 企业介绍
      this.DetailsIntroduce = res.data.fromOrgConcept;
      // 审核人
      this.DetailsMan = item.replyMemberName;
      // 审核时间
      this.DetailsTimeAuditTime = res.data.processTime;
      // 表 这个需要map
      this.DetailsList = [];
      // this.DetailsList.push(res.data.creator);
      this.detailsListBottom = [];
      res.data.fromMembers.map((item) => {
        this.DetailsList.push(item);
      });
      this.detailsListBottom.push(res.data.fromMembers);
      // 理由
      this.DetailsReason = res.data.applyReason;
      this.reply = res.data.reply;
      console.log(this.ID);
      // this.$router.push({
      //   name: "EmitPage",
      //   params:{
      //     id:item.id
      //   }
      // });
    },
    cancel() {
      this.outerVisible = false;
    },
    async dropDown() {
      let res = await this.Typelist();
      console.log(res);
      res.data.map((item) => {
        this.shipData.push(item);
      });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#dialogClass .el-dialog__body {
  padding: 0 20px;
}
.InvitationsReceiveds {
  margin-left: 31px;
}
.ToAudit {
  width: 46px;
  height: 21px;
  background: #fdf4ea;
  border-radius: 4px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #e6a23c;
  line-height: 21px;
}
.HasAgreed {
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
}
.rejected {
  width: 46px;
  height: 21px;
  background: #feedee;
  border-radius: 4px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #f56c6c;
  line-height: 21px;
}
.lostEfficacy {
  width: 46px;
  height: 21px;
  background: #f2f2f3;
  border-radius: 4px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #909399;
  line-height: 21px;
}
.audit {
  width: 28px;
  height: 14px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #3389ff;
  line-height: 14px;
}
.viewDetails {
  width: 56px;
  height: 14px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #3389ff;
  line-height: 14px;
}
.DetailsName {
  width: 502px;
  font-size: 15px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #303133;
}
.DetailsLeft {
  width: 81px;
  height: 16px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #999999;
  line-height: 16px;
}
.DetailsRight {
  width: 500px;
  height: 40px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #303133;
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.AuditPopupLeft {
  width: 81px;
  height: 16px;
  font-size: 15px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #999999;
  line-height: 16px;
}
.AuditPopupRight {
  width: 500px;
  height: 40px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #303133;
  line-height: 20px;
}
.AuditPopupRightEnd {
  width: 80%;
  height: 32px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #999999;
  line-height: 16px;
}
.head {
  width: 50%;
  height: 16px;
  font-size: 15px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #303133;
  line-height: 16px;
  margin-bottom: 17px;
}
.enterpriseName {
  width: 140px;
  height: 14px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #606266;
  line-height: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
