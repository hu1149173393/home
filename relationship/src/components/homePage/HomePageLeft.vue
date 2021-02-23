<template>
  <div class="typeTable">
    <div class="" style="width: 100%">
      <div class="left-table">
        <p class="RelationshipTypes">关系类型</p>
        <p class="addImg">
          <img @click="leftNews" style="margin-top: 3px" :src="addImg" alt="" />
        </p>
      </div>
      <div class="LeftSearchBox">
        <el-input
          style="border: 1px solid #dedede; border-radius: 5px"
          prefix-icon="el-icon-search"
          v-model="LeftSearchBox"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <p class="allType">
        <span style="margin-left: 16px">全部类型</span>
      </p>
      <happy-scroll color="rgba(0,0,0,0.5)" size="10" style="width: 210px">
        <div style="height: 459px">
          <ul
            v-for="(item, index) in newRelationship_types"
            :key="index"
            class="filter-tree"
          >
            <p class="typeTbaleList" style="width:200px;height:40px;" @click="changeRightList(item,index)">{{ item.name }}</p>
            <p class="typeTbaleright">
              <el-dropdown trigger="click">
                <img :src="pointImg" alt="" />
                <el-dropdown-menu
                  slot="dropdown"
                  style="width: 92px; text-align: center"
                >
                  <div>
                    <p
                      class="styles"
                      size="mini"
                      @click="leftCompile(item, index)"
                    >
                      编辑
                    </p>
                  </div>
                  <div>
                    <p
                      class="styles"
                      size="mini"
                      @click="leftDelte(item, index)"
                    >
                      删除
                    </p>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </p>
          </ul>
        </div>
      </happy-scroll>
    </div>
    <!-- 新增 编辑 类型弹窗 -->
    <el-dialog :title="title" :visible.sync="NewTypePopover">
      <el-form
        :label-position="labelPosition"
        label-width="90px"
        :model="formLabelAlign"
      >
        <el-form-item label="类型名称：">
          <el-input
            style="width: 300px"
            maxlength="10"
            v-model="formLabelAlign.nameAdd"
            placeholder="请输入类型名称"
          ></el-input>
          <el-row>
            <el-col :span="21" style="text-align: right">
              <el-button @click="typesBtnCancel">取消</el-button>
            </el-col>
            <el-col :span="3">
              <el-button @click="typesBtnSure" type="primary">确认</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
