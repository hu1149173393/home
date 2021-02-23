<template>
  <div class="hello">
    <el-row :gutter="0" class="demo">
      <el-col :span="6">
        <!-- <TypeTable></TypeTable> -->
      </el-col>
      <el-col :span="18"
        ><div style="border: 1px solid" class="test">
          <div class="rightTop">
            <p>企业外部关系</p>
            <div class="RightAssociated">
              <router-link style="margin-right: 30px" :to="{ name: 'invite' }"
                >邀请关联</router-link
              >
              <router-link style="margin-right: 30px" to=""
                >新的邀请</router-link
              >
            </div>
          </div>
          <div>
            <el-row :gutter="0">
              <el-col :span="8">
                <el-input
                  class="rightSearchBox"
                  prefix-icon="el-icon-search"
                  v-model="TableSerch"
                  placeholder="输入企业名称/企业编码"
                ></el-input>
              </el-col>
              <el-col :span="9" style="padding-left: 20px">
                <span style="width: 100px">关联状态：</span>
                <el-select v-model="value" placeholder="已关联">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6" style="text-align: right">
                <el-button style="width: 120px">查询</el-button>
              </el-col>
            </el-row>
          </div>

          <div>
            <el-table
              :data="tableData"
              style="width: 98%; margin: 30px auto"
              border
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            >
              <el-table-column label="企业名称" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.EnterpriseName
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="企业编码" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.EnterpriseCoding
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="关联状态" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.AssociatedStates
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="关系类型" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.AssociationTypes
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="企业联系人">
                <template slot-scope="scope">

                  <el-button
                    size="mini"
                    @click="contact(scope.$index, scope.row)"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column label="负责人">
                <template slot-scope="scope">

                  <el-button size="mini" @click="head(scope.$index, scope.row)"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="operation(scope.$index, scope.row)"
                    >...</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="100"
              layout="prev, pager, next, jumper"
              background
              :total="1000"
            >
            </el-pagination>
          </div></div
      ></el-col>
    </el-row>

    <div class="types" v-if="contactShow">
      <div style="display: flex; justify-content: space-between">
        <p v-if="ifcontactOrHead">企业联系人</p>
        <p v-else>负责人</p>
        <i
          style="
            width: 20px;
            height: 20px;
            text-align: center;
            margin-top: 10px;
            border: 1px solid;
          "
          @click="shiftdow"
          class="el-icon-close"
        ></i>
      </div>

      <el-table
        :data="contactData"
        style="width: 100%"
        border
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column prop="name" label="姓名" width="130">
        </el-table-column>
        <el-table-column prop="phone" label="联系人电话" width="180">
        </el-table-column>
        <el-table-column prop="jobs" label="岗位"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { applyFor } from '../api/ExternalRelationships'
