import { format } from "date-fns";
import { countBy } from "lodash";
import {
  mode,
  mean,
  median,
  standardDeviation,
  sampleSkewness,
  sampleKurtosis,
} from "simple-statistics";

const useDataForScoreTablesItem = (filter: any, source: any) => {

  const evaluationsStore = useEvaluationsStore();

  let evalData: any = undefined;

  if (filter == "All") {
    evalData = useAsyncState(async () => {
      return await evaluationsStore.evaluations();
    }, undefined);
  } else if (source == "district") {
    evalData = useAsyncState(async () => {
      return await evaluationsStore.getEvalByDistrict(filter);
    }, undefined);
  } else {
    evalData = useAsyncState(async () => {
      return await evaluationsStore.getEvalByFacility(filter);
    }, undefined);
  }

 return evalData.then((response: any) => {
    const state: any = response.state.value;

    let dmQData: any[] = [];
    let dmQDataNames: any[] = [];

    state.forEach((response: any) => {
      response.scores.forEach((res: any) => {
        dmQData.push(res);
      });
    });

    state.forEach((response: any) => {
      dmQDataNames.push(response);
    });

    const dmQ1NotApplicableMentees: any[] = [];
    const dmQ1PoorMentees: any[] = [];
    const dmQ1AverageMentees: any[] = [];
    const dmQ1GoodMentees: any[] = [];

    const dmQ1NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ1 == 0;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };

        return dmQ1NotApplicableMentees.push(menteeInfo);
      });

    const dmQ1Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ1 == 1;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };

        return dmQ1PoorMentees.push(menteeInfo);
      });

    const dmQ1Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ1 == 2;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ1AverageMentees.push(menteeInfo);
      });

    const dmQ1Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ1 == 3;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ1GoodMentees.push(menteeInfo);
      });

    //DMQ2
    const dmQ2NotApplicableMentees: any[] = [];
    const dmQ2PoorMentees: any[] = [];
    const dmQ2AverageMentees: any[] = [];
    const dmQ2GoodMentees: any[] = [];

    const dmQ2NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ2 == 0;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ2NotApplicableMentees.push(menteeInfo);
      });

    const dmQ2Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ2 == 1;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ2PoorMentees.push(menteeInfo);
      });

    const dmQ2Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ2 == 2;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ2AverageMentees.push(menteeInfo);
      });

    const dmQ2Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ2 == 3;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ2GoodMentees.push(menteeInfo);
      });

    //DMQ3
    const dmQ3NotApplicableMentees: any[] = [];
    const dmQ3PoorMentees: any[] = [];
    const dmQ3AverageMentees: any[] = [];
    const dmQ3GoodMentees: any[] = [];

    const dmQ3NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ3 == 0;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ3NotApplicableMentees.push(menteeInfo);
      });

    const dmQ3Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ3 == 1;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ3PoorMentees.push(menteeInfo);
      });

    const dmQ3Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ3 == 2;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ3AverageMentees.push(menteeInfo);
      });

    const dmQ3Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ3 == 3;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ3GoodMentees.push(menteeInfo);
      });
    //DMQ1

    const dmQ4NotApplicableMentees: any[] = [];
    const dmQ4PoorMentees: any[] = [];
    const dmQ4AverageMentees: any[] = [];
    const dmQ4GoodMentees: any[] = [];

    const dmQ4NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ4 == 0;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ4NotApplicableMentees.push(menteeInfo);
      });

    const dmQ4Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ4 == 1;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ4PoorMentees.push(menteeInfo);
      });

    const dmQ4Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ4 == 2;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ4AverageMentees.push(menteeInfo);
      });

    const dmQ4Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ4 == 3;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ4GoodMentees.push(menteeInfo);
      });
    //DMQ5
    const dmQ5NotApplicableMentees: any[] = [];
    const dmQ5PoorMentees: any[] = [];
    const dmQ5AverageMentees: any[] = [];
    const dmQ5GoodMentees: any[] = [];

    const dmQ5NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ5 == 0;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ5NotApplicableMentees.push(menteeInfo);
      });

    const dmQ5Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ5 == 1;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ5PoorMentees.push(menteeInfo);
      });

    const dmQ5Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ5 == 2;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ5AverageMentees.push(menteeInfo);
      });

    const dmQ5Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ5 == 3;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ5GoodMentees.push(menteeInfo);
      });

    //

    const dmQ6NotApplicableMentees: any[] = [];
    const dmQ6PoorMentees: any[] = [];
    const dmQ6AverageMentees: any[] = [];
    const dmQ6GoodMentees: any[] = [];

    const dmQ6NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ6 == 0;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ6NotApplicableMentees.push(menteeInfo);
      });

    const dmQ6Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ6 == 1;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ6PoorMentees.push(menteeInfo);
      });

    const dmQ6Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ6 == 2;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ6AverageMentees.push(menteeInfo);
      });

    const dmQ6Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ6 == 3;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ6GoodMentees.push(menteeInfo);
      });

    //
    const dmQ7NotApplicableMentees: any[] = [];
    const dmQ7PoorMentees: any[] = [];
    const dmQ7AverageMentees: any[] = [];
    const dmQ7GoodMentees: any[] = [];

    const dmQ7NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ7 == 0;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ7NotApplicableMentees.push(menteeInfo);
      });

    const dmQ7Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ7 == 1;
      })
      .forEach((res: any) => {
        let menteeInfo = {
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        };
        return dmQ7PoorMentees.push(menteeInfo);
      });

    const dmQ7Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ7 == 2;
      })
      .forEach((res: any) => {
        return dmQ7AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ7Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ7 == 3;
      })
      .forEach((res: any) => {
        return dmQ7GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    //
    const dmQ8NotApplicableMentees: any[] = [];
    const dmQ8PoorMentees: any[] = [];
    const dmQ8AverageMentees: any[] = [];
    const dmQ8GoodMentees: any[] = [];

    const dmQ8NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ8 == 0;
      })
      .forEach((res: any) => {
        return dmQ8NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ8Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ8 == 1;
      })
      .forEach((res: any) => {
        return dmQ8PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ8Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ8 == 2;
      })
      .forEach((res: any) => {
        return dmQ8AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ8Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ8 == 3;
      })
      .forEach((res: any) => {
        return dmQ8GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });
    //
    const dmQ9NotApplicableMentees: any[] = [];
    const dmQ9PoorMentees: any[] = [];
    const dmQ9AverageMentees: any[] = [];
    const dmQ9GoodMentees: any[] = [];

    const dmQ9NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ9 == 0;
      })
      .forEach((res: any) => {
        return dmQ9NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ9Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ9 == 1;
      })
      .forEach((res: any) => {
        return dmQ9PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ9Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ9 == 2;
      })
      .forEach((res: any) => {
        return dmQ9AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ9Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ9 == 3;
      })
      .forEach((res: any) => {
        return dmQ9GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    //

    const dmQ10NotApplicableMentees: any[] = [];
    const dmQ10PoorMentees: any[] = [];
    const dmQ10AverageMentees: any[] = [];
    const dmQ10GoodMentees: any[] = [];

    const dmQ10NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ10 == 0;
      })
      .forEach((res: any) => {
        return dmQ10NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ10Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ10 == 1;
      })
      .forEach((res: any) => {
        return dmQ10PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ10Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ10 == 2;
      })
      .forEach((res: any) => {
        return dmQ10AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ10Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ10 == 3;
      })
      .forEach((res: any) => {
        return dmQ10GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });
    //
    const dmQ11NotApplicableMentees: any[] = [];
    const dmQ11PoorMentees: any[] = [];
    const dmQ11AverageMentees: any[] = [];
    const dmQ11GoodMentees: any[] = [];

    const dmQ11NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ11 == 0;
      })
      .forEach((res: any) => {
        return dmQ11NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ11Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ11 == 1;
      })
      .forEach((res: any) => {
        return dmQ11PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ11Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ11 == 2;
      })
      .forEach((res: any) => {
        return dmQ11AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ11Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ11 == 3;
      })
      .forEach((res: any) => {
        return dmQ11GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    //
    const dmQ12NotApplicableMentees: any[] = [];
    const dmQ12PoorMentees: any[] = [];
    const dmQ12AverageMentees: any[] = [];
    const dmQ12GoodMentees: any[] = [];

    const dmQ12NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ12 == 0;
      })
      .forEach((res: any) => {
        return dmQ12NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ12Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ12 == 1;
      })
      .forEach((res: any) => {
        return dmQ12PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ12Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ12 == 2;
      })
      .forEach((res: any) => {
        return dmQ12AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ12Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ12 == 3;
      })
      .forEach((res: any) => {
        return dmQ12GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    //
    const dmQ13NotApplicableMentees: any[] = [];
    const dmQ13PoorMentees: any[] = [];
    const dmQ13AverageMentees: any[] = [];
    const dmQ13GoodMentees: any[] = [];

    const dmQ13NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ13 == 0;
      })
      .forEach((res: any) => {
        return dmQ13NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ13Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ13 == 1;
      })
      .forEach((res: any) => {
        return dmQ13PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ13Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ13 == 2;
      })
      .forEach((res: any) => {
        return dmQ13AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ13Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ13 == 3;
      })
      .forEach((res: any) => {
        return dmQ13GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });
    //
    ///
    const dmQ14NotApplicableMentees: any[] = [];
    const dmQ14PoorMentees: any[] = [];
    const dmQ14AverageMentees: any[] = [];
    const dmQ14GoodMentees: any[] = [];

    const dmQ14NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ14 == 0;
      })
      .forEach((res: any) => {
        return dmQ14NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ14Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ14 == 1;
      })
      .forEach((res: any) => {
        return dmQ14PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ14Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ14 == 2;
      })
      .forEach((res: any) => {
        return dmQ14AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ14Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ14 == 3;
      })
      .forEach((res: any) => {
        return dmQ14GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });
    ///

    const dmQ15NotApplicableMentees: any[] = [];
    const dmQ15PoorMentees: any[] = [];
    const dmQ15AverageMentees: any[] = [];
    const dmQ15GoodMentees: any[] = [];

    const dmQ15NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ15 == 0;
      })
      .forEach((res: any) => {
        return dmQ15NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ15Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ15 == 1;
      })
      .forEach((res: any) => {
        return dmQ15PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ15Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ15 == 2;
      })
      .forEach((res: any) => {
        return dmQ15AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ15Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ15 == 3;
      })
      .forEach((res: any) => {
        return dmQ15GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });
    /////
    const dmQ16NotApplicableMentees: any[] = [];
    const dmQ16PoorMentees: any[] = [];
    const dmQ16AverageMentees: any[] = [];
    const dmQ16GoodMentees: any[] = [];

    const dmQ16NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ16 == 0;
      })
      .forEach((res: any) => {
        return dmQ16NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ16Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ16 == 1;
      })
      .forEach((res: any) => {
        return dmQ16PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ16Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ16 == 2;
      })
      .forEach((res: any) => {
        return dmQ16AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ16Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ16 == 3;
      })
      .forEach((res: any) => {
        return dmQ16GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });
    ///

    const dmQ17NotApplicableMentees: any[] = [];
    const dmQ17PoorMentees: any[] = [];
    const dmQ17AverageMentees: any[] = [];
    const dmQ17GoodMentees: any[] = [];

    const dmQ17NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ17 == 0;
      })
      .forEach((res: any) => {
        return dmQ17NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ17Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ17 == 1;
      })
      .forEach((res: any) => {
        return dmQ17PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ17Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ17 == 2;
      })
      .forEach((res: any) => {
        return dmQ17AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ17Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ17 == 3;
      })
      .forEach((res: any) => {
        return dmQ17GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    ////

    const dmQ18NotApplicableMentees: any[] = [];
    const dmQ18PoorMentees: any[] = [];
    const dmQ18AverageMentees: any[] = [];
    const dmQ18GoodMentees: any[] = [];

    const dmQ18NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ18 == 0;
      })
      .forEach((res: any) => {
        return dmQ18NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ18Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ18 == 1;
      })
      .forEach((res: any) => {
        return dmQ18PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ18Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ18 == 2;
      })
      .forEach((res: any) => {
        return dmQ18AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ18Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ18 == 3;
      })
      .forEach((res: any) => {
        return dmQ18GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    ///

    const dmQ19NotApplicableMentees: any[] = [];
    const dmQ19PoorMentees: any[] = [];
    const dmQ19AverageMentees: any[] = [];
    const dmQ19GoodMentees: any[] = [];

    const dmQ19NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ19 == 0;
      })
      .forEach((res: any) => {
        return dmQ19NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ19Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ19 == 1;
      })
      .forEach((res: any) => {
        return dmQ19PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ19Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ19 == 2;
      })
      .forEach((res: any) => {
        return dmQ19AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ19Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ19 == 3;
      })
      .forEach((res: any) => {
        return dmQ19GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });
    ///

    const dmQ20NotApplicableMentees: any[] = [];
    const dmQ20PoorMentees: any[] = [];
    const dmQ20AverageMentees: any[] = [];
    const dmQ20GoodMentees: any[] = [];

    const dmQ20NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ20 == 0;
      })
      .forEach((res: any) => {
        return dmQ20NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ20Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ20 == 1;
      })
      .forEach((res: any) => {
        return dmQ20PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ20Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ20 == 2;
      })
      .forEach((res: any) => {
        return dmQ20AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ20Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ20 == 3;
      })
      .forEach((res: any) => {
        return dmQ20GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });
    ////
    const dmQ21NotApplicableMentees: any[] = [];
    const dmQ21PoorMentees: any[] = [];
    const dmQ21AverageMentees: any[] = [];
    const dmQ21GoodMentees: any[] = [];

    const dmQ21NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ21 == 0;
      })
      .forEach((res: any) => {
        return dmQ21NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ21Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ21 == 1;
      })
      .forEach((res: any) => {
        return dmQ21PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ21Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ21 == 2;
      })
      .forEach((res: any) => {
        return dmQ21AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ21Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ21 == 3;
      })
      .forEach((res: any) => {
        return dmQ21GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    ///
    const dmQ22NotApplicableMentees: any[] = [];
    const dmQ22PoorMentees: any[] = [];
    const dmQ22AverageMentees: any[] = [];
    const dmQ22GoodMentees: any[] = [];

    const dmQ22NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ22 == 0;
      })
      .forEach((res: any) => {
        return dmQ22NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ22Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ22 == 1;
      })
      .forEach((res: any) => {
        return dmQ22PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ22Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ22 == 2;
      })
      .forEach((res: any) => {
        return dmQ22AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ22Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ22 == 3;
      })
      .forEach((res: any) => {
        return dmQ22GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    ////
    const dmQ23NotApplicableMentees: any[] = [];
    const dmQ23PoorMentees: any[] = [];
    const dmQ23AverageMentees: any[] = [];
    const dmQ23GoodMentees: any[] = [];

    const dmQ23NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ23 == 0;
      })
      .forEach((res: any) => {
        return dmQ23NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ23Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ23 == 1;
      })
      .forEach((res: any) => {
        return dmQ23PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ23Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ23 == 2;
      })
      .forEach((res: any) => {
        return dmQ23AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ23Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ23 == 3;
      })
      .forEach((res: any) => {
        return dmQ23GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    ///

    const dmQ24NotApplicableMentees: any[] = [];
    const dmQ24PoorMentees: any[] = [];
    const dmQ24AverageMentees: any[] = [];
    const dmQ24GoodMentees: any[] = [];

    const dmQ24NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ24 == 0;
      })
      .forEach((res: any) => {
        return dmQ24NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ24Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ24 == 1;
      })
      .forEach((res: any) => {
        return dmQ24PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ24Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ24 == 2;
      })
      .forEach((res: any) => {
        return dmQ24AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ24Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ24 == 3;
      })
      .forEach((res: any) => {
        return dmQ24GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });
    ////

    const dmQ25NotApplicableMentees: any[] = [];
    const dmQ25PoorMentees: any[] = [];
    const dmQ25AverageMentees: any[] = [];
    const dmQ25GoodMentees: any[] = [];

    const dmQ25NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ25 == 0;
      })
      .forEach((res: any) => {
        return dmQ25NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ25Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ25 == 1;
      })
      .forEach((res: any) => {
        return dmQ25PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ25Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ25 == 2;
      })
      .forEach((res: any) => {
        return dmQ25AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ25Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ25 == 3;
      })
      .forEach((res: any) => {
        return dmQ25GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    ////

    const dmQ26NotApplicableMentees: any[] = [];
    const dmQ26PoorMentees: any[] = [];
    const dmQ26AverageMentees: any[] = [];
    const dmQ26GoodMentees: any[] = [];

    const dmQ26NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ26 == 0;
      })
      .forEach((res: any) => {
        return dmQ26NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ26Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ26 == 1;
      })
      .forEach((res: any) => {
        return dmQ26PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ26Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ26 == 2;
      })
      .forEach((res: any) => {
        return dmQ26AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ26Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ26 == 3;
      })
      .forEach((res: any) => {
        return dmQ26GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });
    ///
    const dmQ27NotApplicableMentees: any[] = [];
    const dmQ27PoorMentees: any[] = [];
    const dmQ27AverageMentees: any[] = [];
    const dmQ27GoodMentees: any[] = [];

    const dmQ27NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ27 == 0;
      })
      .forEach((res: any) => {
        return dmQ27NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ27Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ27 == 1;
      })
      .forEach((res: any) => {
        return dmQ27PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ27Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ27 == 2;
      })
      .forEach((res: any) => {
        return dmQ27AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ27Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ27 == 3;
      })
      .forEach((res: any) => {
        return dmQ27GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    ///

    const dmQ28NotApplicableMentees: any[] = [];
    const dmQ28PoorMentees: any[] = [];
    const dmQ28AverageMentees: any[] = [];
    const dmQ28GoodMentees: any[] = [];

    const dmQ28NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ28 == 0;
      })
      .forEach((res: any) => {
        return dmQ28NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ28Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ28 == 1;
      })
      .forEach((res: any) => {
        return dmQ28PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ28Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ28 == 2;
      })
      .forEach((res: any) => {
        return dmQ28AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ28Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ28 == 3;
      })
      .forEach((res: any) => {
        return dmQ28GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    ////
    const dmQ29NotApplicableMentees: any[] = [];
    const dmQ29PoorMentees: any[] = [];
    const dmQ29AverageMentees: any[] = [];
    const dmQ29GoodMentees: any[] = [];

    const dmQ29NotApplicable = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ29 == 0;
      })
      .forEach((res: any) => {
        return dmQ29NotApplicableMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ29Poor = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ29 == 1;
      })
      .forEach((res: any) => {
        return dmQ29PoorMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ29Average = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ29 == 2;
      })
      .forEach((res: any) => {
        return dmQ29AverageMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    const dmQ29Good = dmQDataNames
      .filter((res: any) => {
        return res.scores[0].dmQ29 == 3;
      })
      .forEach((res: any) => {
        return dmQ29GoodMentees.push({
          scoreId: res._id,
          firstname: res.info.menteeInfo[0].firstname,
          lastname: res.info.menteeInfo[0].lastname,
          gender: res.info.menteeInfo[0].gender,
          district: res.info.menteeInfo[0].district,
          facility: res.info.menteeInfo[0].facility,
          date: format(new Date(res.info.evaluationDate), "dd-MMM-yyyy"),
        });
      });

    ///////////////////////////////////////////

    let dmQ1Data: any[] = [];
    let dmQ2Data: any[] = [];
    let dmQ3Data: any[] = [];
    let dmQ4Data: any[] = [];
    let dmQ5Data: any[] = [];
    let dmQ6Data: any[] = [];
    let dmQ7Data: any[] = [];
    let dmQ8Data: any[] = [];
    let dmQ9Data: any[] = [];
    let dmQ10Data: any[] = [];
    let dmQ11Data: any[] = [];
    let dmQ12Data: any[] = [];
    let dmQ13Data: any[] = [];
    let dmQ14Data: any[] = [];
    let dmQ15Data: any[] = [];
    let dmQ16Data: any[] = [];
    let dmQ17Data: any[] = [];
    let dmQ18Data: any[] = [];
    let dmQ19Data: any[] = [];
    let dmQ20Data: any[] = [];
    let dmQ21Data: any[] = [];
    let dmQ22Data: any[] = [];
    let dmQ23Data: any[] = [];
    let dmQ24Data: any[] = [];
    let dmQ25Data: any[] = [];
    let dmQ26Data: any[] = [];
    let dmQ27Data: any[] = [];
    let dmQ28Data: any[] = [];
    let dmQ29Data: any[] = [];

    dmQData.forEach((response: any) => {
      dmQ1Data.push(parseInt(response.dmQ1));
      dmQ2Data.push(parseInt(response.dmQ2));
      dmQ3Data.push(parseInt(response.dmQ3));
      dmQ4Data.push(parseInt(response.dmQ4));
      dmQ5Data.push(parseInt(response.dmQ5));
      dmQ6Data.push(parseInt(response.dmQ6));
      dmQ7Data.push(parseInt(response.dmQ7));
      dmQ8Data.push(parseInt(response.dmQ8));
      dmQ9Data.push(parseInt(response.dmQ9));
      dmQ10Data.push(parseInt(response.dmQ10));
      dmQ11Data.push(parseInt(response.dmQ11));
      dmQ12Data.push(parseInt(response.dmQ12));
      dmQ13Data.push(parseInt(response.dmQ13));
      dmQ14Data.push(parseInt(response.dmQ14));
      dmQ15Data.push(parseInt(response.dmQ15));
      dmQ16Data.push(parseInt(response.dmQ16));
      dmQ17Data.push(parseInt(response.dmQ17));
      dmQ18Data.push(parseInt(response.dmQ18));
      dmQ19Data.push(parseInt(response.dmQ19));
      dmQ20Data.push(parseInt(response.dmQ20));
      dmQ21Data.push(parseInt(response.dmQ21));
      dmQ22Data.push(parseInt(response.dmQ22));
      dmQ23Data.push(parseInt(response.dmQ23));
      dmQ24Data.push(parseInt(response.dmQ24));
      dmQ25Data.push(parseInt(response.dmQ25));
      dmQ26Data.push(parseInt(response.dmQ26));
      dmQ27Data.push(parseInt(response.dmQ27));
      dmQ28Data.push(parseInt(response.dmQ28));
      dmQ29Data.push(parseInt(response.dmQ29));
    });

    //select
    ///kurtosis and skewiness

    const getMean = (itemData: any[]) => {
      if (itemData.length > 0) {
        return mean(itemData).toFixed(2);
      } else {
        return "-";
      }
    };

      const getMedian = (itemData: any[]) => {
        if (itemData.length > 0) {
          return median(itemData);
        } else {
          return "-";
        }
      };
  

    const getMode = (itemData: any[]) => {
      if (itemData.length > 0) {
        return mode(itemData);
      } else {
        return "-";
      }
    };

    const getStandardDeviation = (itemData: any[]) => {
      if (itemData.length > 0) {
        return standardDeviation(itemData).toFixed(4);
      } else {
        return "-";
      }
    };

    const getKurtosis = (itemData: any[]) => {
      if (itemData.length >= 4) {
        return sampleKurtosis(itemData).toFixed(4);
      } else {
        return "-";
      }
    };

    ///

    const getSkewness = (itemData: any[]) => {
      if (itemData.length >= 3) {
        return sampleSkewness(itemData).toFixed(4);
      } else {
        return "-";
      }
    };

    ///

    const majorData = {
      dmQ1: {
        evalItem: "Defines Diabetes Mellitus.",
        mentees: {
          NotApplicableMentees: dmQ1NotApplicableMentees,
          PoorMentees: dmQ1PoorMentees,
          AverageMentees: dmQ1AverageMentees,
          GoodMentees: dmQ1GoodMentees,
        },
        counts: countBy(dmQ1Data),
        statistics: {
          total: dmQ1Data.length,
          mean: getMean(dmQ1Data),
          median: getMedian(dmQ1Data),
          mode: getMode(dmQ1Data),
          standardDeviation: getStandardDeviation(dmQ1Data),
          kurtosis: getKurtosis(dmQ1Data),
          skewness: getSkewness(dmQ1Data),
        },
      },
      dmQ2: {
        evalItem: "Describes three common types of diabetesemellitus (DM)",
        mentees: {
          NotApplicableMentees: dmQ2NotApplicableMentees,
          PoorMentees: dmQ2PoorMentees,
          AverageMentees: dmQ2AverageMentees,
          GoodMentees: dmQ2GoodMentees,
        },
        counts: countBy(dmQ2Data),
        statistics: {
          total: dmQ2Data.length,
          mean: getMean(dmQ2Data),
          median: getMedian(dmQ2Data),
          mode: getMode(dmQ2Data),
          standardDeviation: getStandardDeviation(dmQ2Data),
          kurtosis: getKurtosis(dmQ2Data),
          skewness: getSkewness(dmQ2Data),
        },
      },
      dmQ3: {
        evalItem: "Lists at least five risk factors of TD2M.",
        mentees: {
          NotApplicableMentees: dmQ3NotApplicableMentees,
          PoorMentees: dmQ3PoorMentees,
          AverageMentees: dmQ3AverageMentees,
          GoodMentees: dmQ3GoodMentees,
        },
        counts: countBy(dmQ3Data),
        statistics: {
          total: dmQ3Data.length,
          mean: getMean(dmQ3Data),
          median: getMedian(dmQ3Data),
          mode: getMode(dmQ3Data),
          standardDeviation: getStandardDeviation(dmQ3Data),
          kurtosis: getKurtosis(dmQ3Data),
          skewness: getSkewness(dmQ3Data),
        },
      },
      dmQ4: {
        evalItem:
          "Lists at least three acute symptoms and three chronic symptoms of DM",
        mentees: {
          NotApplicableMentees: dmQ4NotApplicableMentees,
          PoorMentees: dmQ4PoorMentees,
          AverageMentees: dmQ4AverageMentees,
          GoodMentees: dmQ4GoodMentees,
        },
        counts: countBy(dmQ4Data),
        statistics: {
          total: dmQ4Data.length,
          mean: getMean(dmQ4Data),
          median: getMedian(dmQ4Data),
          mode: getMode(dmQ4Data),
          standardDeviation: getStandardDeviation(dmQ4Data),
          kurtosis: getKurtosis(dmQ4Data),
          skewness: getSkewness(dmQ4Data),
        },
      },
      dmQ5: {
        evalItem:
          "Identifies at least five at risk groups of people that need to be screened for DM.",
        mentees: {
          NotApplicableMentees: dmQ5NotApplicableMentees,
          PoorMentees: dmQ5PoorMentees,
          AverageMentees: dmQ5AverageMentees,
          GoodMentees: dmQ5GoodMentees,
        },
        counts: countBy(dmQ5Data),
        statistics: {
          total: dmQ5Data.length,
          mean: getMean(dmQ5Data),
          median: getMedian(dmQ5Data),
          mode: getMode(dmQ5Data),
          standardDeviation: getStandardDeviation(dmQ5Data),
          kurtosis: getKurtosis(dmQ5Data),
          skewness: getSkewness(dmQ5Data),
        },
      },
      dmQ6: {
        evalItem:
          "Explains the two steps in screening and diagnosing diabetes mellitus in at risk asymptoatic patients.",
        mentees: {
          NotApplicableMentees: dmQ6NotApplicableMentees,
          PoorMentees: dmQ6PoorMentees,
          AverageMentees: dmQ6AverageMentees,
          GoodMentees: dmQ6GoodMentees,
        },
        counts: countBy(dmQ6Data),
        statistics: {
          total: dmQ6Data.length,
          mean: getMean(dmQ6Data),
          median: getMedian(dmQ6Data),
          mode: getMode(dmQ6Data),
          standardDeviation: getStandardDeviation(dmQ6Data),
          kurtosis: getKurtosis(dmQ6Data),
          skewness: getSkewness(dmQ6Data),
        },
      },
      dmQ7: {
        evalItem:
          "Lists and explains the purpose of the three tests offered to monitor patients in the pilot project.",
        mentees: {
          NotApplicableMentees: dmQ7NotApplicableMentees,
          PoorMentees: dmQ7PoorMentees,
          AverageMentees: dmQ7AverageMentees,
          GoodMentees: dmQ7GoodMentees,
        },
        counts: countBy(dmQ7Data),
        statistics: {
          total: dmQ7Data.length,
          mean: getMean(dmQ7Data),
          median: getMedian(dmQ7Data),
          mode: getMode(dmQ7Data),
          standardDeviation: getStandardDeviation(dmQ7Data),
          kurtosis: getKurtosis(dmQ7Data),
          skewness: getSkewness(dmQ7Data),
        },
      },
      dmQ8: {
        evalItem:
          "Performs DM Screening in five groups of people at risk of developing DM.",
        mentees: {
          NotApplicableMentees: dmQ8NotApplicableMentees,
          PoorMentees: dmQ8PoorMentees,
          AverageMentees: dmQ8AverageMentees,
          GoodMentees: dmQ8GoodMentees,
        },
        counts: countBy(dmQ8Data),
        statistics: {
          total: dmQ8Data.length,
          mean: getMean(dmQ8Data),
          median: getMedian(dmQ8Data),
          mode: getMode(dmQ8Data),
          standardDeviation: getStandardDeviation(dmQ8Data),
          kurtosis: getKurtosis(dmQ8Data),
          skewness: getSkewness(dmQ8Data),
        },
      },
      dmQ9: {
        evalItem:
          "Performs six step systematic history taking relevant for diabetes mellitus per checklist.",
        mentees: {
          NotApplicableMentees: dmQ9NotApplicableMentees,
          PoorMentees: dmQ9PoorMentees,
          AverageMentees: dmQ9AverageMentees,
          GoodMentees: dmQ9GoodMentees,
        },
        counts: countBy(dmQ9Data),
        statistics: {
          total: dmQ9Data.length,
          mean: getMean(dmQ9Data),
          median: getMedian(dmQ9Data),
          mode: getMode(dmQ9Data),
          standardDeviation: getStandardDeviation(dmQ9Data),
          kurtosis: getKurtosis(dmQ9Data),
          skewness: getSkewness(dmQ9Data),
        },
      },
      dmQ10: {
        evalItem:
          "Evaluate a DM patient using the seven step physical examination per protocol.",
        mentees: {
          NotApplicableMentees: dmQ10NotApplicableMentees,
          PoorMentees: dmQ10PoorMentees,
          AverageMentees: dmQ10AverageMentees,
          GoodMentees: dmQ10GoodMentees,
        },
        counts: countBy(dmQ10Data),
        statistics: {
          total: dmQ10Data.length,
          mean: getMean(dmQ10Data),
          median: getMedian(dmQ10Data),
          mode: getMode(dmQ10Data),
          standardDeviation: getStandardDeviation(dmQ10Data),
          kurtosis: getKurtosis(dmQ10Data),
          skewness: getSkewness(dmQ10Data),
        },
      },
      dmQ11: {
        evalItem:
          "Uses effective and appropriate level of communication with patients.",
        mentees: {
          NotApplicableMentees: dmQ11NotApplicableMentees,
          PoorMentees: dmQ11PoorMentees,
          AverageMentees: dmQ11AverageMentees,
          GoodMentees: dmQ11GoodMentees,
        },
        counts: countBy(dmQ11Data),
        statistics: {
          total: dmQ11Data.length,
          mean: getMean(dmQ11Data),
          median: getMedian(dmQ11Data),
          mode: getMode(dmQ11Data),
          standardDeviation: getStandardDeviation(dmQ11Data),
          kurtosis: getKurtosis(dmQ11Data),
          skewness: getSkewness(dmQ11Data),
        },
      },
      dmQ12: {
        evalItem: "Perfoms physical examination in a gentle manner.",
        mentees: {
          NotApplicableMentees: dmQ12NotApplicableMentees,
          PoorMentees: dmQ12PoorMentees,
          AverageMentees: dmQ12AverageMentees,
          GoodMentees: dmQ12GoodMentees,
        },
        counts: countBy(dmQ12Data),
        statistics: {
          total: dmQ12Data.length,
          mean: getMean(dmQ12Data),
          median: getMedian(dmQ12Data),
          mode: getMode(dmQ12Data),
          standardDeviation: getStandardDeviation(dmQ12Data),
          kurtosis: getKurtosis(dmQ12Data),
          skewness: getSkewness(dmQ12Data),
        },
      },
      dmQ13: {
        evalItem: "Perfoms physical examination in private conditions.",
        mentees: {
          NotApplicableMentees: dmQ13NotApplicableMentees,
          PoorMentees: dmQ13PoorMentees,
          AverageMentees: dmQ13AverageMentees,
          GoodMentees: dmQ13GoodMentees,
        },
        counts: countBy(dmQ13Data),
        statistics: {
          total: dmQ13Data.length,
          mean: getMean(dmQ13Data),
          median: getMedian(dmQ13Data),
          mode: getMode(dmQ13Data),
          standardDeviation: getStandardDeviation(dmQ13Data),
          kurtosis: getKurtosis(dmQ13Data),
          skewness: getSkewness(dmQ13Data),
        },
      },
      dmQ14: {
        evalItem:
          "Describes the three main aims for treating diabetes mellitus.",
        mentees: {
          NotApplicableMentees: dmQ14NotApplicableMentees,
          PoorMentees: dmQ14PoorMentees,
          AverageMentees: dmQ14AverageMentees,
          GoodMentees: dmQ14GoodMentees,
        },
        counts: countBy(dmQ14Data),
        statistics: {
          total: dmQ14Data.length,
          mean: getMean(dmQ14Data),
          median: getMedian(dmQ14Data),
          mode: getMode(dmQ14Data),
          standardDeviation: getStandardDeviation(dmQ14Data),
          kurtosis: getKurtosis(dmQ14Data),
          skewness: getSkewness(dmQ14Data),
        },
      },
      dmQ15: {
        evalItem:
          " Explains the three lifestyle changes to be given to patients as part of management of DM.",
        mentees: {
          NotApplicableMentees: dmQ15NotApplicableMentees,
          PoorMentees: dmQ15PoorMentees,
          AverageMentees: dmQ15AverageMentees,
          GoodMentees: dmQ15GoodMentees,
        },
        counts: countBy(dmQ15Data),
        statistics: {
          total: dmQ15Data.length,
          mean: getMean(dmQ15Data),
          median: getMedian(dmQ15Data),
          mode: getMode(dmQ15Data),
          standardDeviation: getStandardDeviation(dmQ15Data),
          kurtosis: getKurtosis(dmQ15Data),
          skewness: getSkewness(dmQ15Data),
        },
      },
      dmQ16: {
        evalItem:
          "Lists the three medications used in DM (Type 1 and Type 2) management and gives one common side effect of each.",
        mentees: {
          NotApplicableMentees: dmQ16NotApplicableMentees,
          PoorMentees: dmQ16PoorMentees,
          AverageMentees: dmQ16AverageMentees,
          GoodMentees: dmQ16GoodMentees,
        },
        counts: countBy(dmQ16Data),
        statistics: {
          total: dmQ16Data.length,
          mean: getMean(dmQ16Data),
          median: getMedian(dmQ16Data),
          mode: getMode(dmQ16Data),
          standardDeviation: getStandardDeviation(dmQ16Data),
          kurtosis: getKurtosis(dmQ16Data),
          skewness: getSkewness(dmQ16Data),
        },
      },
      dmQ17: {
        evalItem: " Lists at least five symptoms of hypoglycaemia.",
        mentees: {
          NotApplicableMentees: dmQ17NotApplicableMentees,
          PoorMentees: dmQ17PoorMentees,
          AverageMentees: dmQ17AverageMentees,
          GoodMentees: dmQ17GoodMentees,
        },
        counts: countBy(dmQ17Data),
        statistics: {
          total: dmQ17Data.length,
          mean: getMean(dmQ17Data),
          median: getMedian(dmQ17Data),
          mode: getMode(dmQ17Data),
          standardDeviation: getStandardDeviation(dmQ17Data),
          kurtosis: getKurtosis(dmQ17Data),
          skewness: getSkewness(dmQ17Data),
        },
      },
      dmQ18: {
        evalItem: "Lists at least five symptoms of hyperglycaemia.",
        mentees: {
          NotApplicableMentees: dmQ18NotApplicableMentees,
          PoorMentees: dmQ18PoorMentees,
          AverageMentees: dmQ18AverageMentees,
          GoodMentees: dmQ18GoodMentees,
        },
        counts: countBy(dmQ18Data),
        statistics: {
          total: dmQ18Data.length,
          mean: getMean(dmQ18Data),
          median: getMedian(dmQ18Data),
          mode: getMode(dmQ18Data),
          standardDeviation: getStandardDeviation(dmQ18Data),
          kurtosis: getKurtosis(dmQ18Data),
          skewness: getSkewness(dmQ18Data),
        },
      },
      dmQ19: {
        evalItem:
          "Gives at least two acute and at least two chronic complications of uncontrolled DM",
        mentees: {
          NotApplicableMentees: dmQ19NotApplicableMentees,
          PoorMentees: dmQ19PoorMentees,
          AverageMentees: dmQ19AverageMentees,
          GoodMentees: dmQ19GoodMentees,
        },
        counts: countBy(dmQ19Data),
        statistics: {
          total: dmQ19Data.length,
          mean: getMean(dmQ19Data),
          median: getMedian(dmQ19Data),
          mode: getMode(dmQ19Data),
          standardDeviation: getStandardDeviation(dmQ19Data),
          kurtosis: getKurtosis(dmQ19Data),
          skewness: getSkewness(dmQ19Data),
        },
      },
      dmQ20: {
        evalItem: " Lists the three diagnostic criteria for DKA.",
        mentees: {
          NotApplicableMentees: dmQ20NotApplicableMentees,
          PoorMentees: dmQ20PoorMentees,
          AverageMentees: dmQ20AverageMentees,
          GoodMentees: dmQ20GoodMentees,
        },
        counts: countBy(dmQ20Data),
        statistics: {
          total: dmQ20Data.length,
          mean: getMean(dmQ20Data),
          median: getMedian(dmQ20Data),
          mode: getMode(dmQ20Data),
          standardDeviation: getStandardDeviation(dmQ20Data),
          kurtosis: getKurtosis(dmQ20Data),
          skewness: getSkewness(dmQ20Data),
        },
      },
      dmQ21: {
        evalItem:
          "Explains the <b>three</b> categories of DM patients that need to be referred to the doctors.",
        mentees: {
          NotApplicableMentees: dmQ21NotApplicableMentees,
          PoorMentees: dmQ21PoorMentees,
          AverageMentees: dmQ21AverageMentees,
          GoodMentees: dmQ21GoodMentees,
        },
        counts: countBy(dmQ21Data),
        statistics: {
          total: dmQ21Data.length,
          mean: getMean(dmQ21Data),
          median: getMedian(dmQ21Data),
          mode: getMode(dmQ21Data),
          standardDeviation: getStandardDeviation(dmQ21Data),
          kurtosis: getKurtosis(dmQ21Data),
          skewness: getSkewness(dmQ21Data),
        },
      },
      dmQ22: {
        evalItem: " Gives the two principles in management of diabetic foot.",
        mentees: {
          NotApplicableMentees: dmQ22NotApplicableMentees,
          PoorMentees: dmQ22PoorMentees,
          AverageMentees: dmQ22AverageMentees,
          GoodMentees: dmQ22GoodMentees,
        },
        counts: countBy(dmQ22Data),
        statistics: {
          total: dmQ22Data.length,
          mean: getMean(dmQ22Data),
          median: getMedian(dmQ22Data),
          mode: getMode(dmQ22Data),
          standardDeviation: getStandardDeviation(dmQ22Data),
          kurtosis: getKurtosis(dmQ22Data),
          skewness: getSkewness(dmQ22Data),
        },
      },
      dmQ23: {
        evalItem:
          "Gives the patients the six key messages to aid management of DM.",
        mentees: {
          NotApplicableMentees: dmQ23NotApplicableMentees,
          PoorMentees: dmQ23PoorMentees,
          AverageMentees: dmQ23AverageMentees,
          GoodMentees: dmQ23GoodMentees,
        },
        counts: countBy(dmQ23Data),
        statistics: {
          total: dmQ23Data.length,
          mean: getMean(dmQ23Data),
          median: getMedian(dmQ23Data),
          mode: getMode(dmQ23Data),
          standardDeviation: getStandardDeviation(dmQ23Data),
          kurtosis: getKurtosis(dmQ23Data),
          skewness: getSkewness(dmQ23Data),
        },
      },
      dmQ24: {
        evalItem:
          "Follows correctly the schedules of the six aspects to monitor in a DM patient.",
        mentees: {
          NotApplicableMentees: dmQ24NotApplicableMentees,
          PoorMentees: dmQ24PoorMentees,
          AverageMentees: dmQ24AverageMentees,
          GoodMentees: dmQ24GoodMentees,
        },
        counts: countBy(dmQ24Data),
        statistics: {
          total: dmQ24Data.length,
          mean: getMean(dmQ24Data),
          median: getMedian(dmQ24Data),
          mode: getMode(dmQ24Data),
          standardDeviation: getStandardDeviation(dmQ24Data),
          kurtosis: getKurtosis(dmQ24Data),
          skewness: getSkewness(dmQ24Data),
        },
      },
      dmQ25: {
        evalItem: "Recognizes patient with hypoglycaemia.",
        mentees: {
          NotApplicableMentees: dmQ25NotApplicableMentees,
          PoorMentees: dmQ25PoorMentees,
          AverageMentees: dmQ25AverageMentees,
          GoodMentees: dmQ25GoodMentees,
        },
        counts: countBy(dmQ25Data),
        statistics: {
          total: dmQ25Data.length,
          mean: getMean(dmQ25Data),
          median: getMedian(dmQ25Data),
          mode: getMode(dmQ25Data),
          standardDeviation: getStandardDeviation(dmQ25Data),
          kurtosis: getKurtosis(dmQ25Data),
          skewness: getSkewness(dmQ25Data),
        },
      },
      dmQ26: {
        evalItem: "Implements the four step management of hypoglycaemia.",
        mentees: {
          NotApplicableMentees: dmQ26NotApplicableMentees,
          PoorMentees: dmQ26PoorMentees,
          AverageMentees: dmQ26AverageMentees,
          GoodMentees: dmQ26GoodMentees,
        },
        counts: countBy(dmQ26Data),
        statistics: {
          total: dmQ26Data.length,
          mean: getMean(dmQ26Data),
          median: getMedian(dmQ26Data),
          mode: getMode(dmQ26Data),
          standardDeviation: getStandardDeviation(dmQ26Data),
          kurtosis: getKurtosis(dmQ26Data),
          skewness: getSkewness(dmQ26Data),
        },
      },
      dmQ27: {
        evalItem: "Recognizes patients with hyperglycaemia.",
        mentees: {
          NotApplicableMentees: dmQ27NotApplicableMentees,
          PoorMentees: dmQ27PoorMentees,
          AverageMentees: dmQ27AverageMentees,
          GoodMentees: dmQ27GoodMentees,
        },
        counts: countBy(dmQ27Data),
        statistics: {
          total: dmQ27Data.length,
          mean: getMean(dmQ27Data),
          median: getMedian(dmQ27Data),
          mode: getMode(dmQ27Data),
          standardDeviation: getStandardDeviation(dmQ27Data),
          kurtosis: getKurtosis(dmQ27Data),
          skewness: getSkewness(dmQ27Data),
        },
      },
      dmQ28: {
        evalItem:
          "Follows the three procedures in managing hyperglycaemia depending on the level of hyperglycaemia.",
        mentees: {
          NotApplicableMentees: dmQ28NotApplicableMentees,
          PoorMentees: dmQ28PoorMentees,
          AverageMentees: dmQ28AverageMentees,
          GoodMentees: dmQ28GoodMentees,
        },
        counts: countBy(dmQ28Data),
        statistics: {
          total: dmQ28Data.length,
          mean: getMean(dmQ28Data),
          median: getMedian(dmQ28Data),
          mode: getMode(dmQ28Data),
          standardDeviation: getStandardDeviation(dmQ28Data),
          kurtosis: getKurtosis(dmQ28Data),
          skewness: getSkewness(dmQ28Data),
        },
      },
      dmQ29: {
        evalItem:
          "Explains the importance of adherence to treatment in an appropriate manner",
        mentees: {
          NotApplicableMentees: dmQ29NotApplicableMentees,
          PoorMentees: dmQ29PoorMentees,
          AverageMentees: dmQ29AverageMentees,
          GoodMentees: dmQ29GoodMentees,
        },
        counts: countBy(dmQ29Data),
        statistics: {
          total: dmQ29Data.length,
          mean: getMean(dmQ29Data),
          median: getMedian(dmQ29Data),
          mode: getMode(dmQ29Data),
          standardDeviation: getStandardDeviation(dmQ29Data),
          kurtosis: getKurtosis(dmQ29Data),
          skewness: getSkewness(dmQ29Data),
        },
      },
    };

    const combinedTableData = [
      {
        item: "dmQ1",
        total: dmQ1Data.length,
        mean: getMean(dmQ1Data),
        median: getMedian(dmQ1Data),
        mode: getMode(dmQ1Data),
        standardDeviation: getStandardDeviation(dmQ1Data),
        kurtosis: getKurtosis(dmQ1Data),
        skewness: getSkewness(dmQ1Data),
      },
      {
        item: "dmQ2",
        total: dmQ2Data.length,
        mean: getMean(dmQ2Data),
        median: getMedian(dmQ2Data),
        mode: getMode(dmQ2Data),
        standardDeviation: getStandardDeviation(dmQ2Data),
        kurtosis: getKurtosis(dmQ2Data),
        skewness: getSkewness(dmQ2Data),
      },
      {
        item: "dmQ3",
        total: dmQ3Data.length,
        mean: getMean(dmQ3Data),
        median: getMedian(dmQ3Data),
        mode: getMode(dmQ3Data),
        standardDeviation: getStandardDeviation(dmQ3Data),
        kurtosis: getKurtosis(dmQ3Data),
        skewness: getSkewness(dmQ3Data),
      },
      {
        item: "dmQ4",
        total: dmQ4Data.length,
        mean: getMean(dmQ4Data),
        median: getMedian(dmQ4Data),
        mode: getMode(dmQ4Data),
        standardDeviation: getStandardDeviation(dmQ4Data),
        kurtosis: getKurtosis(dmQ4Data),
        skewness: getSkewness(dmQ4Data),
      },
      {
        item: "dmQ5",
        total: dmQ5Data.length,
        mean: getMean(dmQ5Data),
        median: getMedian(dmQ5Data),
        mode: getMode(dmQ5Data),
        standardDeviation: getStandardDeviation(dmQ5Data),
        kurtosis: getKurtosis(dmQ5Data),
        skewness: getSkewness(dmQ5Data),
      },
      {
        item: "dmQ6",
        total: dmQ6Data.length,
        mean: getMean(dmQ6Data),
        median: getMedian(dmQ6Data),
        mode: getMode(dmQ6Data),
        standardDeviation: getStandardDeviation(dmQ6Data),
        kurtosis: getKurtosis(dmQ6Data),
        skewness: getSkewness(dmQ6Data),
      },
      {
        item: "dmQ7",
        total: dmQ7Data.length,
        mean: getMean(dmQ7Data),
        median: getMedian(dmQ7Data),
        mode: getMode(dmQ7Data),
        standardDeviation: getStandardDeviation(dmQ7Data),
        kurtosis: getKurtosis(dmQ7Data),
        skewness: getSkewness(dmQ7Data),
      },
      {
        item: "dmQ8",
        total: dmQ8Data.length,
        mean: getMean(dmQ8Data),
        median: getMedian(dmQ8Data),
        mode: getMode(dmQ8Data),
        standardDeviation: getStandardDeviation(dmQ8Data),
        kurtosis: getKurtosis(dmQ8Data),
        skewness: getSkewness(dmQ8Data),
      },
      {
        item: "dmQ9",
        total: dmQ9Data.length,
        mean: getMean(dmQ9Data),
        median: getMedian(dmQ9Data),
        mode: getMode(dmQ9Data),
        standardDeviation: getStandardDeviation(dmQ9Data),
        kurtosis: getKurtosis(dmQ9Data),
        skewness: getSkewness(dmQ9Data),
      },
      {
        item: "dmQ10",
        total: dmQ10Data.length,
        mean: getMean(dmQ10Data),
        median: getMedian(dmQ10Data),
        mode: getMode(dmQ10Data),
        standardDeviation: getStandardDeviation(dmQ10Data),
        kurtosis: getKurtosis(dmQ10Data),
        skewness: getSkewness(dmQ10Data),
      },
      {
        item: "dmQ11",
        total: dmQ11Data.length,
        mean: getMean(dmQ11Data),
        median: getMedian(dmQ11Data),
        mode: getMode(dmQ11Data),
        standardDeviation: getStandardDeviation(dmQ11Data),
        kurtosis: getKurtosis(dmQ11Data),
        skewness: getSkewness(dmQ11Data),
      },
      {
        item: "dmQ12",
        total: dmQ12Data.length,
        mean: getMean(dmQ12Data),
        median: getMedian(dmQ12Data),
        mode: getMode(dmQ12Data),
        standardDeviation: getStandardDeviation(dmQ12Data),
        kurtosis: getKurtosis(dmQ12Data),
        skewness: getSkewness(dmQ12Data),
      },
      {
        item: "dmQ13",
        total: dmQ13Data.length,
        mean: getMean(dmQ13Data),
        median: getMedian(dmQ13Data),
        mode: getMode(dmQ13Data),
        standardDeviation: getStandardDeviation(dmQ13Data),
        kurtosis: getKurtosis(dmQ13Data),
        skewness: getSkewness(dmQ13Data),
      },
      {
        item: "dmQ14",
        total: dmQ14Data.length,
        mean: getMean(dmQ14Data),
        median: getMedian(dmQ14Data),
        mode: getMode(dmQ14Data),
        standardDeviation: getStandardDeviation(dmQ14Data),
        kurtosis: getKurtosis(dmQ14Data),
        skewness: getSkewness(dmQ14Data),
      },
      {
        item: "dmQ15",
        total: dmQ15Data.length,
        mean: getMean(dmQ15Data),
        median: getMedian(dmQ15Data),
        mode: getMode(dmQ15Data),
        standardDeviation: getStandardDeviation(dmQ15Data),
        kurtosis: getKurtosis(dmQ15Data),
        skewness: getSkewness(dmQ15Data),
      },
      {
        item: "dmQ16",
        total: dmQ16Data.length,
        mean: getMean(dmQ16Data),
        median: getMedian(dmQ16Data),
        mode: getMode(dmQ16Data),
        standardDeviation: getStandardDeviation(dmQ16Data),
        kurtosis: getKurtosis(dmQ16Data),
        skewness: getSkewness(dmQ16Data),
      },
      {
        item: "dmQ17",
        total: dmQ17Data.length,
        mean: getMean(dmQ17Data),
        median: getMedian(dmQ17Data),
        mode: getMode(dmQ17Data),
        standardDeviation: getStandardDeviation(dmQ17Data),
        kurtosis: getKurtosis(dmQ17Data),
        skewness: getSkewness(dmQ17Data),
      },
      {
        item: "dmQ18",
        total: dmQ18Data.length,
        mean: getMean(dmQ18Data),
        median: getMedian(dmQ18Data),
        mode: getMode(dmQ18Data),
        standardDeviation: getStandardDeviation(dmQ18Data),
        kurtosis: getKurtosis(dmQ18Data),
        skewness: getSkewness(dmQ18Data),
      },
      {
        item: "dmQ19",
        total: dmQ19Data.length,
        mean: getMean(dmQ19Data),
        median: getMedian(dmQ19Data),
        mode: getMode(dmQ19Data),
        standardDeviation: getStandardDeviation(dmQ19Data),
        kurtosis: getKurtosis(dmQ19Data),
        skewness: getSkewness(dmQ19Data),
      },
      {
        item: "dmQ20",
        total: dmQ20Data.length,
        mean: getMean(dmQ20Data),
        median: getMedian(dmQ20Data),
        mode: getMode(dmQ20Data),
        standardDeviation: getStandardDeviation(dmQ20Data),
        kurtosis: getKurtosis(dmQ20Data),
        skewness: getSkewness(dmQ20Data),
      },
      {
        item: "dmQ21",
        total: dmQ21Data.length,
        mean: getMean(dmQ21Data),
        median: getMedian(dmQ21Data),
        mode: getMode(dmQ21Data),
        standardDeviation: getStandardDeviation(dmQ21Data),
        kurtosis: getKurtosis(dmQ21Data),
        skewness: getSkewness(dmQ21Data),
      },
      {
        item: "dmQ22",
        total: dmQ22Data.length,
        mean: getMean(dmQ22Data),
        median: getMedian(dmQ22Data),
        mode: getMode(dmQ22Data),
        standardDeviation: getStandardDeviation(dmQ22Data),
        kurtosis: getKurtosis(dmQ22Data),
        skewness: getSkewness(dmQ22Data),
      },
      {
        item: "dmQ23",
        total: dmQ23Data.length,
        mean: getMean(dmQ23Data),
        median: getMedian(dmQ23Data),
        mode: getMode(dmQ23Data),
        standardDeviation: getStandardDeviation(dmQ23Data),
        kurtosis: getKurtosis(dmQ23Data),
        skewness: getSkewness(dmQ23Data),
      },
      {
        item: "dmQ24",
        total: dmQ24Data.length,
        mean: getMean(dmQ24Data),
        median: getMedian(dmQ24Data),
        mode: getMode(dmQ24Data),
        standardDeviation: getStandardDeviation(dmQ24Data),
        kurtosis: getKurtosis(dmQ24Data),
        skewness: getSkewness(dmQ24Data),
      },
      {
        item: "dmQ25",
        total: dmQ25Data.length,
        mean: getMean(dmQ25Data),
        median: getMedian(dmQ25Data),
        mode: getMode(dmQ25Data),
        standardDeviation: getStandardDeviation(dmQ25Data),
        kurtosis: getKurtosis(dmQ25Data),
        skewness: getSkewness(dmQ25Data),
      },
      {
        item: "dmQ26",
        total: dmQ26Data.length,
        mean: getMean(dmQ26Data),
        median: getMedian(dmQ26Data),
        mode: getMode(dmQ26Data),
        standardDeviation: getStandardDeviation(dmQ26Data),
        kurtosis: getKurtosis(dmQ26Data),
        skewness: getSkewness(dmQ26Data),
      },
      {
        item: "dmQ27",
        total: dmQ27Data.length,
        mean: getMean(dmQ27Data),
        median: getMedian(dmQ27Data),
        mode: getMode(dmQ27Data),
        standardDeviation: getStandardDeviation(dmQ27Data),
        kurtosis: getKurtosis(dmQ27Data),
        skewness: getSkewness(dmQ27Data),
      },
      {
        item: "dmQ28",
        total: dmQ28Data.length,
        mean: getMean(dmQ28Data),
        median: getMedian(dmQ28Data),
        mode: getMode(dmQ28Data),
        standardDeviation: getStandardDeviation(dmQ28Data),
        kurtosis: getKurtosis(dmQ28Data),
        skewness: getSkewness(dmQ28Data),
      },
      {
        item: "dmQ29",
        total: dmQ29Data.length,
        mean: getMean(dmQ29Data),
        median: getMedian(dmQ29Data),
        mode: getMode(dmQ29Data),
        standardDeviation: getStandardDeviation(dmQ29Data),
        kurtosis: getKurtosis(dmQ29Data),
        skewness: getSkewness(dmQ29Data),
      },
    ];



    return {
      majorData: majorData,
      combinedTableData: combinedTableData,
    };
  });

};

export default useDataForScoreTablesItem;
