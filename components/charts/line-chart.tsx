"use client";

import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";

interface LineChartProps {
  labels: string[];
  values: number[];
  height?: string | number;
  lineColor?: string;
  maxValue?: number;
  interval?: number;
}

function formatScaleValue(value: number) {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}

export function LineChart({
  labels,
  values,
  height = "clamp(26rem, 68vh, 44rem)",
  lineColor = "#5470c6",
  maxValue = 300,
  interval = 50,
}: LineChartProps) {
  const option: EChartsOption = {
    animationDuration: 700,
    backgroundColor: "#ffffff",
    aria: {
      enabled: true,
      description: "Gráfico de linha semanal",
    },
    grid: {
      left: 58,
      right: 38,
      top: 42,
      bottom: 44,
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      borderColor: "#d8dde8",
      textStyle: {
        color: "#4b5563",
      },
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "rgba(84, 112, 198, 0.25)",
        },
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: labels,
      axisLine: {
        lineStyle: {
          color: "#5d6470",
          width: 1,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#555b66",
        fontSize: 12,
        margin: 12,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: maxValue,
      interval,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#555b66",
        fontSize: 12,
        margin: 12,
        formatter: (value: number) => formatScaleValue(value),
      },
      splitLine: {
        lineStyle: {
          color: "#d9dee8",
          width: 1,
        },
      },
    },
    series: [
      {
        name: "Pontos concluídos",
        type: "line",
        data: values,
        smooth: false,
        symbol: "circle",
        symbolSize: 7,
        lineStyle: {
          color: lineColor,
          width: 2,
        },
        itemStyle: {
          color: "#ffffff",
          borderColor: lineColor,
          borderWidth: 2,
        },
        emphasis: {
          scale: 1.35,
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      notMerge
      lazyUpdate
      opts={{ renderer: "canvas" }}
      style={{ height, width: "100%" }}
    />
  );
}
