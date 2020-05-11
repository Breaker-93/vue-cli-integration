<template>
  <section class="user-manage">
    <!-- 表格搜索条件及操作按钮 -->
    <div class="search-param">
      <div class="item">
        <label>所属组：</label>
        <el-select
          v-model="search.groupId"
          @change="changeEvent()"
          placeholder="选择所属组"
          filterable
          clearable
        >
          <el-option
            v-for="item in groupList"
            :key="item.id"
            :label="item.name"
            :value="item.businessId"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <label>所属角色：</label>
        <el-select
          v-model="search.roleId"
          @change="changeEvent()"
          placeholder="选择所属角色"
          filterable
          clearable
        >
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.businessId"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <el-input
          v-model="search.keyword"
          placeholder="输入用户名或昵称的关键字"
        >
        <el-button slot="append" icon="el-icon-search" @click="keywordChange"></el-button>
        </el-input>
        
        <el-button @click="showDialog('add')">添加</el-button>
      </div>
    </div>

    <!-- emementUI表格 -->
    <el-table :data="tableData" v-loading="tableLoading" border>
      <el-table-column
        type="index"
        label="序号"
        fixed
        width="50"
        align="center"
      >
      </el-table-column>
      <el-table-column align="center" prop="username" label="用户名" />
      <el-table-column align="center" prop="groupList" label="所属组">
        <template slot-scope="scope">
          <div v-if="judgeArray(scope.row.groupList)">
            <el-tag v-for="(group, index) in scope.row.groupList" :key="index">
              {{ group.name }}
            </el-tag>
          </div>
          <div class="empty-tip" v-else>
            (空)
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="roleList" label="拥有角色">
        <template slot-scope="scope">
          <div v-if="judgeArray(scope.row.roleList)">
            <el-tag v-for="(role, index) in scope.row.roleList" :key="index">
              {{ role.name }}
            </el-tag>
          </div>
          <div class="empty-tip" v-else>
            (空)
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间" />
      <el-table-column align="center" prop="createBy" label="创建人" />
      <el-table-column align="center" prop="updateTime" label="修改时间" />
      <el-table-column align="center" prop="updateBy" label="修改人" />
      <el-table-column fixed="right" align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="showDialog('edit', scope.row)">
            编辑
          </el-button>
          <el-button v-if="scope.row.flag !== '1'" @click="toDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="table-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pageSize"
      layout="total, prev, pager, next, sizes"
      :total="total"
    >
    </el-pagination>

    <el-dialog
      :title="dialogTitle[addOrEdit]"
      :visible.sync="addFormDialog"
      :close-on-click-modal="false"
    >
      <el-form
        ref="userForm"
        :rules="userFormRules"
        :model="addForm"
        :label-width="formLabelWidth"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="addForm.username"
            placeholder="请设置用户名"
            autocomplete="off"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="addForm.password"
            type="password"
            placeholder="不输入，则为默认密码：123456"
            autocomplete="off"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择角色" prop="roleList">
          <el-select
            v-model="addForm.roleList"
            multiple
            filterable
            placeholder="请为用户设置角色"
          >
            <el-option
              v-for="item in roleList"
              :key="item.businessId"
              :label="item.name"
              :value="item.businessId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择组" prop="groupList">
          <el-select
            v-model="addForm.groupList"
            multiple
            filterable
            placeholder="请为用户设置组"
          >
            <el-option
              v-for="item in groupList"
              :key="item.businessId"
              :label="item.name"
              :value="item.businessId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmEvent">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import {
  getUsersByPage,
  addUser,
  editUser,
  deleteUser,
} from "@assets/js/api/user";
import { getRolesAll } from "@assets/js/api/role";
import { getGroupsAll } from "@assets/js/api/group";
export default {
  name: "user",
  components: {},
  props: {},
  data() {
    return {
      search: {
        keyword: "",
      },
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      addFormDialog: false,
      formLabelWidth: "120px",
      addForm: {
        username: "",
        password: "",
        roleList: [],
        groupList: [],
        detailInfo: {},
      },
      userFormRules: {
        username: [
          { required: true, message: "请设置用户名", trigger: "blur" },
          {
            min: 3,
            max: 50,
            message: "请设置 3 ~ 50 个字符的用户名",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请设置密码", trigger: "change" },
          {
            min: 5,
            max: 50,
            message: "请设置 5 ~ 50 个字符的密码",
            trigger: "blur",
          },
        ],
      },
      addOrEdit: "add",
      dialogTitle: {
        add: "添加用户",
        edit: "编辑用户",
      },
      tableLoading: false,
      roleList: [],
      groupList: [],
    };
  },
  created() {
    if (this.roleList.length === 0) {
      this.getRoles();
    }
    if (this.groupList.length === 0) {
      this.getGroups();
    }
    this.searchByPage();
  },
  mounted() {},
  methods: {
    changeEvent() {
      this.searchByPage()
    },
    searchByPage() {
      this.tableLoading = true;
      getUsersByPage(
        this.currentPage,
        this.pageSize,
        this.search.keyword,
        this.search.roleId,
        this.search.groupId
      )
        .then((res) => {
          console.log(res);
          if (res.code === "200") {
            this.total = res.data.total;
            this.tableData = res.data.records;
          }
          this.tableLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.tableLoading = false;
        });
    },
    refreshSearch() {
      this.currentPage = 1;
      this.total = 0;
      this.search.keyword = "";
      this.tableData = [];
      this.searchByPage();
    },
    keywordChange() {
      this.currentPage = 1;
      this.tableData = [];
      this.total = 0;
      this.searchByPage();
    },
    getRoles() {
      getRolesAll().then((res) => {
        console.log("roleList", res);
        if (res.data) {
          this.roleList = res.data;
        } else {
          this.roleList = [];
        }
      });
    },
    getGroups() {
      getGroupsAll().then((res) => {
        console.log("groupList", res);
        if (res.data) {
          this.groupList = res.data;
        } else {
          this.groupList = [];
        }
      });
    },
    showDialog(type, row) {
      this.addOrEdit = type;
      this.clearForm();
      this.addFormDialog = true;
      if (row) {
        console.log("edit", row);
        let roleArry = [];
        if (this.judgeArray(row.roleList)) {
          row.roleList.forEach((role) => {
            roleArry.push(role.businessId);
          });
        }
        let groupArry = [];
        if (this.judgeArray(row.groupList)) {
          row.groupList.forEach((group) => {
            groupArry.push(group.businessId);
          });
        }
        this.addForm = {
          id: row.userId,
          username: row.username,
          password: "",
          roleList: roleArry,
          groupList: groupArry,
        };
      }
    },
    confirmEvent() {
      if (this.addOrEdit === "add") {
        this.toAdd();
      } else {
        this.toEdit();
      }
    },
    toAdd() {
      if (this.addForm.password === "") {
        this.addForm.password = "123456";
      }
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          console.log(this.addForm);
          addUser(
            this.addForm.username,
            this.addForm.password,
            this.addForm.roleList,
            this.addForm.groupList,
            this.addForm.detailInfo
          ).then((res) => {
            if (res.code === "200") {
              this.$message.success("用户添加成功");
              this.addFormDialog = false;
              this.clearForm();
              this.refreshSearch();
            }
          });
        } else {
          this.$message({
            message: "请完善用户的必要信息",
            type: "warning",
          });
        }
      });
    },
    clearForm() {
      this.addForm = {
        username: "",
        password: "",
        roleList: [],
        groupList: [],
        detailInfo: {},
      };
    },
    toEdit() {
      if (this.addForm.password === "") {
        this.addForm.password = "123456";
      }
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          console.log("edit:", this.addForm);
          editUser(
            this.addForm.id,
            this.addForm.username,
            this.addForm.password,
            this.addForm.roleList,
            this.addForm.groupList
          ).then((res) => {
            if (res.code === "200") {
              this.$message.success("用户修改成功");
              this.addFormDialog = false;
              this.clearForm();
              this.refreshSearch();
            }
          });
        } else {
          this.$message({
            message: "请完善用户的必要信息",
            type: "warning",
          });
        }
      });
    },
    toDelete(row) {
      this.$confirm(`确认删除名为【${row.username}】的用户?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteUser(row.userId).then((res) => {
          if (res.code === "200") {
            this.$message.success("用户删除成功");
            this.refreshSearch();
          }
        });
      });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      // 重新分页查询数据
      this.tableData = [];
      this.searchByPage();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      // 重新分页查询数据
      this.tableData = [];
      this.searchByPage();
    },
    judgeArray(arry) {
      return arry instanceof Array && arry.length > 0;
    },
  },
  computed: {},
  watch: {},
};
</script>
<style lang="stylus">
.user-manage {
  searchParam()
  .table-pagination {
    text-align center
  }
  .empty-tip{
    color #ccc
  }
}
</style>
