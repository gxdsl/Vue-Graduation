<template>
  <div class="container">
    <!--    最新设备状态、水质、水温-->
    <div class="flex-container">
      <div class="component-container">
        <div class="title-large">设 备 状 态</div>
        <div class="value-large">{{ responseData.Status }}</div>
      </div>
      <div class="component-container">
        <div class="title-large">最 新 水 温</div>
        <div class="value-large">{{ responseData.Temperature + '℃' }}</div>
      </div>
      <div class="component-container">
        <div class="title-large">最 新 水  质</div>
        <div class="value-large">{{ responseData.TDS + 'mg/L' }}</div>
      </div>
    </div>
  </div>

  <div class="title-chart">水温与水质数据折线图</div>
  <!--  折线图-->
  <div>
    <div class="chart-container">
      <div id="temperatureChart" style="width: 50%; height: 600px;"></div>
      <div id="tdsChart" style="width: 50%; height: 600px;"></div>
    </div>
  </div>
</template>

<script>
import { EquipAPI } from '@/API/equip.js';
import * as echarts from 'echarts';

export default {
  data() {
    return {
      responseData: {
        Status: null,
        Temperature: null,
        TDS: null
      },
      timer: null,
      temperatureChart: null,
      tdsChart: null,
      chartData: [] // 用于存储从 API 获取的数据列表
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.startTimer();
      this.initCharts();
      this.getChartData(); // 加载折线图数据
    });
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.updateData();
      }, 1000); // 每秒调用一次
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    async updateData() {
      const data = await EquipAPI.Latest(); // 从 API 获取最新的设备状态、水质、水温
      if (data) {
        this.responseData.Status = data.Status;
        this.responseData.Temperature = data.Temperature;
        this.responseData.TDS = data.TDS;
      }
    },
    async getChartData() {
      const data = await EquipAPI.Chart(); // 从 API 获取数据列表
      if (data) {
        this.chartData = data; // 存储数据列表到 chartData
        this.updateCharts();
      }
    },
    initCharts() {
      this.temperatureChart = echarts.init(document.getElementById('temperatureChart'));
      this.tdsChart = echarts.init(document.getElementById('tdsChart'));
    },
    updateCharts() {
      const dates = this.chartData.map(item => item.RecordTime); // 提取日期作为 x 轴数据
      const temperatures = this.chartData.map(item => item.Temperature); // 提取温度数据
      const tdsValues = this.chartData.map(item => item.TDS); // 提取 TDS 数据

      // 格式化日期，只显示小时和分钟
      const formattedDates = dates.map(date => {
        const newDate = new Date(date);
        return `${newDate.getHours()}:${newDate.getMinutes().toString().padStart(2, '0')}`;
      });

      this.temperatureChart.setOption({
        xAxis: {
          type: 'category',
          data: formattedDates
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis', // 鼠标悬停在折线图上的点时触发
          axisPointer: {
            type: 'cross' // 显示十字准星指示器
          },
          formatter: '{a}<br />{b}: {c}℃' // 显示系列名称和温度值
        },
        series: [{
          data: temperatures,
          type: 'line'
        }]
      });

      this.tdsChart.setOption({
        xAxis: {
          type: 'category',
          data: formattedDates
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis', // 鼠标悬停在折线图上的点时触发
          axisPointer: {
            type: 'cross' // 显示十字准星指示器
          },
          formatter: '{a}<br />{b}: {c}mg/L' // 显示系列名称和 TDS 值
        },
        series: [{
          data: tdsValues,
          type: 'line'
        }]
      });
    }
  },
  beforeUnmount() {
    this.stopTimer();
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.flex-container {
  display: flex;
}

.component-container {
  flex: 1;
  width: 30%;
  padding: 20px;
  border: 4px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-top: 35px;
  margin-left: 100px;
}

.title-large {
  font-size: 26px;
  color: #007bff;
  text-align: center;
}

.title-chart {
  margin-top: 50px;
  font-size: 28px;
  text-align: center;
  color: #007bff;
}

.value-large {
  margin-top: 8px;
  font-size: 24px;
  text-align: center;
}

.chart-container {
  display: flex;
  margin-top: 10px;
  border: 4px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 100px;
}
</style>
