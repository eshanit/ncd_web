import useFacilityTableData from "../tables/useFacilityTableData";

type lineBarChartFacilityType = {
series?: [],
options?: {}
}

const lineBarChartFacility = (data: any) => {
  const facilityData = useFacilityTableData(data);

  const seriesData: {} = facilityData.then((resp) => {
    let seriesMentees: any[] = [];
    let seriesEvaluations: any[] = [];
    let seriesEMRatio: any[] = [];
    let dataLabels: any[] = [];

    resp.forEach((element: any) => {
      ///evals
      seriesEvaluations.push(element.evaluations);
      seriesMentees.push(element.mentees);
      seriesEMRatio.push((element.evaluations / element.mentees).toFixed(2));
      dataLabels.push(element.facility);
    });

    const options = {
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      //colors: ['#99C2A2', '#C5EDAC', '#66C7F4'],
      stroke: {
        width: [1, 1, 3],
      },
      plotOptions: {
        bar: {
          columnWidth: "20%",
        },
      },
      xaxis: {
        categories: dataLabels,
      },
      yaxis: [
        {
          seriesName: "Evaluations",
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
          },
          title: {
            text: "Columns (Mentees|Evaluations)",
          },
        },
        {
          opposite: true,
          seriesName: "Eval/Mentee",
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
          },
          title: {
            text: "Line (Eval/Mentee Ratio)",
          },
        },
      ],
      tooltip: {
        shared: false,
        intersect: true,
        x: {
          show: false,
        },
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 20,
      },
    };

    return {
      series: [
        {
          name: "Mentees",
          type: "column",
          data: seriesMentees,
        },
        {
          name: "Evaluations",
          type: "column",
          data: seriesEvaluations,
        },
        {
          name: "Eval/Mentee Ratio",
          type: "line",
          data: seriesEMRatio,
        },
      ],
      options: options,
    };
  });

  return  seriesData ;
};

export default lineBarChartFacility;
