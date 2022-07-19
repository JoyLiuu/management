<template>
  <div id="CommonHeader">
    <el-button icon="el-icon-menu" size="mini" @click="foldMenu"> </el-button>
    <!-- <el-link
            :underline="false"
            style="color: #fff; margin-left: 20px; font-size: 12px"
            >首页</el-link
          > -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="item in tags"
        :key="item.path"
        :to="{ path: item.path }"
        >{{ item.label }}</el-breadcrumb-item
      >
    </el-breadcrumb>

    <el-dropdown>
      <span class="el-dropdown-link">
        <img :src="userImg" alt="" style="width: 20px" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonHeader",
  components: {},
  data() {
    return {
      userImg: require("../../assets/logo.png"),
    };
  },
  methods: {
    foldMenu() {
      this.$store.commit("handleMenu");
    },
    logOut(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push("/login/")
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
};
</script>

<style>
#CommonHeader {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown {
  position: absolute;
  right: 0;
}
.el-breadcrumb__inner.is-link {
  color: #fff;
  margin-left: 20px;
}
</style>