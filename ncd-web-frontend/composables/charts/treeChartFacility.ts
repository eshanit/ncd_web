import useFacilityTableData from "../tables/useFacilityTableData";

const seriesChartData = (data: any) => {
  const facilityData = useFacilityTableData(data);

  const seriesData :{} = facilityData.then((resp) => {

    //name: 'Column A'
    //type: 'column'
    //data: [10,20,30,40,50]

    let seriesDatax: any[] = [];
    let seriesDatay: any[] = [];
    resp.forEach((element: any) => {
      seriesDatax.push({
        name: element.facility,
        type: element.mentees,
        
      });
      ///evals
      seriesDatay.push({
        x: element.facility,
        y: element.evaluations,
      });
    });

    return {
      mentees: [{ data: seriesDatax }],
      evaluations: [{ data: seriesDatay }],
    };
    
  });

  return seriesData
};

const options = {
    legend: {
      show: false,
    },
    chart: {
      height: 350,
      type: "treemap",
    },
    // title: {
    //   text: "Distibuted Treemap (different color for each cell)",
    //   align: "center",
    // },
    colors: [
      "#ff80ed",
      "#065535",
      "#000000",
      "#133337",
      "#ffc0cb",
      "#008080",
      "#ff0000",
      "#ffd700",
      "#00ffff",
      "#ffa500",
      "#0000ff",
      "#c6e2ff",
    ],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
  };

export default function treeChartFacility(){
    return {
        seriesChartData,
        options
    }
};
