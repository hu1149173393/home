<template>
  <div class="invitelist">
    <el-row :gutter="0">
      <el-col :span="8"
        ><el-input
          style="width: 80%"
          class=""
          prefix-icon="el-icon-search"
          v-model="RightSearchBox"
          placeholder="请输入内容"
          ref="inpu"
        ></el-input
      ></el-col>
      <el-col :span="8">
        <span>邀请结果：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col
        :span="7"
        style="text-align: right; height: 42px; border: 1px solid"
        ><el-button size="middle">查询</el-button></el-col
      >
    </el-row>

    <div class="">
      <el-table
        :data="inviteTable"
        style="width: 98%; margin: 30px auto"
        border
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column label="企业编码" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.EnterpriseName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="企业名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.EnterpriseName
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="邀请人员" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.EnterpriseName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邀请时间" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.EnterpriseName
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="邀请结果">
          <template slot-scope="scope">
            <el-button size="mini" @click="results(scope.$index, scope.row)">{{
              scope.row.EnterpriseName
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'invitelist',
  data () {
    return {
      // 右边表格上方搜索框
      RightSearchBox: '',
      //   右边 中加下啦框
      options: [
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
      // 右侧表格数据
      inviteTable: []
    }
  },

  mounted () {
    this.list()
  },
  methods: {
    //   获取列表
    async list () {
      const res = await this.invitationList()
      console.log(res)
    },
    // 这里是邀请结果
    results (item, index) {},
    ...mapActions(['Typelist', 'invitationList'])
  },
  watch: {
    RightSearchBox (val) {
      // 然后 下面的表格数据 数组 通过 筛选后 再次刷新 实现 搜索功能
      this.$refs.inpu.filter(val)
    }
  }
}
</script>

<style>
</style>
