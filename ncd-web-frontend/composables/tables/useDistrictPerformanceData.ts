import { median, mean, mode } from "simple-statistics";
import { flatMap, groupBy, uniqBy } from "lodash";

const useDistrictPerformanceData = async (data: any) => {
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
          scores: el.scores.map((ef: []) => {
            return Object.values(ef).map((ele: string) => parseInt(ele));
          }),
          percPerf: el.scoreStats.percTotal
        });
      });
    });

    // means

  

    const districtScoresGrouped = Object.values(
      groupBy(distScores, "district")
    )

    const flatMapDistScores: any[] = [];

    for(var i = 0; i < districtScoresGrouped .length; i++) {
      flatMapDistScores.push(districtScoresGrouped[i].flatMap((el)=>el.scores));
    }

    const flatScores =flatMapDistScores.map((el)=>el.flat(1));

    const meanScores = flatScores.map((el)=>mean(el))

    //boxplot
    const flatMapDistPerf: any[] =[]

    for(var i = 0; i < districtScoresGrouped .length; i++) {
      flatMapDistPerf.push(districtScoresGrouped[i].flatMap((el)=>el.percPerf));
    }

    return flatMapDistPerf

  });
};

export default useDistrictPerformanceData;