import Bus from './bus'
export default {
  name: 'HomePageLeft',
  data () {
    return {
      inpu: '',
      addImg: require('../../static/increase.png'),
      pointImg: require('../../static/pointImg.png'),
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
      // 判断新增 或者 编辑
      add: true,
      // 左侧点击新增 显示弹窗 新增类型
      leftPopupOne: false,
      // 弹窗里面的输入框
      formLabelAlign: {
        nameAdd: '',
        nameChange: '',
        // 接收的id 并在修改 或者删除用 必须先初始化
        id: ''
      },

      // 点击出现编辑弹窗页面的输入框
      labelPosition: 'left',

      NewTypePopover: false,
      title: ''
    }
  },
  mounted () {
    this.defaultMsg()
  },
  methods: {
    ...mapActions(['CreateType', 'Typelist', 'rename', 'delet']),
    
    async defaultMsg () {
      const res = await this.Typelist()
      console.log(res)
      this.$nextTick(function () {
        this.Relationship_types = [...res.data]
        console.log(this.Relationship_types)
      })
    },
    //   新增类型 显示弹窗
    async leftNews () {
      // this.title = '新增类型'
      // this.NewTypePopover = true
      // this.formLabelAlign.nameAdd = ''
      const _this = this
      this.$prompt('', '新增类型', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入类型名称',
        // inputPattern: /^[\u4e00-\u9fa5]{1,10}$|^[\dA-Za-z_]{1,10}$/,
        inputPattern: /^[\u4e00-\u9fa5]{3,}$/
      }).then(async ({ value }) => {
        const res = await _this.CreateType({ name: value })
        console.log(res)
        if (res.code == 1000) {
          this.Relationship_types.unshift(res.data)
        } else if (res.code == 29001) {
          this.$message({
            message: value + '关系类型已存在'
          })
        } else if (res.code == 21001) {
          this.$message(value + '类型不存在')
        }
      })
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "取消输入",
      //   });
      // });
    },

    // 左侧输入框筛选
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    //  。。。 的编辑功能
    leftCompile (data, node) {
      // this.NewTypePopover = true;
      // this.title = "编辑类型";
      // this.formLabelAlign.nameAdd = "";
      this.formLabelAlign.nameAdd = data.name
      this.$prompt('', '编辑类型', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: this.formLabelAlign.nameAdd,
        inputPattern: /^[\u4e00-\u9fa5]{1,10}$|^[\dA-Za-z_]{1,10}$/,
        inputErrorMessage: '类型名称必填'
      })
        .then(async ({ value }) => {
          const res = await this.rename({
            id: data.id,
            name: value
          })
          console.log(res)
          if (res.code == 21001) {
            this.$alert('类型不存在')
          } else if (res.code == 1000) {
            this.$router.go(0)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    //  。。。 的删除功能
    async leftDelte (item, index) {
      console.log(item, index)
      const res = await this.delet({ id: item.id })
      console.log(res)
      if (res.code == 21001) {
        this.$alert('类型不存在', '提示')
      }
      if (res.code == 29005) {
        await this.$alert('已存在关联的外部企业，不允许删除', '提示')
      }
      this.$router.go(0)
    },

    // 弹窗取消填写
    typesBtnCancel () {
      this.NewTypePopover = false
      if (this.add) {
        this.leftPopupOne = false
      } else {
        this.leftPopupOne = false
      }
    },
    async typesBtnSure () {
      if (this.add) {
        this.leftPopupOne = false
        const res = await this.CreateType({ name: this.formLabelAlign.nameAdd })
        if (res.code == 1000) {
          this.Relationship_types.unshift(res.data)
          this.NewTypePopover = false
        }
        if (res.code == 29001) {
          alert('类型已经存在')
        }
        if (res.code == 21001) {
          alert('类型不存在')
        }
      } else {
        this.leftPopupOne = false
        const res = await this.rename({
          id: this.formLabelAlign.id,
          name: this.formLabelAlign.nameChange
        })
      }
    },
    changeRightList(item,index){
      console.log(item,index);
      Bus.$emit('getTarget',item.id)
      this.TypeID
    },
  },
  computed: {
    newRelationship_types () {
      const arr = []
      for (let i = 0; i < this.Relationship_types.length; i++) {
        if (this.Relationship_types[i].name.search(this.LeftSearchBox) != -1) {
          arr.push(this.Relationship_types[i])
        }
      }
      return arr
    },
  },
  components:{
  },
  watch: {
    // LeftSearchBox(val) {
    //   // 然后 下面的表格数据 数组 通过 筛选后 再次刷新 实现 搜索功能
    //   this.$Relationship_types.filter(val);
    // },
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
}
/* .typeTable{
  /* border: 1px solid #e1e1e1;
} */
.el-message-box__errormsg {
  opacity: 0;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.RelationshipTypes {
  width: 72px;
  height: 25px;
  margin-left: 17px;
  margin-top: 20px;
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #333333;
  line-height: 25px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}
.addImg {
  width: 20px;
  height: 18px;
  margin-top: 20px;
  margin-right: 9px;
}
.left-table {
  height: 60px;
  border-bottom: 1px solid #e1e1e1;
}
.LeftSearchBox {
  width: 90%;
  margin: 0 auto;
  margin-top: 14px;
}
.allType {
  width: 99%;
  height: 40px;
  background: #f6f6f7;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  line-height: 40px;
  border-right: 2px solid #3389ff;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  color: #3389ff;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  margin-top: 12px;
}
.typeTbaleList {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #333333;
  line-height: 40px;
  text-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
  margin-left: 16px;
}
.typeTbaleright {
  margin-right: 10px;
}
.filter-tree {
  width: 218px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.filter-tree:hover {
  width: 218px;
  height: 40px;
  background: #f6f6f7;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.05);
}
.styles {
  width: 24px;
  height: 14px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: #5a5e66;
  line-height: 30px;
  padding-left: 20px;
  margin-bottom: 20px;
}
</style>

      let res = await this.CreateType({ name: this.inpu });
      console.log(res);

            <!-- <el-tree
        class=""
        :data="Relationship_types"
        :props="defaultProps"
        :filter-node-method="filterNode"
        ref="tree"
        id="treef"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class="">{{ node.label }}</span>
          <el-Popover placement="right" width="130" trigger="click">
            <div>
              <el-button size="mini" @click="leftCompile(data, node)"
                >编辑</el-button
              >
              <el-button size="mini" @click="leftDelte(node, data)"
                >删除</el-button
              >
            </div>
            <img slot="reference" :src="pointImg" alt="">
            <span slot="reference"> ... </span>
          </el-Popover>
        </span>
      </el-tree> -->
