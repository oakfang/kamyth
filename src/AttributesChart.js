import { useMemo } from "react";
import Chart from "react-apexcharts";

export function AttributesChart({
  body = 0,
  mind = 0,
  soul = 0,
  health = 0,
  power = 0,
  width = "100%",
}) {
  const id = useMemo(() => crypto.randomUUID(), []);
  const max = Math.max(body, mind, soul, health, power);
  const options = useMemo(
    () => ({
      chart: {
        id,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["Body", "Mind", "Power", "Health", "Soul"],
        labels: {
          show: true,
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
          style: { colors: Array.from({ length: max + 1 }, () => "transparent") },
        },
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
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
    [id, max]
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
