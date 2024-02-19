<template>
  <div>
    <v-form-render
      :form-json="formJson"
      :form-data="formData"
      :option-data="optionData"
      ref="vFormRef"
    >
    </v-form-render>
    <el-button type="primary" @click="submitForm">提交表单</el-button>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";

const vFormRef = ref(null);
const formJson = reactive({
  widgetList: [],
  formConfig: {
    modelName: "formData",
    refName: "vForm",
    rulesName: "rules",
    labelWidth: 80,
    labelPosition: "left",
    size: "",
    labelAlign: "label-left-align",
    cssCode: "",
    customClass: "",
    functions: "",
    layoutType: "PC",
    jsonVersion: 3,
    onFormCreated: "",
    onFormMounted: "",
    onFormDataChange: "",
    onFormValidate: "",
  },
});
const formData = reactive({});
const optionData = reactive({});

const submitForm = () => {
  vFormRef.value
    .getFormData()
    .then((formData) => {
      // Form Validation OK
      alert(JSON.stringify(formData));
    })
    .catch((error) => {
      // Form Validation failed
      ElMessage.error(error);
    });
};

onMounted(() => {
  //从后端接口获取表单的选项数据（如表单中无选项类型字段、则跳过此步骤），并赋值给optionData变量，需自行实现！！
  axios
    .get(SERVER_URL + "/get-option-data")
    .then((res) => {
      if (res.code == 200) {
        optionData = res.data;
      }

      //从后端接口获取已保存的数据对象（如只显示空白表单、则跳过此步骤），并赋值给formData变量，需自行实现！！
      axios
        .get(SERVER_URL + "/get-form-data")
        .then((res) => {
          let newFormData = null;
          if (res.code == 200) {
            newFormData = res.data;
          }

          //从后端接口获取表单json对象，然后调用v-form-render对象的setFormJson(xxx)加载表单，需自行实现！！
          axios
            .get(SERVER_URL + "/get-form-json")
            .then((res) => {
              if (res.code == 200) {
                vFormRef.value.setFormJson(res.data);
                nextTick(() => {
                  vFormRef.value.setFormData(newFormData);
                });
              }
            })
            .catch((err) => {
              //
            });
        })
        .catch((err) => {
          //
        });
    })
    .catch((err) => {
      //
    });
});
</script>

<style lang="scss" scoped></style>