// import TypeTable from "../components/TypeTable.vue";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    // TypeTable,
  },
  created () {},
  data () {
    return {
      // 左侧搜索框
      LeftSearchBox: '',
      // 左边关系类型列表
      Relationship_types: [
        {
          name: '供应商'
        },
        {
          name: '经销商'
        },
        {
          name: '加盟商'
        },
        {
          name: '合作伙伴'
        }
      ],
      defaultProps: {
        label: 'name'
      },
      // 新增类型名称
      typesInput: '',
      // 左侧点击新增 显示弹窗 新增类型
      leftPopupOne: false,
      // 左侧点击新增 显示弹窗 编辑类型
      leftPopupTwo: false,
      ifcontactOrHead: true,
      // 右侧企业搜索框
      TableSerch: '',
      // 左侧编辑删除id
      leftDelteId: '',

      // 右侧关联状态
      options: [
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

      // 表格数据
      tableData: [
        {
          EnterpriseName: '企业1',
          EnterpriseCoding: '1111',
          AssociatedStates: '已经关联',
          AssociationTypes: '供应商',
          EnterpriseMan: '大明',
          EnterpriseManPhone: 18739318691,
          jobs: '技术人员',

          headName: '小明',
          headPhone: 18739318691,
          headJobs: '技术人员'
        },
        {
          EnterpriseName: '企业1',
          EnterpriseCoding: '1111',
          AssociatedStates: '已解绑',
          AssociationTypes: '经销商',
          EnterpriseMan: '大明',
          EnterpriseManPhone: 18739318691,
          jobs: '技术人员',

          headName: '小明',
          headPhone: 18739318691,
          headJobs: '技术人员'
        },
        {
          EnterpriseName: '企业1',
          EnterpriseCoding: '1111',
          AssociatedStates: '未关联',
          AssociationTypes: '加盟商',
          EnterpriseMan: '大明',
          EnterpriseManPhone: 18739318691,
          jobs: '技术人员',

          headName: '小明',
          headPhone: 18739318691,
          headJobs: '技术人员'
        },
        {
          EnterpriseName: '企业1',
          EnterpriseCoding: '1111',
          AssociatedStates: '已解除',
          AssociationTypes: '自定义商',
          EnterpriseMan: '大明',
          EnterpriseManPhone: 18739318691,
          jobs: '技术人员',

          headName: '小明',
          headPhone: 18739318691,
          headJobs: '技术人员'
        }
      ],
      // 点击联系人 弹窗 企业联系人表格数据
      contactData: [
        {
          name: '',
          phone: '',
          jobs: ''
        }
      ],

      // 点击联系人查看 按钮显示
      contactShow: false,

      // 点击编辑 接收的当前数据信息 用来做 输入不同后删除功能
      msg1: '',
      msg2: '',

      repeat: [],

      // 点击出现编辑弹窗页面的输入框
      labelPosition: 'left',
      formLabelAlign: {
        name: '',
        editorName: ''
      },

      // 分页
      currentPage3: 1
    }
  },
  computed: {
    ...mapState(['leftMsg', 'rightTable'])
  },
  mounted () {
    // this.relationList()
  },
  methods: {
    ...mapActions([]),
    // 打开就显示表格数据
    async relationList () {
      // let res = await this.QueryEnterprise();
      // console.log(res);
    },
    // 左侧点击显示弹窗
    leftNews () {
      // const h = this.$createElement;
      // this.$msgbox({
      //   title: "新增类型",
      //   message: h("p", null, [
      //     h("span", null, "类型名称 "),
      //     h("input", { style: "color: teal" }, ""),
      //   ]),
      //   showCancelButton: true,
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   inputPattern: [],
      // })
      // 控制显示 左侧弹窗
      this.leftPopupOne = true
    },
    // 左侧点击新增
    typesBtnSure () {
      const ReceiveValue = {
        name: this.formLabelAlign.name
      }
      if (this.formLabelAlign.name == '') {
        alert('没有输入。')
      } else {
        // 后来的元素 放到数组中的开头
        this.Relationship_types.unshift(ReceiveValue)
        // console.log(this.Relationship_types);
        this.formLabelAlign.name = ''
        this.leftPopupOne = false
      }
    },
    // 左侧输入框筛选
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },

    // 取消填写
    typesBtnCancel () {
      this.leftPopupOne = false
    },
    // 左侧点击编辑
    leftCompile (item, index) {
      console.log(item, index.id)
      this.leftDelteId = index.id

      this.leftPopupTwo = true
      this.formLabelAlign.editorName = item.name

      this.msg1 = item
      this.msg2 = index
    },
    // 取消编辑 弹窗关闭
    typesBtnCancelTwo () {
      this.leftPopupTwo = false
    },
    // 点击出现编辑弹窗
    typesBtnSureTwo () {
      let ReceiveValue
      this.Relationship_types.map((item) => {
        if (this.formLabelAlign.editorName == item.name) {
          alert(this.formLabelAlign.editorName + '类型已经存在，请重新输入。')
        } else {
          ReceiveValue = {
            name: this.formLabelAlign.editorName
          }
          this.leftPopupTwo = false

          this.Relationship_types.splice(this.leftDelteId, 1)
        }
      })
      console.log(ReceiveValue)
      this.Relationship_types.unshift(ReceiveValue)
    },
    // 删除类型
    leftDelte (node, data) {
      // 现在没有表格数据 不能够判断 数据有没有使用
      console.log(node, data)
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.id === data.id)
      children.splice(index, 1)
    },

    // 联系人点击
    contact (item, index) {
      this.ifcontactOrHead = true
      this.contactData = []
      console.log(item, index)
      const newcontact = {
        name: index.EnterpriseMan,
        phone: index.EnterpriseManPhone,
        jobs: index.jobs
      }
      this.contactData.push(newcontact)
      this.contactShow = true
    },
    // 负责人点击
    head (item, index) {
      this.ifcontactOrHead = false
      this.contactData = []
      const newcontact = {
        name: index.headName,
        phone: index.headPhone,
        jobs: index.headJobs
      }
      this.contactData.push(newcontact)
      this.contactShow = true
      console.log(item, index)
    },
    // 操作
    operation (item, index) {
      console.log(item, index)
      // 因为是把一个对象都放进去了 所以才不会覆盖
      this.rightTable.push(index)
      // this.leftMsg = [...this.Relationship_types];
      // this.$state.commit('leftMsg',this.Relationship_types)
      this.Relationship_types.map((item) => {
        this.leftMsg.push(item)
      })
      // this.leftMsg.unshift(this.Relationship_types)
      console.log(this.leftMsg)

      this.$router.push({
        path: '/editor'
      })
    },

    shiftdow () {
      this.contactShow = false
    },

    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  watch: {
    LeftSearchBox (val) {
      // 然后 下面的表格数据 数组 通过 筛选后 再次刷新 实现 搜索功能
      this.$refs.tree.filter(val)
    }
  }
}
</script>

<style scoped>
ul li {
  list-style: none;
}
.hello {
  width: 100%;
  text-align: center;
   background: #f8f9fb;
}
.test {
  height: 70vh;
}
.rightSearchBox {
  width: 70%;
  margin-left: 30px;
}
.rightSearchBox >>> .el-input__inner {
  border-radius: 40px !important;
}
.el-input__inner {
  border-right: 1px solid;
}
.el-popover__reference-wrapper {
  width: 100px;
}
.demo {
  min-width: 1200px;
  width: 1600px;
  margin: 0 auto;
}
.left-table {
  display: flex;
  justify-content: space-between;
}
.typesBtn {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}
.types {
  min-width: 450px;
  width: 500px;
  height: 200px;
  border: 1px solid;
  padding-left: 30px;
  padding-right: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #ffffff;
  z-index: 999999;
}
.TypeTable {
  width: 100%;
  height: 30px;
  border-top: 1px solid;
}
.dian {
  width: 60px;
  text-align: right;
}
.rightTop {
  display: flex;
  justify-content: space-between;
}
.RightAssociated {
  width: 200px;
  height: 80px;
}
</style>
