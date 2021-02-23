<template>
  <div class="InvitePage">
    <p @click="go" style="margin-left: 20px">返回</p>
    <h2 style="margin: 20px auto; width: 50%; text-align: center">
      邀请企业关联
    </h2>
    <el-row :gutter="0">
      <el-col :span="12">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="选择企业" prop="name" style="width: 400px">
            <el-input
              @click.native="showSlectFir"
              v-model="ruleForm.name"
            ></el-input>
            <!-- <p>{{}}</p> -->
          </el-form-item>
          <!-- <el-form-item label="企业编码" prop="name" style="width: 400px">
            <p>{{}}</p>
          </el-form-item> -->
          <el-form-item label="企业类型" prop="region">
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择活动区域"
              style="width: 300px"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <div
      class="slectFirms"
      style="width: 80%; border: 1px solid"
      v-if="showSlectFirm"
    >
      <el-row :gutter="0" style="border-bottom: 1px solid">
        <el-col :span="23" style="text-align: right">
          <h3 style="display: black; text-align: center">选择企业</h3>
        </el-col>
        <el-col :span="1"
          ><i
            @click="shiftdown"
            style="text=align: right; line-height: 60px"
            class="el-icon-close"
          ></i
        ></el-col>
      </el-row>
      <el-row :gutter="50" class="seraAndBtn">
        <el-col :span="10">
          <el-input
            class=""
            prefix-icon="el-icon-search"
            v-model="search"
            placeholder="请输入内容"
          ></el-input>
        </el-col>
        <el-col style="line-height: 35px" :span="1"
          ><el-button @click="searchFiirm" size="mini">搜索</el-button></el-col
        >
      </el-row>

      <div v-if="showSlectFirm">
        <ul
          v-for="(item, index) in tableArray"
          :key="index"
          style="border: 1px solid; width: 80%; margin: 10px auto"
        >
          <el-row>
            <el-col :span="5"><img :src="item.logoUrl" alt="" /></el-col>
            <el-col :span="7">
              <p>{{ item.name }}</p>
              <p>{{ item.code }}</p>
              <p>{{ item.address }}</p>
            </el-col>
            <el-col :span="3" style="border:1px solid;">
              {{ item.relationStatus }}
            </el-col>
            <el-col :span="3"></el-col>
          </el-row>
        </ul>
        <div style="text-align: right; margin-right: 20px">
          <el-button @click="shiftdown">确定</el-button>
        </div>
      </div>
    </div>
    <div>
      <el-row :gutter="0">
        <el-col :span="3" style="text-align: right; margin-right: 50px"
          ><p>*负责人</p></el-col
        >
        <el-col :span="5" style=""><p>添加</p></el-col>
      </el-row>
      <div>
        <el-table
          :data="invitFirm"
          style="width: 98%; margin: 30px auto"
          border
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column :label="'【' + Tableheard + '】' + '负责人'">
            <el-table-column label="负责人名称" width="280">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.EnterpriseName
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="负责人电话" width="280">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.EnterpriseName
                }}</span>
              </template> </el-table-column
            ><el-table-column label="负责人岗位" width="280">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.EnterpriseName
                }}</span>
              </template> </el-table-column
            ><el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="inviteEditor(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  @click="inviteDelite(scope.$index, scope.row)"
                  >移除</el-button
                >
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>

      <div>
        <el-row :mutter="0">
          <el-col style="text-align:right; margin-right:50px;" :span="2" >
            <p>*邀请理由</p>
          </el-col>
          <el-col :span="20">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea"
            >
            </el-input>
          </el-col>
          <el-col style="margin:20px;" :span="3"><el-button>取消</el-button></el-col>
          <el-col style="margin:20px;" :span="3"><el-button>发送邀请</el-button></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'InvitePage',
  data () {
    return {
      // 邀请企业关联
      ruleForm: {
        name: '',
        region: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      showSlectFirm: false,
      // 选择企业弹窗 搜索框
      search: '',
      // 弹窗搜索后显示的数组数据
      tableArray: [],

      // 接收企业表格数据
      invitFirm: [],
      // 接收确定企业名称
      Tableheard: '我的',
      // 文本域
      textarea: ''
    }
  },
  methods: {
    go () {
      this.$router.go(-1)
    },
    //   显示选择企业弹窗
    showSlectFir () {
      this.showSlectFirm = true
    },
    //   查询企业 弹窗列表
    async searchFiirm () {
      const res = await this.QueryEnterprise({ page: 1, limit: 5, keywords: this.search })
      console.log(res)
      res.data.map((item) => {
        this.tableArray.push(item)
      })
      console.log(this.tableArray)
    },
    ...mapActions(['QueryEnterprise', 'invitationList']),
    shiftdown () {
      this.showSlectFirm = false
    },
    // 编辑
    inviteEditor (item, index) {},
    // 删除
    inviteDelite (item, index) {}
  }
}
</script>

<style>
.InvitePage {
  width: 100%;
  min-width: 800px;
}
.seraAndBtn {
  display: flex;
  justify-content: center;
}
</style>
