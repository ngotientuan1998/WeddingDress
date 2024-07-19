import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BarChart} from 'react-native-charts-wrapper';
import moment from 'moment';

const StatisticalScreen = () => {
  const link_api = 'http://192.168.1.98:3000/';
  const [dataBill, setDataBill] = useState([]);
  const [chartData, setChartData] = useState({dataSets: [{label: '', values: []}]});
  const [monthlyLabels, setMonthlyLabels] = useState([]);


  const getDataBill = async () => {
    try {
      const res = await fetch(link_api + 'Bill/list');
      const result = await res.json();
      setDataBill(result);
    } catch (error) {
      console.log("lấy dữ liệu bill màn thống kê: " + error);
    }
  };

  useEffect(() => {
    getDataBill();
  }, []);

  useEffect(() => {
    if (dataBill.length > 0) {
      const monthlyData = dataBill.reduce((acc, bill) => {
        const month = moment(bill.dateBuy).format('YYYY-MM');
        if (!acc[month]) acc[month] = 0;
        acc[month] += bill.totalAmout;
        return acc;
      }, {});

      const values = Object.keys(monthlyData).map((month, index) => ({
        y: monthlyData[month],
        x: index + 1, 
      }));

      setChartData({
        dataSets: [{label: 'Tổng số tiền dịch vụ', values}],
        config: {
          barWidth: 0.7
        }
      });
      setMonthlyLabels(Object.keys(monthlyData));

    }
  }, [dataBill]);

  return (
    <View style={styles.container}>
      <BarChart
        style={styles.chart}
        data={chartData}
        xAxis={{
          valueFormatter: Object.keys(monthlyLabels),
          granularityEnabled: true,
          granularity: 1,
        }}
        yAxis={{left: {axisMinimum: 0}}}
        chartDescription={{text: 'Tổng số tiền theo tháng'}}
        legend={{enabled: true}}
      />
    </View>
  );
};

export default StatisticalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});
