<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/">
      <el-button type="primary">首页</el-button>
    </router-link>
    <router-link to="/user">
      <el-button type="success">用户</el-button>
    </router-link>
    <el-button @click="open">Button</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
      <p>Try Element</p>
    </el-dialog>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      visible:false
    }
  },
  methods: {
    open(){
      this.visible = true
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
