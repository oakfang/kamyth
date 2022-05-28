import { useMemo } from "react";
import Chart from "react-apexcharts";

export function NPCAttributesChart({
  might,
  capacity,
  menace,
  width = "100%",
  labels = true,
}) {
  const id = useMemo(() => crypto.randomUUID(), []);
  const max = Math.max(might, capacity, menace);
  const options = useMemo(
    () => ({
      chart: {
        id,
        animations: {
          enabled: labels,
        },
        toolbar: {
          show: false,
        },
      },
      fill: {
        opacity: 0.8,
      },
      labels: ["Might", "Capacity", "Menace"],
      yaxis: [
        {
          tickAmount: max === 3 ? 2 : max,
        },
      ],
      dataLabels: {
        enabled: labels,
        style: {
          fontSize: "16px",
        },
        background: {
          enabled: labels,
          borderRadius: 5,
        },
        formatter(
          _,
          {
            seriesIndex,
            w: {
              config: { series, labels },
            },
          }
        ) {
          return `${labels[seriesIndex]}: ${series[seriesIndex]}`;
        },
      },
      tooltip: {
        enabled: false,
      },
      legend: {
        show: false,
      },
    }),
    [id, max, labels]
  );
  const series = useMemo(
    () => [might, capacity, menace],
    [might, capacity, menace]
  );

  return (
    <Chart options={options} series={series} type="polarArea" width={width} />
  );
}

export function AttributesChart({
  body = 0,
  mind = 0,
  soul = 0,
  health = 0,
  power = 0,
  width = "100%",
  labels = true,
}) {
  const id = useMemo(() => crypto.randomUUID(), []);
  const max = Math.max(body, mind, soul, health, power);
  const options = useMemo(
    () => ({
      chart: {
        id,
        animations: {
          enabled: labels,
        },
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["Body", "Mind", "Power", "Health", "Soul"],
        labels: {
          show: labels,
          style: {
            colors: ["#a8a8a8"],
            fontSize: "20px",
          },
        },
      },
      yaxis: {
        max,
        tickAmount: max,
        labels: {
          style: {
            colors: Array.from({ length: max + 1 }, () => "transparent"),
          },
        },
      },
      dataLabels: {
        enabled: labels,
        background: {
          enabled: labels,
          borderRadius: 5,
        },
      },
      tooltip: {
        enabled: false,
      },
      legend: {
        show: false,
      },
    }),
    [id, max, labels]
  );
  const series = useMemo(
    () => [
      {
        name: "main-attributes",
        data: [body, mind, 0, 0, soul],
      },
      {
        name: "sub-attributes",
        data: [0, 0, power, health, 0],
      },
    ],
    [body, mind, soul, health, power, id]
  );

  return <Chart options={options} series={series} type="radar" width={width} />;
}
