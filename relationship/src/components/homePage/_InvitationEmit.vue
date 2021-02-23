<template>
  <!-- 发出的邀请 -->
  <div class="InvitationEmit">
    <div>
      <el-row :mutter="0" style="margin-top: 23px">
        <el-col :span="10">
          <el-input
            placeholder="输入企业名称/企业编码"
            v-model="searchInput"
            class="input-with-select"
            style="margin-left: 31px; width: 400px"
          >
            <el-button
              @click="Query"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" style="margin-left: 71px">
          <span class="result">邀请结果：</span>
          <el-select v-model="value" placeholder="请选择" style="width: 106px">
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
      </el-row>

      <div style="margin-left: 32px; margin-right: 32px">
        <el-table :data="inviteTable" style="width: 100%; margin: 30px auto" class="EdmitTable">
          <el-table-column label="企业编码" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.orgCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" width="260" show-overflow-tooltip>
            <template slot-scope="scope">
              <p class="enterpriseName">{{ scope.row.orgName }}</p>
            </template>
          </el-table-column>
          <el-table-column label="邀请人员" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.memberName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="邀请时间" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.applyTime | formatTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="邀请结果">
            <template slot-scope="scope">
              <p class="audit" v-if="scope.row.status == 0">待通过</p>
              <div class="" v-if="scope.row.status == 1">
                <div class="agree">已同意</div>
              </div>
              <div style="display:flex;justify-content: space-between;" v-if="scope.row.status == 2">
                <div class="reject">已拒绝</div>
                <el-popover
                    placement="bottom"
                    title="拒绝原因"
                    width="200"
                    trigger="click"
                    :content="reply"
                    @click.native="replySee(scope.row)"
                  >
                    <img :src="RefusedImg" slot="reference" style="width:14px;height:14px;border-radius: 50%;"></img>
                </el-popover>
                <!-- <el-tooltip
                  class="item"
                  effect="dark"
                  content="Right Center 提示文字"
                  placement="right"
                >
                  <img style="vertical-align: middle;display: inline-block;" :src="RefusedImg" alt="" />
                </el-tooltip> -->
              </div>
              <p class="failure" v-if="scope.row.status == 3">已失效</p>
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
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import {
  Time_transformation,
  Time_conversion_timestamp
} from '../../api/Time_transformation.js'
const moment = require('moment')
export default {
  name: 'InvitationEmit',
  data () {
    return {
      total: null,
      size: 7,
      currentPage3: 1,
      RefusedImg: require('../../static/Refused.png'),
      searchInput: '',
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '待通过'
        },
        {
          value: '1',
          label: '已同意'
        },
        {
          value: '2',
          label: '已拒绝'
        },
        {
          value: '3',
          label: '已失效'
        }
      ],
      value: '',
      inviteTable: [],

      expireTime: '',
      reply: ''
    }
  },
  mounted () {
    this.arrayList()
  },
  computed: {},
  methods: {
    ...mapActions(['invitationList', 'QueryEnterprise', 'applyFor']),
    async Query () {
      const _this = this
      const res = await this.invitationList({
        page: _this.currentPage3,
        limit: _this.size,
        keywords: _this.searchInput,
        status: _this.value
      })
      if (res.code == 1000) {
        this.inviteTable = []
        res.data.map((item) => {
          this.inviteTable.push(item)
          _this.expireTime = moment(item.applyTime).format('YYYY-MM-DD')
        })
      }
      if (this.searchInput == '' && this.value == '') {
        this.inviteTable = []
        this.arrayList()
      }
      console.log(this.inviteTable)
      this.total = res.total
    },

    async arrayList () {
      this.inviteTable = []
      const _this = this
      const res = await this.invitationList({
        page: _this.currentPage3,
        limit: _this.size,
        keywords: _this.searchInput,
        status: _this.value
      })
      console.log(res)
      _this.total = res.total
      if (res.code == 1000) {
        res.data.map((item) => {
          this.inviteTable.push(item)
          _this.expireTime = moment(item.applyTime).format('YYYY-MM-DD')
          console.log(_this.expireTime)
        })
      }
      console.log(this.inviteTable)
    },

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.size = val
      this.arrayList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage3 = val
      this.arrayList()
    },
    async replySee (row) {
      console.log(row)
      const res = await this.applyFor({ id: row.id })
      console.log(res.data.reply)
      this.reply = res.data.reply
    }
  }
}
</script>

<style lang="less">
.audit {
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
.agree {
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
.reject {
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
.failure {
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
.el-popover__title{
  text-align: center;
}
.EdmitTable{
  th{
    padding: 0;
    height: 30px !important;
    line-height: 30px;
  }
  tr{
    padding: 0;
    height: 10px !important;
    line-height: 10px;
  }
}
</style>
