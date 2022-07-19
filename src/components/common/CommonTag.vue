<template>
  <div id="CommonTag">
    <el-tag 
    v-for="tag in tags" 
    :key="tag.name" 
    :closable="tag.name !== 'home'" 
    :effect="$route.path === tag.path ? 'dark' : 'plain'"
    @click="changeMenu(tag)"
    @close="handleClose(tag)">
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonTag",
  components: {},
  methods: {
      changeMenu(tag){
          this.$router.push(tag.name)
      },
      handleClose(tag){
        // console.log(tag);
        this.$store.state.tabList.splice(this.$store.state.tabList.indexOf(tag),1)
      }

  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabList,
    }),
  },
};
</script>

<style lang="less" scroped>
#CommonTag{
    padding:20px 20px 0;
    .el-tag{
        margin-right: 20px;
        cursor: pointer;
    }
}
</style>