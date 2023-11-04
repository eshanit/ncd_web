const chartSeries = (data: any) => {
  const dataCounts = data.counts;

  const dataCountsLabeled = {
    "Not Applicable": dataCounts["0"],
    "Poor": dataCounts["1"],
    "Average": dataCounts["2"],
    "Good": dataCounts["3"],
  };

  return [
    {
      data: Object.values(dataCountsLabeled),
    },
  ];
};

const chartOptions = (data: any) => {
    const dataCounts = data.counts;

    const dataCountsLabeled = {
      "Not Applicable": dataCounts["0"],
      "Poor": dataCounts["1"],
      "Average": dataCounts["2"],
      "Good": dataCounts["3"],
    };

  return {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: Object.keys(dataCountsLabeled),
    },
  };
};


export default function barChartForEvalItems(){
    return {
        chartSeries,
        chartOptions
    }
}