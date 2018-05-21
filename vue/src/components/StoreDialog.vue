<template>
    <div>
        <el-dialog title="新增/编辑店铺" :visible.sync="visible" :before-close="onCancel">
            <el-form :model="storeData" label-width="100px">
                <el-form-item label="mid账号">
                    <el-input v-model="storeData.mid"></el-input>
                </el-form-item>
                <el-form-item label="企业名称">
                    <el-input v-model="storeData.company"></el-input>
                </el-form-item>
                <el-form-item label="店铺名称">
                    <el-input v-model="storeData.shopName"></el-input>
                </el-form-item>
                <el-form-item label="店铺状态">
                    <el-switch
                        v-model="storeData.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="Confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: ['visible', 'editId'],
        data() {
            return {
                storeData: {
                    mid: '',
                    company: '',
                    shopName: '',
                    status: true,
                }
            }
        },

        mounted() {
            if (this.editId) {
                this.getDetail(this.editId);
            }
        },

        methods: {
            //新增确认
            Confirm() {
                this.storeData.status = this.storeData.status ? '开店' : '关店';
                if (!this.editId) {
                    this.addStore(this.storeData);
                } else {
                    this.editStore(this.storeData);
                }
            },

            //新增
            addStore(params) {
                this.$http.post("/api/store", params).then(
                    function (response) {
                        if (response.ok) {
                            this.$message.success('添加成功');
                            this.onCancel();
                        }
                    },
                    function () {
                        this.$message.error('添加失败');
                    }
                );
            },

            //编辑
            editStore(params) {
                this.$http.put(`/api/store/${this.editId}`, params, {emulateJSON: true}).then(
                    function (response) {
                        if (response.ok) {
                            this.$message.success('修改成功');
                            this.onCancel();
                        }
                    },
                    function () {
                        this.$message.error('修改失败');
                    }
                );
            },

            //获取店铺详情
            getDetail(id) {
                this.$http.get(`/api/store/${id}`).then(
                    function (response) {
                        this.storeData.mid = response.body.mid;
                        this.storeData.company = response.body.company;
                        this.storeData.shopName = response.body.shopName;
                        this.storeData.status = response.body.status == '开店' ? true : false;
                    },
                    function () {
                        this.$message.error('详情获取失败');
                    }
                );
            },

            //取消
            onCancel() {
                this.$emit('cancel');
            },
        }
    }
</script>

<style>

</style>
