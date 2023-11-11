import { countBy } from "lodash";
import { mode, mean, median } from "simple-statistics";

const chartSegmentFacility = async (data: any) => {
  return data.then((response: any) => {
    const state: any = response.state.value;

    const scoresData = state.map((el: any) => el.scores);

    let iieKnowledge: any[] = [];
    let iieAcquiredSkill: any[] = [];
    let iieBehaviour: any[] = [];

    let mngtKnowledge: any[] = [];
    let mngtAcquiredSkill: any[] = [];
    let mngtBehaviour: any[] = [];

    scoresData.forEach((score: any) => {
      //iie

      iieKnowledge.push([
        parseInt(score[0].dmQ1),
        parseInt(score[0].dmQ2),
        parseInt(score[0].dmQ3),
        parseInt(score[0].dmQ4),
        parseInt(score[0].dmQ5),
        parseInt(score[0].dmQ6),
        parseInt(score[0].dmQ7),
      ]);

      iieAcquiredSkill.push([
        parseInt(score[0].dmQ8),
        parseInt(score[0].dmQ9),
        parseInt(score[0].dmQ10),
      ]);

      iieBehaviour.push([
        parseInt(score[0].dmQ11),
        parseInt(score[0].dmQ12),
        parseInt(score[0].dmQ13),
      ]);

      //management of dm

      mngtKnowledge.push([
        parseInt(score[0].dmQ14),
        parseInt(score[0].dmQ15),
        parseInt(score[0].dmQ16),
        parseInt(score[0].dmQ17),
        parseInt(score[0].dmQ18),
        parseInt(score[0].dmQ19),
        //parseInt(score[0].dmQ20),
        parseInt(score[0].dmQ21),
        parseInt(score[0].dmQ22),
      ]);

      mngtAcquiredSkill.push([
        parseInt(score[0].dmQ23),
        parseInt(score[0].dmQ24),
        parseInt(score[0].dmQ25),
        parseInt(score[0].dmQ26),
        parseInt(score[0].dmQ27),
        parseInt(score[0].dmQ28),
      ]);

      mngtBehaviour.push([parseInt(score[0].dmQ29)]);
    });

    const iieknowledgeArr = iieKnowledge.flat();
    const iieAcquiredSkillArr = iieAcquiredSkill.flat();
    const iieBehaviourArr = iieBehaviour.flat();
    const mngtknowledgeArr = mngtKnowledge.flat();
    const mngtAcquiredSkillArr = mngtAcquiredSkill.flat();
    const mngtBehaviourArr = mngtBehaviour.flat();

    const countScoreIIEKnowledge = countBy(iieknowledgeArr);
    const countScoreIIEAcquiredSkill = countBy(iieAcquiredSkillArr);
    const countScoreIIEBehaviour = countBy(iieBehaviourArr);
    const countScoreMngtKnowledge = countBy(mngtknowledgeArr);
    const countScoreMngtAcquiredSkill = countBy(mngtAcquiredSkillArr);
    const countScoreMngtBehaviour = countBy(mngtBehaviourArr);

    for (var i = 0; i < 4; i++) {
      if (countScoreIIEKnowledge.hasOwnProperty(i)) {
        true;
      } else {
        countScoreIIEKnowledge[i] = 0;
      }
    }

    for (var i = 0; i < 4; i++) {
      if (countScoreIIEAcquiredSkill.hasOwnProperty(i)) {
        true;
      } else {
        countScoreIIEAcquiredSkill[i] = 0;
      }
    }

    for (var i = 0; i < 4; i++) {
      if (countScoreIIEBehaviour.hasOwnProperty(i)) {
        true;
      } else {
        countScoreIIEBehaviour[i] = 0;
      }
    }

    for (var i = 0; i < 4; i++) {
      if (countScoreMngtKnowledge.hasOwnProperty(i)) {
        true;
      } else {
        countScoreMngtKnowledge[i] = 0;
      }
    }

    for (var i = 0; i < 4; i++) {
      if (countScoreMngtAcquiredSkill.hasOwnProperty(i)) {
        true;
      } else {
        countScoreMngtAcquiredSkill[i] = 0;
      }
    }

    for (var i = 0; i < 4; i++) {
      if (countScoreMngtBehaviour.hasOwnProperty(i)) {
        true;
      } else {
        countScoreMngtBehaviour[i] = 0;
      }
    }

    return {
      test: mean(iieknowledgeArr),
      pie: {
        raw: {
          iieknowledge: countScoreIIEKnowledge,
          iieacquiredskill: countScoreIIEAcquiredSkill,
          iiebehaviour: countScoreIIEBehaviour,
          mngtknowledge: countScoreMngtKnowledge,
          mngtacquiredskill: countScoreMngtAcquiredSkill,
          mngtbehaviour: countScoreMngtBehaviour,
        },
        values: {
          iieknowledge: Object.values(countScoreIIEKnowledge),
          iieacquiredskill: Object.values(countScoreIIEAcquiredSkill),
          iiebehaviour: Object.values(countScoreIIEBehaviour),
          mngtknowledge: Object.values(countScoreMngtKnowledge),
          mngtacquiredskill: Object.values(countScoreMngtAcquiredSkill),
          mngtbehaviour: Object.values(countScoreMngtBehaviour),
        },
        keys: {
          iieknowledge: Object.keys(countScoreIIEKnowledge).map((el) => {
            let codes: any[] = [];
            for (let i = 0; i < el.length; i++)
              if (el[i] == "0") {
                codes[i] = "0 - Not Applicable";
              } else if (el[i] == "1") {
                codes[i] = "1 - Poor";
              } else if (el[i] == "2") {
                codes[i] = "2 - Moderate";
              } else {
                codes[i] = "3 - Competent";
              }

            return codes[0];
          }),
          iieacquiredskill: Object.keys(countScoreIIEAcquiredSkill).map(
            (el) => {
              let codes: any[] = [];
              for (let i = 0; i < el.length; i++)
                if (el[i] == "0") {
                  codes[i] = "0 - Not Applicable";
                } else if (el[i] == "1") {
                  codes[i] = "1 - Poor";
                } else if (el[i] == "2") {
                  codes[i] = "2 - Moderate";
                } else {
                  codes[i] = "3 - Competent";
                }

              return codes[0];
            }
          ),
          iiebehaviour: Object.keys(countScoreIIEBehaviour).map((el) => {
            let codes: any[] = [];
            for (let i = 0; i < el.length; i++)
              if (el[i] == "0") {
                codes[i] = "0 - Not Applicable";
              } else if (el[i] == "1") {
                codes[i] = "1 - Poor";
              } else if (el[i] == "2") {
                codes[i] = "2 - Moderate";
              } else {
                codes[i] = "3 - Competent";
              }

            return codes[0];
          }),
          mngtknowledge: Object.keys(countScoreMngtKnowledge).map((el) => {
            let codes: any[] = [];
            for (let i = 0; i < el.length; i++)
              if (el[i] == "0") {
                codes[i] = "0 - Not Applicable";
              } else if (el[i] == "1") {
                codes[i] = "1 - Poor";
              } else if (el[i] == "2") {
                codes[i] = "2 - Moderate";
              } else {
                codes[i] = "3 - Competent";
              }

            return codes[0];
          }),
          mngtacquiredskill: Object.keys(countScoreMngtAcquiredSkill).map(
            (el) => {
              let codes: any[] = [];
              for (let i = 0; i < el.length; i++)
                if (el[i] == "0") {
                  codes[i] = "0 - Not Applicable";
                } else if (el[i] == "1") {
                  codes[i] = "1 - Poor";
                } else if (el[i] == "2") {
                  codes[i] = "2 - Moderate";
                } else {
                  codes[i] = "3 - Competent";
                }

              return codes[0];
            }
          ),
          mngtbehaviour: Object.keys(countScoreMngtBehaviour).map((el) => {
            let codes: any[] = [];
            for (let i = 0; i < el.length; i++)
              if (el[i] == "0") {
                codes[i] = "0 - Not Applicable";
              } else if (el[i] == "1") {
                codes[i] = "1 - Poor";
              } else if (el[i] == "2") {
                codes[i] = "2 - Moderate";
              } else {
                codes[i] = "3 - Competent";
              }

            return codes[0];
          }),
        },
      },
      lineColumn: {
        seriesiiEKnowledge: [
          {
            name: "Scores",
            type: "column",
            data: Object.values(countScoreIIEKnowledge),
          },
        ],
        seriesiieAcquiredSkill: [
          {
            name: "Scores",
            type: "column",
            data: Object.values(countScoreIIEAcquiredSkill),
          },
        ],
        seriesiieBehaviour: [
          {
            name: "Scores",
            type: "column",
            data: Object.values(countScoreIIEBehaviour),
          },
        ],
        seriesmngtKnowledge: [
          {
            name: "Scores",
            type: "column",
            data: Object.values(countScoreMngtKnowledge),
          },
        ],
        seriesmngtAcquiredSkill: [
          {
            name: "Scores",
            type: "column",
            data: Object.values(countScoreMngtAcquiredSkill),
          },
        ],
        seriesmngtBehaviour: [
          {
            name: "Scores",
            type: "column",
            data: Object.values(countScoreMngtBehaviour),
          },
        ],
        optionsiieKnowledge: {
          chart: {
            height: 350,
            type: "line",
            stacked: false,
          },
          annotations: {
            xaxis: [
              {
                x: Math.round(mean(iieknowledgeArr)),
                strokeDashArray: 0,
                borderColor: "red",
                label: {
                  borderColor: "red",
                  style: {
                    color: "#fff",
                    background: "red",
                  },
                  text: "Mean Score" + `(${mean(iieknowledgeArr).toFixed(2)})`,
                },
              },
              {
                x: mode(iieknowledgeArr),
                strokeDashArray: 0,
                borderColor: "orange",
                label: {
                  borderColor: "orange",
                  style: {
                    color: "#fff",
                    background: "orange",
                  },
                  text: "Mode Score" + `(${mode(iieknowledgeArr)})`,
                },
              },
              {
                x: median(iieknowledgeArr),
                strokeDashArray: 0,
                borderColor: "green",
                label: {
                  borderColor: "green",
                  style: {
                    color: "#fff",
                    background: "green",
                  },
                  text: "Median Score" + `(${median(iieknowledgeArr)})`,
                },
              },
            ],
          },
          stroke: {
            width: [0, 2, 5],
            curve: "smooth",
          },
          plotOptions: {
            bar: {
              columnWidth: "100%",
            },
          },

          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: "light",
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100],
            },
          },
          labels: [0, 1, 2, 3],
          markers: {
            size: 0,
          },
          xaxis: {
            type: "string",
          },
          yaxis: {
            title: {
              text: "Count Scores",
            },
            decimalsInFloat: 0,
            min: 0,
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y: any) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0);
                }
                return y;
              },
            },
          },
        },
        optionsiieAcquiredSkill: {
          chart: {
            height: 350,
            type: "line",
            stacked: false,
          },
          annotations: {
            xaxis: [
              {
                x: Math.round(mean(iieAcquiredSkillArr)),
                strokeDashArray: 0,
                borderColor: "red",
                label: {
                  borderColor: "red",
                  style: {
                    color: "#fff",
                    background: "red",
                  },
                  text:
                    "Mean Score" + `(${mean(iieAcquiredSkillArr).toFixed(2)})`,
                },
              },
              {
                x: mode(iieAcquiredSkillArr),
                strokeDashArray: 0,
                borderColor: "orange",
                label: {
                  borderColor: "orange",
                  style: {
                    color: "#fff",
                    background: "orange",
                  },
                  text: "Mode Score" + `(${mode(iieAcquiredSkillArr)})`,
                },
              },
              {
                x: median(iieAcquiredSkillArr),
                strokeDashArray: 0,
                borderColor: "green",
                label: {
                  borderColor: "green",
                  style: {
                    color: "#fff",
                    background: "green",
                  },
                  text: "Median Score" + `(${median(iieAcquiredSkillArr)})`,
                },
              },
            ],
          },
          stroke: {
            width: [0, 2, 5],
            curve: "smooth",
          },
          plotOptions: {
            bar: {
              columnWidth: "100%",
            },
          },

          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: "light",
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100],
            },
          },
          labels: [0, 1, 2, 3],
          markers: {
            size: 0,
          },
          xaxis: {
            type: "string",
          },
          yaxis: {
            title: {
              text: "Count Scores",
            },
            decimalsInFloat: 0,
            min: 0,
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y: any) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0);
                }
                return y;
              },
            },
          },
        },
        optionsiieBehaviour: {
          chart: {
            height: 350,
            type: "line",
            stacked: false,
          },
          annotations: {
            xaxis: [
              {
                x: Math.round(mean(iieBehaviourArr)),
                strokeDashArray: 0,
                borderColor: "red",
                label: {
                  borderColor: "red",
                  style: {
                    color: "#fff",
                    background: "red",
                  },
                  text: "Mean Score" + `(${mean(iieBehaviourArr).toFixed(2)})`,
                },
              },
              {
                x: mode(iieBehaviourArr),
                strokeDashArray: 0,
                borderColor: "orange",
                label: {
                  borderColor: "orange",
                  style: {
                    color: "#fff",
                    background: "orange",
                  },
                  text: "Mode Score" + `(${mode(iieBehaviourArr)})`,
                },
              },
              {
                x: median(iieknowledgeArr),
                strokeDashArray: 0,
                borderColor: "green",
                label: {
                  borderColor: "green",
                  style: {
                    color: "#fff",
                    background: "green",
                  },
                  text: "Median Score" + `(${median(iieBehaviourArr)})`,
                },
              },
            ],
          },
          stroke: {
            width: [0, 2, 5],
            curve: "smooth",
          },
          plotOptions: {
            bar: {
              columnWidth: "100%",
            },
          },

          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: "light",
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100],
            },
          },
          labels: [0, 1, 2, 3],
          markers: {
            size: 0,
          },
          xaxis: {
            type: "string",
          },
          yaxis: {
            title: {
              text: "Count Scores",
            },
            decimalsInFloat: 0,
            min: 0,
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y: any) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0);
                }
                return y;
              },
            },
          },
        },
        optionsmngtKnowledge: {
          chart: {
            height: 350,
            type: "line",
            stacked: false,
          },
          annotations: {
            xaxis: [
              {
                x: Math.round(mean(mngtknowledgeArr)),
                strokeDashArray: 0,
                borderColor: "red",
                label: {
                  borderColor: "red",
                  style: {
                    color: "#fff",
                    background: "red",
                  },
                  text: "Mean Score" + `(${mean(mngtknowledgeArr).toFixed(2)})`,
                },
              },
              {
                x: mode(mngtknowledgeArr),
                strokeDashArray: 0,
                borderColor: "orange",
                label: {
                  borderColor: "orange",
                  style: {
                    color: "#fff",
                    background: "orange",
                  },
                  text: "Mode Score" + `(${mode(mngtknowledgeArr)})`,
                },
              },
              {
                x: median(mngtknowledgeArr),
                strokeDashArray: 0,
                borderColor: "green",
                label: {
                  borderColor: "green",
                  style: {
                    color: "#fff",
                    background: "green",
                  },
                  text: "Median Score" + `(${median(mngtknowledgeArr)})`,
                },
              },
            ],
          },
          stroke: {
            width: [0, 2, 5],
            curve: "smooth",
          },
          plotOptions: {
            bar: {
              columnWidth: "100%",
            },
          },

          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: "light",
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100],
            },
          },
          labels: [0, 1, 2, 3],
          markers: {
            size: 0,
          },
          xaxis: {
            type: "string",
          },
          yaxis: {
            title: {
              text: "Count Scores",
            },
            decimalsInFloat: 0,
            min: 0,
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y: any) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0);
                }
                return y;
              },
            },
          },
        },
        optionsmngtAcquiredSkill: {
          chart: {
            height: 350,
            type: "line",
            stacked: false,
          },
          annotations: {
            xaxis: [
              {
                x: Math.round(mean(mngtAcquiredSkillArr)),
                strokeDashArray: 0,
                borderColor: "red",
                label: {
                  borderColor: "red",
                  style: {
                    color: "#fff",
                    background: "red",
                  },
                  text:
                    "Mean Score" + `(${mean(mngtAcquiredSkillArr).toFixed(2)})`,
                },
              },
              {
                x: mode(mngtAcquiredSkillArr),
                strokeDashArray: 0,
                borderColor: "orange",
                label: {
                  borderColor: "orange",
                  style: {
                    color: "#fff",
                    background: "orange",
                  },
                  text: "Mode Score" + `(${mode(mngtAcquiredSkillArr)})`,
                },
              },
              {
                x: median(mngtAcquiredSkillArr),
                strokeDashArray: 0,
                borderColor: "green",
                label: {
                  borderColor: "green",
                  style: {
                    color: "#fff",
                    background: "green",
                  },
                  text: "Median Score" + `(${median(mngtAcquiredSkillArr)})`,
                },
              },
            ],
          },
          stroke: {
            width: [0, 2, 5],
            curve: "smooth",
          },
          plotOptions: {
            bar: {
              columnWidth: "100%",
            },
          },

          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: "light",
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100],
            },
          },
          labels: [0, 1, 2, 3],
          markers: {
            size: 0,
          },
          xaxis: {
            type: "string",
          },
          yaxis: {
            title: {
              text: "Count Scores",
            },
            decimalsInFloat: 0,
            min: 0,
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y: any) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0);
                }
                return y;
              },
            },
          },
        },
        optionsmngtBehaviour: {
          chart: {
            height: 350,
            type: "line",
            stacked: false,
          },
          annotations: {
            xaxis: [
              {
                x: Math.round(mean(mngtBehaviourArr)),
                strokeDashArray: 0,
                borderColor: "red",
                label: {
                  borderColor: "red",
                  style: {
                    color: "#fff",
                    background: "red",
                  },
                  text: "Mean Score" + `(${mean(mngtBehaviourArr).toFixed(2)})`,
                },
              },
              {
                x: mode(mngtBehaviourArr),
                strokeDashArray: 0,
                borderColor: "orange",
                label: {
                  borderColor: "orange",
                  style: {
                    color: "#fff",
                    background: "orange",
                  },
                  text: "Mode Score" + `(${mode(mngtBehaviourArr)})`,
                },
              },
              {
                x: median(mngtBehaviourArr),
                strokeDashArray: 0,
                borderColor: "green",
                label: {
                  borderColor: "green",
                  style: {
                    color: "#fff",
                    background: "green",
                  },
                  text: "Median Score" + `(${median(mngtBehaviourArr)})`,
                },
              },
            ],
          },
          stroke: {
            width: [0, 2, 5],
            curve: "smooth",
          },
          plotOptions: {
            bar: {
              columnWidth: "100%",
            },
          },

          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: "light",
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100],
            },
          },
          labels: [0, 1, 2, 3],
          markers: {
            size: 0,
          },
          xaxis: {
            type: "string",
          },
          yaxis: {
            title: {
              text: "Count Scores",
            },
            decimalsInFloat: 0,
            min: 0,
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y: any) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0);
                }
                return y;
              },
            },
          },
        },
      },
      radar: {
        mean: [
          {
            name: "mean",
            data: [
              mean(iieknowledgeArr).toFixed(2),
              mean(iieAcquiredSkillArr).toFixed(2),
              mean(iieBehaviourArr).toFixed(2),
              mean(mngtknowledgeArr).toFixed(2),
              mean(mngtAcquiredSkillArr).toFixed(2),
              mean(mngtBehaviourArr).toFixed(2),
            ],
          },
        ],
        mode: [
          {
            name: "mode",
            data: [
              mode(iieknowledgeArr),
              mode(iieAcquiredSkillArr),
              mode(iieBehaviourArr),
              mode(mngtknowledgeArr),
              mode(mngtAcquiredSkillArr),
              mode(mngtBehaviourArr),
            ],
          },
        ],
        median: [
          {
            name: "median",
            data: [
              median(iieknowledgeArr),
              median(iieAcquiredSkillArr),
              median(iieBehaviourArr),
              median(mngtknowledgeArr),
              median(mngtAcquiredSkillArr),
              median(mngtBehaviourArr),
            ],
          },
        ],
      },
    };
  });
};

export default chartSegmentFacility;
