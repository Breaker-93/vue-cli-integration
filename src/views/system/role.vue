<template>
  <section class="role-manage">
    <!-- 表格搜索条件及操作按钮 -->
    <div class="search-param">
      <div class="item">
        <el-input v-model="search.keyword" placeholder="输入名称和编码的关键字">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="keywordChange"
          ></el-button>
        </el-input>
      </div>
      <div class="item">
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
      <el-table-column align="center" prop="name" label="角色名称" />
      <el-table-column align="center" prop="code" label="角色编码" />
      <el-table-column align="center" prop="accessList" label="拥有权限">
        <template slot-scope="scope">
          <div v-if="judgeArray(scope.row.accessList)">
            <el-tag
              v-for="(access, index) in scope.row.accessList"
              :key="index"
            >
              {{ access.name }}
            </el-tag>
          </div>
          <div class="empty-tip" v-else>
            (空)
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="remarks" label="备注说明" />
      <el-table-column align="center" prop="createTime" label="创建日期" />
      <el-table-column align="center" prop="createBy" label="创建人" />
      <el-table-column align="center" prop="updateTime" label="修改日期" />
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
        ref="roleForm"
        :rules="roleFormRules"
        :model="addForm"
        :label-width="formLabelWidth"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="addForm.name"
            placeholder="请控制在 50 个字符以内"
            autocomplete="off"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input
            v-model="addForm.code"
            placeholder="请控制在 50 个字符以内"
            autocomplete="off"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择权限" prop="accessList">
          <el-select
            v-model="addForm.accessList"
            multiple
            filterable
            placeholder="请为角色设置权限"
          >
            <el-option
              v-for="item in accessList"
              :key="item.businessId"
              :label="item.name"
              :value="item.businessId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注说明" prop="remarks">
          <el-input
            v-model="addForm.remarks"
            type="textarea"
            :rows="2"
            maxlength="255"
            show-word-limit
          ></el-input>
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
  getRolesByPage,
  addRole,
  editRole,
  deleteRole,
} from "@assets/js/api/role";
import { getAccessesAll } from "@assets/js/api/access";
export default {
  name: "role",
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
        name: "",
        code: "",
        accessList: [],
        remarks: "",
      },
      roleFormRules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "请控制在 50 个字符以内",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入角色编码", trigger: "change" },
          {
            min: 1,
            max: 50,
            message: "请控制在 50 个字符以内",
            trigger: "blur",
          },
        ],
        remarks: [
          {
            min: 0,
            max: 255,
            message: "请控制在 255 个字符以内",
            trigger: "blur",
          },
        ],
      },
      addOrEdit: "add",
      dialogTitle: {
        add: "添加角色",
        edit: "编辑角色",
      },
      tableLoading: false,
      accessList: [],
    };
  },
  created() {
    this.searchByPage();
  },
  mounted() {},
  methods: {
    searchByPage() {
      this.tableLoading = true;
      getRolesByPage(this.currentPage, this.pageSize, this.search.keyword)
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
    getAccesses() {
      getAccessesAll().then((res) => {
        console.log("accessList", res);
        if (res.data) {
          this.accessList = res.data;
        } else {
          this.accessList = [];
        }
      });
    },
    showDialog(type, row) {
      if (this.accessList.length === 0) {
        this.getAccesses();
      }
      this.addOrEdit = type;
      this.clearForm();
      this.addFormDialog = true;
      if (row) {
        console.log("edit", row);
        let accessArry = [];
        if (this.judgeArray(row.accessList)) {
          row.accessList.forEach((access) => {
            accessArry.push(access.businessId);
          });
        }
        this.addForm = {
          id: row.businessId,
          name: row.name,
          code: row.code,
          accessList: accessArry,
          remarks: row.remarks,
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
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          console.log(this.addForm);
          addRole(
            this.addForm.name,
            this.addForm.code,
            this.addForm.accessList,
            this.addForm.remarks.trim() === ""
              ? undefined
              : this.addForm.remarks
          ).then((res) => {
            if (res.code === "200") {
              this.$message.success("角色添加成功");
              this.addFormDialog = false;
              this.clearForm();
              this.refreshSearch();
            }
          });
        } else {
          this.$message({
            message: "请完善角色的必要信息",
            type: "warning",
          });
        }
      });
    },
    clearForm() {
      this.addForm = {
        name: "",
        code: "",
        accessList: [],
        remarks: "",
      };
    },
    toEdit() {
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          console.log("edit:", this.addForm);
          editRole(
            this.addForm.id,
            this.addForm.name,
            this.addForm.code,
            this.addForm.accessList,
            this.addForm.remarks.trim() === ""
              ? undefined
              : this.addForm.remarks
          ).then((res) => {
            if (res.code === "200") {
              this.$message.success("角色修改成功");
              this.addFormDialog = false;
              this.clearForm();
              this.refreshSearch();
            }
          });
        } else {
          this.$message({
            message: "请完善角色的必要信息",
            type: "warning",
          });
        }
      });
    },
    toDelete(row) {
      this.$confirm(`确认删除名为【${row.name}】的角色?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteRole(row.businessId).then((res) => {
          if (res.code === "200") {
            this.$message.success("角色删除成功");
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
.role-manage {
  searchParam()
  .table-pagination {
    text-align center
  }
  .empty-tip{
    color #ccc
  }
}
</style>
