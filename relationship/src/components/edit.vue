<template>
  <div class="edito">
    <el-row :gutter="0" style="border: 1px solid" class="demo">
      <el-col class="editoLeft" :span="6">
        <el-input
          class="LeftSearchBox"
          prefix-icon="el-icon-search"
          v-model="editoSearch"
          placeholder="请输入内容"
        ></el-input>
        <div>
          <p>类型</p>
          <el-tree
            class="filter-tree"
            :data="editoLeftTable"
            :props="defaultProps"
            :filter-node-method="filterNode"
            ref="tree"
          >
            <span class="custom-tree-node" slot-scope="{ data }">
              <span style="">{{ data.name }}</span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col class="editoRight" :span="18" style="border-left: 1px solid">
        <p style="padding-left: 20px">返回</p>
        <div class="EditoRightTableTop">
          <el-row :gutter="0" style="padding-left: 20px">
            <el-col :span="7">
              <div>{{ firm }}-编码</div>
              <div>企业理念</div>
            </el-col>
            <el-col :span="12">
              {{ condition }}
            </el-col>
            <el-col :span="3">
              <div>{{ genre }}</div>
              <div @click="changelab">修改标签</div>
            </el-col>
          </el-row>

          <div>
            <el-table
              :data="EditoRightTableTop"
              style="width: 98%; margin: 30px auto"
              border
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            >
              <el-table-column label="联系人名称" width="280">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.EnterpriseMan
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="联系人电话" width="280">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.EnterpriseManPhone
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="联系人岗位">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.jobs }}</span>
                </template>
              </el-table-column>
            </el-table>

            <el-table
              :data="EditoRightTableBottom"
              style="width: 98%; margin: 30px auto"
              border
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            >
              <el-table-column label="负责人名称" width="280">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.headName
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="负责人电话" width="280">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.headPhone
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="负责人岗位">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.headJobs
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="operation(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    @click="deleteRow(scope.$index, scope.row)"
                    size="mini"
                  >
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="changelabel" v-if="changelabel">
        <p>修改类型</p>
      <span style="width: 100px">选择类型：</span>
      <el-select v-model="value" placeholder="" style="z-index:999999999;">
        <el-option
          v-for="item in option"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div>
          <el-button @click="cancel" style="width:100px; margin:20px;">取消</el-button>
          <el-button @click="save" style="width:100px; margin:40px;">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'edito',
  data () {
    return {
      // 左侧搜索框
      editoSearch: '',
      // 左侧接收传递过来的表格数据
      editoLeftTable: [],
      // 右侧接收传递过来的表格数据
      editorightTable: [],
      defaultProps: {
        label: 'name'
      },

      //   右侧表格数据 上面的
      EditoRightTableTop: [],
      // 右侧表格数据 下面的
      EditoRightTableBottom: [],

      //   企业-编码
      firm: '',
      // 状态
      condition: '',
      // 类型
      genre: '',

      // 修改标签
      option: [
        {
          value: '1',
          label: '已关联'
        },
        {
          value: '2',
          label: '已解绑'
        },
        {
          value: '3',
          label: '未关联'
        },
        {
          value: '4',
          label: '已解除'
        }
      ],
      value: '',
      //   修改标签显示
      changelabel: false
    }
  },
  components: {
    ...mapState(['leftMsg', 'rightTable'])
    // 数据存储 可选方案 sessionStorage 备用
  },
  created () {},
  mounted () {
    this.editoLeftTable = [...this.$store.state.leftMsg]
    this.editorightTable = [...this.$store.state.rightTable]
    console.log(this.editoLeftTable)
    console.log(this.editorightTable)
    this.rightTable()
  },
  methods: {
    // 左侧输入框筛选
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },

    // 右侧table数据
    rightTable () {
      this.editorightTable.map((item) => {
        console.log(item)
        this.firm = item.EnterpriseName
        this.condition = item.AssociationTypes
        this.genre = item.AssociatedStates
        this.EditoRightTableTop.push(item)

        this.EditoRightTableBottom.push(item)
      })
    },
    // 编辑按钮
    operation (index, item) {
      console.log(index, item)
    },
    // 删除按钮
    deleteRow (index, rows) {
      // rows.splice(index, 1);
      console.log(index, rows)
      this.EditoRightTableBottom.splice(index, 1)
    },
    // 弹窗再次确认删除

    // 修改标签
    changelab () {
      this.changelabel = true
      this.value = this.genre
    },

    cancel () {
      this.value = ''
      this.changelabel = false
    },
    save () {
      this.genre = this.value
      // if (num == 1) {
      //     this.genre = ""
      // }else if (num == 2) {

      // }else if (num == 3) {

      // }else if (num == 4) {

      // }
      this.changelabel = false
    }

  },
  watch: {
    editoSearch (val) {
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
.changelabel{
    width: 400px;
    height: 200px;
    border: 1px solid;
    z-index: 10;
    padding-left: 30px;
    background: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
</style>
