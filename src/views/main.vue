<template>
  <div id="mainVue">
    <el-container style="height: 100%">
      <el-aside width="auto">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <common-tag></common-tag>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/common/CommonAside";
import CommonHeader from "../components/common/CommonHeader";
import CommonTag from "../components/common/CommonTag"
export default {
  name: "mainVue",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  },
  
  methods: {
    
  },
  mounted() {},
};
</script>

<style lang="less" scroped>
.el-header {
  display: flex;
  align-items: center;
  background-color: #333;
}
.el-main{
  padding-top: 20px;
}
</style>