const chartDataDistricts = async (data: any) => {
  return data.then((response: any) => {
    const state: any = response.state.value;

    var mentees: any[] = [];
    var evaluations: any[] = [];
    var districts: any[] = [];
    var menteeEvalRatio: any[] = [];

    state.forEach((el: any) => {
        mentees.push(el.mentees)
        evaluations.push(el.evaluations)
        districts.push(el.district)
        menteeEvalRatio.push((el.evaluations/el.mentees).toFixed(2))

    })

    const series = [
      {
        name: "Mentees",
        type: "column",
        data: mentees,
      },
      {
        name: "Evaluations",
        type: "line",
        data: evaluations,
      },
      {
        name: "Mentee/Evaluation Ratio",
        type: "line",
        data: menteeEvalRatio,
      },
    ];

    const labels = districts;

    //return mentees

    return {
      series: series,
      options: {
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          width: [0,3, 3],
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1,2],
        },
        labels: labels,
        xaxis: {
          type: "string",
        },
       yaxis: [
            {
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#008FFB'
              },
              labels: {
                style: {
                  colors: '#008FFB',
                }
              },
              title: {
                text: "Mentees (Count)",
                style: {
                  color: '#008FFB',
                }
              },
              tooltip: {
                enabled: true
              }
            },
            {
              seriesName: 'mentees',
              opposite: true,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#00E396'
              },
              labels: {
                style: {
                  colors: '#00E396',
                }
              },
              title: {
                text: "Evaluations (Count)",
                style: {
                  color: '#00E396',
                }
              },
            },
            {
              seriesName: 'evals',
              opposite: true,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#FEB019'
              },
              labels: {
                style: {
                  colors: '#FEB019',
                },
              },
              title: {
                text: "Mentee/Eval Ratio",
                style: {
                  color: '#FEB019',
                }
              }
            },
          ],
      },
    };
  });
};

export default chartDataDistricts;
