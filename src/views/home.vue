<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card>
        <div slot="header" class="user clearfix" shadow="hover">
          <img :src="userImg" style="width: 48px" />
          <div style="float: right; padding: 3px 10px">
            <p>Admin</p>
            <span style="font-size: 12px">超级管理员</span>
          </div>
        </div>

        <div class="login" style="font-size: 12px">
          <p>上次登录时间 : <span> 2020/6/1</span></p>
          <p>上次登录地点 : <span> 重庆</span></p>
        </div>
      </el-card>

      <el-card style="margin-top: 20px; font-size: 12px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16">
      <el-row>
        <el-col
          :span="8"
          :gutter="20"
          v-for="item in countData"
          :key="item.name"
        >
          <el-card :body-style="cardStyle">
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{
                background: item.color,
                marginRight: '10px',
                textAlign: 'center',
              }"
            ></i>
            <div class="detail">
              <p class="num">￥{{ item.value }}</p>
              <p style="font-size: 12px; color: '#999'">{{ item.name }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-card style="height: 260px; margin-top: 20px">
        <div
          style="height: 240px; width: 530px; margin: 0 auto"
          ref="echarts"
        ></div>
      </el-card>

      <el-row
        class="graph"
        style="height: 260px; margin-top: 20px"
        :gutter="20"
      >
        <el-col :span="12"
          ><el-card style="height: 260px">
            <div style="height: 240px; width:280px;margin: 0 auto" ref="userEcharts"></div></el-card
        ></el-col>
        <el-col :span="12"
          ><el-card style="height: 260px">
            <div style="height: 240px;width:280px; margin: 0 auto" ref="videoEcharts"></div></el-card
        ></el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../network/home.js";
import * as echarts from "echarts";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      userImg: require("../assets/logo.png"),
      tableData: [
        {
          name: "oppo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "vivo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "iPhone",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "HUAWEI",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "MEIZU",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "galaxy",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 132,
          icon: "s-goods",
          color: "#ffb980",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 132,
          icon: "s-goods",
          color: "#ffb980",
        },
      ],
      cardStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "20px",
        padding: 0,
      },
    };
  },
  methods: {},
  created() {},
  mounted() {
    getData().then((res) => {
      // console.log(res);
      const { code, data } = res.data;
      if (code === 20000) {
        // 折线图的数据
        const order = data.orderData;
        // x轴的数据
        const xData = order.date;
        // 折线的数据 将返回对象的keys组成数组
        const keyArray = Object.keys(order.data[0]);
        const series = [];

        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        // 制作echarts图表---折线图
        const option = {
          xAxis: {
            data: xData,
          },
          yAxis: {},
          legend: {
            data: keyArray,
          },
          tooltip: {
            trigger: "axis",
          },
          series,
        };
        const E = echarts.init(this.$refs.echarts);
        E.setOption(option);
        // 柱状图
        const userOption = {
          // 提示框
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          // 网格
          grid: {
            left: "20%",
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar", "stack"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          xAxis: [
            {
              type: "category",
              axisTick: { show: false },
              data: data.userData.map((item) => item.date),
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
              axisLabel: {
                interval: 0,
                color: "#333",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              type: "bar",
              data: data.userData.map((item) => item.new),
            },
            {
              name: "活跃用户",
              type: "bar",
              data: data.userData.map((item) => item.active),
            },
          ],
        };
        const U = echarts.init(this.$refs.userEcharts);
        U.setOption(userOption);
        // 饼图
        const videoOption = {
          title: {
            text: "Referer of a Website",
            // subtext: "Fake Data",
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          // 说明、图例
          // legend: {
          //   orient: "vertical",
          //   left: "left",
          // },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: "50%",
              data: data.videoData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        const V = echarts.init(this.$refs.videoEcharts);
        V.setOption(videoOption)
      }
    });
  },
};
</script>

<style lang="less" scroped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.user {
  display: flex;
  align-items: center;
}
.body-style {
  flex-direction: row;
}
.detail {
  flex: 5;
}

.icon {
  flex: 4;
  text-align: center;
  line-height: 68px;
}
</style>