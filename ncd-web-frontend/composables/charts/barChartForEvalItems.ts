const chartSeries = (data: any) => {
  const dataCounts = data.counts;

    const dataCountsZero = (counts: any) =>{

      if(counts == undefined){
        return 0
      }else {
        return counts
      }
    }

    const dataCountsLabeled = {
      "Not Applicable": dataCountsZero(dataCounts["0"]),
      "Poor": dataCountsZero(dataCounts["1"]),
      "Average": dataCountsZero(dataCounts["2"]),
      "Good": dataCountsZero(dataCounts["3"]),
    };

  return [
    {
      data: Object.values(dataCountsLabeled),
    },
  ];
};

const chartOptions = (data: any) => {
    const dataCounts = data.counts;

    const dataCountsZero = (counts: any) =>{

      if(counts !== undefined){
        return 0
      }else {
        return counts
      }
    }

    const dataCountsLabeled = {
      "Not Applicable": dataCountsZero(dataCounts["0"]),
      "Poor": dataCountsZero(dataCounts["1"]),
      "Average": dataCountsZero(dataCounts["2"]),
      "Good": dataCountsZero(dataCounts["3"]),
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