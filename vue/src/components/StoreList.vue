<template>
    <div style="margin: 0 50px;">
        <el-row style="margin-bottom: 20px;">
            <el-button type="primary" @click="addStore">添加新店铺</el-button>
        </el-row>
        <el-table
            :data="storeList"
            stripe
            style="width: 100%">
            <el-table-column prop="_id" label="店铺ID" width="280"></el-table-column>
            <el-table-column prop="mid" label="mid账号" width="180"></el-table-column>
            <el-table-column prop="company" label="企业名称"></el-table-column>
            <el-table-column prop="shopName" label="店铺名称"></el-table-column>
            <el-table-column prop="status" label="店铺状态"></el-table-column>
            <el-table-column fixed="right" label="操作" width="350">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" @click="">详情</el-button>
                    <el-button size="small" type="success" @click="editStore(scope.row)">修改</el-button>
                    <el-button type="danger" size="small" @click="delStore(scope.row)">删除</el-button>
                    <el-button type="warning" size="small" @click="closeStore(scope.row)">
                        {{scope.row.status == '开店' ? '关店' : '重新开店'}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <store-dialog v-if="storeDialogVisible" :visible="storeDialogVisible" :editId="editId"
                      @cancel="cancelDialog"></store-dialog>
    </div>
</template>

<script>
    import StoreDialog from './StoreDialog.vue'

    export default {
        components: {
            StoreDialog
        },
        data() {
            return {
                storeList: [],
                storeDialogVisible: false,
                editId: '',
            }
        },

        methods: {
            //获取列表数据
            getList() {
                this.loading = true;
                this.$http.get("/api/store").then(
                    function (response) {
                        this.storeList = response.body;
                        this.storeList.map(item => {
                            return item;
                        })
                    },
                    function () {
                        this.loading = false;
                        console.log("error");
                    }
                );
            },

            //新增店铺
            addStore() {
                this.editId = '';
                this.storeDialogVisible = true;
            },

            //取消弹框
            cancelDialog() {
                this.storeDialogVisible = false;
                this.getList();
            },

            //关店
            closeStore(item) {
                let params = item;
                params.status = item.status == '开店' ? '关店' : '开店';
                this.$http.put(`/api/store/${item._id}`, params, {emulateJSON: true}).then(
                    function (response) {
                        if (response.ok) {
                            this.$message.success('更改成功');
                            this.getList();
                        }
                    },
                    function () {
                        this.$message.error('更改失败');
                    }
                );
            },

            //删除
            delStore(item) {
                let that = this;
                let deleteId = item._id;
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$http.delete(`/api/store/${deleteId}`).then(
                        function (response) {
                            if (response.ok) {
                                this.$message.success('删除成功');
                                that.getList();
                            } else {
                                this.$message.error('删除失败');
                            }
                        },
                        function () {
                            this.$message.error('删除失败');
                        }
                    );
                }).catch(() => {
                    this.$message.info('已取消删除');
                });
            },

            //编辑
            editStore(item) {
                this.editId = item._id;
                this.storeDialogVisible = true;
            },


        },

        mounted() {
            this.getList();
        },
    }
</script>

<style>

</style>
