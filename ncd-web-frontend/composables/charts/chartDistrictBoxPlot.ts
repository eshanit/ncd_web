import { median, mean, mode, max } from "simple-statistics";
import { flatMap, groupBy, sortBy } from "lodash";

const chartDistrictBoxPlot = async (data: any) => {
  return data.then((response: any) => {
    const state: any = response.state.value;

    const districts: any[] = Object.keys(state);
    const districtEvals: any[] = Object.values(state);

    let vmDistrictEvalCounts: any[] = [];

    for (var i = 0; i < districtEvals.length; i++) {
      vmDistrictEvalCounts.push(districtEvals[i]);
    }
    const distScores: any[] = [];

    districtEvals.forEach((element: any) => {
      element.forEach((el: any) => {
        distScores.push({
          district: el.district,
          percPerf: el.scoreStats.percTotal,
        });
      });
    });

    const districtScoresGrouped = Object.values(
      groupBy(distScores, "district")
    );

    const flatMapDistPerf: any[] = [];

    for (var i = 0; i < districtScoresGrouped.length; i++) {
      flatMapDistPerf.push(
        districtScoresGrouped[i].flatMap((el) => parseInt(el.percPerf))
      );
    }

    let series: any[] = [];

    for (var i = 0; i < districtScoresGrouped.length; i++) {
      series.push({
        x: districts[i],
        y: sortBy(flatMapDistPerf[i]),
      });
    }

    return {
      series: [
        {
          type: "boxPlot",
          data: series,
        },
      ],
      options: {
        chart: {
          type: "boxPlot",
          height: 350,
        },
        // title: {
        //   text: "Basic BoxPlot Chart",
        //   align: "left",
        // },
        plotOptions: {
          boxPlot: {
            colors: {
              upper: "#004c4c",
              lower: "#66b2b2",
            },
          },
        },
      },
    };
  });
};
//boxplot

export default chartDistrictBoxPlot;
