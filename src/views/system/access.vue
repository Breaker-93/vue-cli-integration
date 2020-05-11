<template>
  <section class="access-manage">
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
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      border>
      <el-table-column
        type="index"
        label="序号"
        fixed
        width="50"
        align="center"
      >
      </el-table-column>
      <el-table-column align="center" prop="name" label="权限名称" />
      <el-table-column align="center" prop="code" label="权限编码" />
      <el-table-column align="center" prop="remarks" label="备注说明" />
      <el-table-column align="center" prop="createTime" label="创建时间" />
      <el-table-column align="center" prop="createBy" label="创建人" />
      <el-table-column align="center" prop="updateTime" label="修改时间" />
      <el-table-column align="center" prop="updateBy" label="修改人" />
      <el-table-column fixed="right" align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="showDialog('edit', scope.row)">
            编辑
          </el-button>
          <el-button
            v-if="scope.row.flag !== '1'"
            @click="toDelete(scope.row)"
          >
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
        ref="accessForm"
        :rules="accessFormRules"
        :model="addForm"
        :label-width="formLabelWidth"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input
            v-model="addForm.name"
            placeholder="请控制在 50 个字符以内"
            autocomplete="off"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限编码" prop="code">
          <el-input
            v-model="addForm.code"
            placeholder="请控制在 50 个字符以内"
            autocomplete="off"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序权重" prop="sort">
          <el-input-number
            v-model="addForm.sort"
            :min="0"
            :max="50"
          ></el-input-number>
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
import { getAccessesByPage, addAccess, editAccess, deleteAccess } from "@assets/js/api/access";
export default {
  name: "access",
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
        sort: 0,
        remarks: "",
      },
      accessFormRules: {
        name: [
          { required: true, message: "请输入权限名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "请控制在 50 个字符以内",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入权限编码", trigger: "change" },
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
        add: "添加权限",
        edit: "编辑权限",
      },
      tableLoading: false
    };
  },
  created() {
    this.searchByPage();
  },
  mounted() {},
  methods: {
    searchByPage() {
      this.tableLoading = true
      getAccessesByPage(this.currentPage, this.pageSize, this.search.keyword).then(
        (res) => {
          console.log(res);
          if (res.code === "200") {
            this.total = res.data.total;
            this.tableData = res.data.records;
          }
          this.tableLoading = false
        }
      ).catch(err => {
        console.log(err)
        this.tableLoading = false
      })
    },
    refreshSearch() {
      this.currentPage = 1
      this.total = 0;
      this.search.keyword = ""
      this.tableData = [];
      this.searchByPage();
    },
    keywordChange() {
      this.currentPage = 1;
      this.tableData = [];
      this.total = 0;
      this.searchByPage();
    },
    showDialog(type, row) {
      this.addOrEdit = type;
      this.clearForm();
      this.addFormDialog = true;
      if (row) {
        console.log(row);
        this.addForm = {
          id: row.businessId,
          name: row.name,
          code: row.code,
          sort: row.sort,
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
      this.$refs.accessForm.validate((valid) => {
        if (valid) {
          addAccess(
            this.addForm.name,
            this.addForm.code,
            this.addForm.sort,
            this.addForm.remarks.trim() === ""
              ? undefined
              : this.addForm.remarks
          ).then((res) => {
            if (res.code === "200") {
              this.$message.success("权限添加成功");
              this.addFormDialog = false;
              this.clearForm();
              this.refreshSearch();
            }
          });
        } else {
          this.$message({
            message: "请完善权限的必要信息",
            type: "warning",
          });
        }
      });
    },
    clearForm() {
      this.addForm = {
        name: "",
        code: "",
        sort: 0,
        remarks: "",
      };
    },
    toEdit() {
      this.$refs.accessForm.validate((valid) => {
        if (valid) {
          console.log("edit:", this.addForm);
          editAccess(
            this.addForm.id,
            this.addForm.name,
            this.addForm.code,
            this.addForm.sort,
            this.addForm.remarks.trim() === ""
              ? undefined
              : this.addForm.remarks
          ).then((res) => {
            if (res.code === "200") {
              this.$message.success("权限修改成功");
              this.addFormDialog = false;
              this.clearForm();
              this.refreshSearch();
            }
          });
        } else {
          this.$message({
            message: "请完善权限的必要信息",
            type: "warning",
          });
        }
      });
    },
    toDelete(row) {
      this.$confirm(`确认删除名为【${row.name}】的权限?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAccess(row.businessId).then( res => {
          if (res.code === "200") {
            this.$message.success("权限删除成功");
            this.refreshSearch();
          }
        })
      })
      
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
  },
  computed: {},
  watch: {},
};
</script>
<style lang="stylus">
.access-manage {
  searchParam()
  .table-pagination {
    text-align center
  }
}
</style>
