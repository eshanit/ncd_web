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

const useDataForScoreTables = (data: any) => {
  return data.then((response: any) => {
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
    let dmQFiltered: any[] = [];

    const majorData = {
      dmQ1: {
        mentees: {
          dmQ1NotApplicableMentees: dmQ1NotApplicableMentees,
          dmQ1PoorMentees: dmQ1PoorMentees,
          dmQ1AverageMentees: dmQ1AverageMentees,
          dmQ1GoodMentees: dmQ1GoodMentees,
        },
        counts: countBy(dmQ1Data),
        statistics: {
          total: dmQ1Data.length,
          mean: mean(dmQ1Data),
          median: median(dmQ1Data),
          mode: mode(dmQ1Data),
          standardDeviation: standardDeviation(dmQ1Data),
          sampleKurtosis: sampleKurtosis(dmQ1Data),
          sampleSkewness: sampleSkewness(dmQ1Data),
        },
      },
      dmQ2: {
        mentees: {
          dmQ2NotApplicableMentees: dmQ2NotApplicableMentees,
          dmQ2PoorMentees: dmQ2PoorMentees,
          dmQ2AverageMentees: dmQ2AverageMentees,
          dmQ2GoodMentees: dmQ2GoodMentees,
        },
        counts: countBy(dmQ2Data),
        statistics: {
          mean: mean(dmQ2Data),
          median: median(dmQ2Data),
          mode: mode(dmQ2Data),
          standardDeviation: standardDeviation(dmQ2Data),
          sampleKurtosis: sampleKurtosis(dmQ2Data),
          sampleSkewness: sampleSkewness(dmQ2Data),
        },
      },
      dmQ3: {
        mentees: {
          dmQ3NotApplicableMentees: dmQ3NotApplicableMentees,
          dmQ3PoorMentees: dmQ3PoorMentees,
          dmQ3AverageMentees: dmQ3AverageMentees,
          dmQ3GoodMentees: dmQ3GoodMentees,
        },
        counts: countBy(dmQ3Data),
        statistics: {
          mean: mean(dmQ3Data),
          median: median(dmQ3Data),
          mode: mode(dmQ3Data),
          standardDeviation: standardDeviation(dmQ3Data),
          sampleKurtosis: sampleKurtosis(dmQ3Data),
          sampleSkewness: sampleSkewness(dmQ3Data),
        },
      },
      dmQ4: {
        mentees: {
          dmQ4NotApplicableMentees: dmQ4NotApplicableMentees,
          dmQ4PoorMentees: dmQ4PoorMentees,
          dmQ4AverageMentees: dmQ4AverageMentees,
          dmQ4GoodMentees: dmQ4GoodMentees,
        },
        counts: countBy(dmQ4Data),
        statistics: {
          mean: mean(dmQ4Data),
          median: median(dmQ4Data),
          mode: mode(dmQ4Data),
          standardDeviation: standardDeviation(dmQ4Data),
          sampleKurtosis: sampleKurtosis(dmQ4Data),
          sampleSkewness: sampleSkewness(dmQ4Data),
        },
      },
      dmQ5: {
        mentees: {
          dmQ5NotApplicableMentees: dmQ5NotApplicableMentees,
          dmQ5PoorMentees: dmQ5PoorMentees,
          dmQ5AverageMentees: dmQ5AverageMentees,
          dmQ5GoodMentees: dmQ5GoodMentees,
        },
        counts: countBy(dmQ5Data),
        statistics: {
          mean: mean(dmQ5Data),
          median: median(dmQ5Data),
          mode: mode(dmQ5Data),
          standardDeviation: standardDeviation(dmQ5Data),
          sampleKurtosis: sampleKurtosis(dmQ5Data),
          sampleSkewness: sampleSkewness(dmQ5Data),
        },
      },
      dmQ6: {
        mentees: {
          dmQ6NotApplicableMentees: dmQ6NotApplicableMentees,
          dmQ6PoorMentees: dmQ6PoorMentees,
          dmQ6AverageMentees: dmQ6AverageMentees,
          dmQ6GoodMentees: dmQ6GoodMentees,
        },
        counts: countBy(dmQ6Data),
        statistics: {
          mean: mean(dmQ6Data),
          median: median(dmQ6Data),
          mode: mode(dmQ6Data),
          standardDeviation: standardDeviation(dmQ6Data),
          sampleKurtosis: sampleKurtosis(dmQ6Data),
          sampleSkewness: sampleSkewness(dmQ6Data),
        },
      },
      dmQ7: {
        mentees: {
          dmQ7NotApplicableMentees: dmQ7NotApplicableMentees,
          dmQ7PoorMentees: dmQ7PoorMentees,
          dmQ7AverageMentees: dmQ7AverageMentees,
          dmQ7GoodMentees: dmQ7GoodMentees,
        },
        counts: countBy(dmQ7Data),
        statistics: {
          mean: mean(dmQ7Data),
          median: median(dmQ7Data),
          mode: mode(dmQ7Data),
          standardDeviation: standardDeviation(dmQ7Data),
          sampleKurtosis: sampleKurtosis(dmQ7Data),
          sampleSkewness: sampleSkewness(dmQ7Data),
        },
      },
      dmQ8: {
        mentees: {
          dmQ8NotApplicableMentees: dmQ8NotApplicableMentees,
          dmQ8PoorMentees: dmQ8PoorMentees,
          dmQ8AverageMentees: dmQ8AverageMentees,
          dmQ8GoodMentees: dmQ8GoodMentees,
        },
        counts: countBy(dmQ8Data),
        statistics: {
          mean: mean(dmQ8Data),
          median: median(dmQ8Data),
          mode: mode(dmQ8Data),
          standardDeviation: standardDeviation(dmQ8Data),
          sampleKurtosis: sampleKurtosis(dmQ8Data),
          sampleSkewness: sampleSkewness(dmQ8Data),
        },
      },
      dmQ9: {
        mentees: {
          dmQ9NotApplicableMentees: dmQ9NotApplicableMentees,
          dmQ9PoorMentees: dmQ9PoorMentees,
          dmQ9AverageMentees: dmQ9AverageMentees,
          dmQ9GoodMentees: dmQ9GoodMentees,
        },
        counts: countBy(dmQ9Data),
        statistics: {
          mean: mean(dmQ9Data),
          median: median(dmQ9Data),
          mode: mode(dmQ9Data),
          standardDeviation: standardDeviation(dmQ9Data),
          sampleKurtosis: sampleKurtosis(dmQ9Data),
          sampleSkewness: sampleSkewness(dmQ9Data),
        },
      },
      dmQ10: {
        mentees: {
          dmQ10NotApplicableMentees: dmQ10NotApplicableMentees,
          dmQ10PoorMentees: dmQ10PoorMentees,
          dmQ10AverageMentees: dmQ10AverageMentees,
          dmQ10GoodMentees: dmQ10GoodMentees,
        },
        counts: countBy(dmQ10Data),
        statistics: {
          mean: mean(dmQ10Data),
          median: median(dmQ10Data),
          mode: mode(dmQ10Data),
          standardDeviation: standardDeviation(dmQ10Data),
          sampleKurtosis: sampleKurtosis(dmQ10Data),
          sampleSkewness: sampleSkewness(dmQ10Data),
        },
      },
      dmQ11: {
        mentees: {
          dmQ11NotApplicableMentees: dmQ11NotApplicableMentees,
          dmQ11PoorMentees: dmQ11PoorMentees,
          dmQ11AverageMentees: dmQ11AverageMentees,
          dmQ11GoodMentees: dmQ11GoodMentees,
        },
        counts: countBy(dmQ11Data),
        statistics: {
          mean: mean(dmQ11Data),
          median: median(dmQ11Data),
          mode: mode(dmQ11Data),
          standardDeviation: standardDeviation(dmQ11Data),
          sampleKurtosis: sampleKurtosis(dmQ11Data),
          sampleSkewness: sampleSkewness(dmQ11Data),
        },
      },
      dmQ12: {
        mentees: {
          dmQ12NotApplicableMentees: dmQ12NotApplicableMentees,
          dmQ12PoorMentees: dmQ12PoorMentees,
          dmQ12AverageMentees: dmQ12AverageMentees,
          dmQ12GoodMentees: dmQ12GoodMentees,
        },
        counts: countBy(dmQ12Data),
        statistics: {
          mean: mean(dmQ12Data),
          median: median(dmQ12Data),
          mode: mode(dmQ12Data),
          standardDeviation: standardDeviation(dmQ12Data),
          sampleKurtosis: sampleKurtosis(dmQ12Data),
          sampleSkewness: sampleSkewness(dmQ12Data),
        },
      },
      dmQ13: {
        mentees: {
          dmQ13NotApplicableMentees: dmQ13NotApplicableMentees,
          dmQ13PoorMentees: dmQ13PoorMentees,
          dmQ13AverageMentees: dmQ13AverageMentees,
          dmQ13GoodMentees: dmQ13GoodMentees,
        },
        counts: countBy(dmQ13Data),
        statistics: {
          mean: mean(dmQ13Data),
          median: median(dmQ13Data),
          mode: mode(dmQ13Data),
          standardDeviation: standardDeviation(dmQ13Data),
          sampleKurtosis: sampleKurtosis(dmQ13Data),
          sampleSkewness: sampleSkewness(dmQ13Data),
        },
      },
      dmQ14: {
        mentees: {
          dmQ14NotApplicableMentees: dmQ14NotApplicableMentees,
          dmQ14PoorMentees: dmQ14PoorMentees,
          dmQ14AverageMentees: dmQ14AverageMentees,
          dmQ14GoodMentees: dmQ14GoodMentees,
        },
        counts: countBy(dmQ14Data),
        statistics: {
          mean: mean(dmQ14Data),
          median: median(dmQ14Data),
          mode: mode(dmQ14Data),
          standardDeviation: standardDeviation(dmQ14Data),
          sampleKurtosis: sampleKurtosis(dmQ14Data),
          sampleSkewness: sampleSkewness(dmQ14Data),
        },
      },
      dmQ15: {
        mentees: {
          dmQ15NotApplicableMentees: dmQ15NotApplicableMentees,
          dmQ15PoorMentees: dmQ15PoorMentees,
          dmQ15AverageMentees: dmQ15AverageMentees,
          dmQ15GoodMentees: dmQ15GoodMentees,
        },
        counts: countBy(dmQ15Data),
        statistics: {
          mean: mean(dmQ15Data),
          median: median(dmQ15Data),
          mode: mode(dmQ15Data),
          standardDeviation: standardDeviation(dmQ15Data),
          sampleKurtosis: sampleKurtosis(dmQ15Data),
          sampleSkewness: sampleSkewness(dmQ15Data),
        },
      },
      dmQ16: {
        mentees: {
          dmQ16NotApplicableMentees: dmQ16NotApplicableMentees,
          dmQ16PoorMentees: dmQ16PoorMentees,
          dmQ16AverageMentees: dmQ16AverageMentees,
          dmQ16GoodMentees: dmQ16GoodMentees,
        },
        counts: countBy(dmQ16Data),
        statistics: {
          mean: mean(dmQ16Data),
          median: median(dmQ16Data),
          mode: mode(dmQ16Data),
          standardDeviation: standardDeviation(dmQ16Data),
          sampleKurtosis: sampleKurtosis(dmQ16Data),
          sampleSkewness: sampleSkewness(dmQ16Data),
        },
      },
      dmQ17: {
        mentees: {
          dmQ17NotApplicableMentees: dmQ17NotApplicableMentees,
          dmQ17PoorMentees: dmQ17PoorMentees,
          dmQ17AverageMentees: dmQ17AverageMentees,
          dmQ17GoodMentees: dmQ17GoodMentees,
        },
        counts: countBy(dmQ17Data),
        statistics: {
          mean: mean(dmQ17Data),
          median: median(dmQ17Data),
          mode: mode(dmQ17Data),
          standardDeviation: standardDeviation(dmQ17Data),
          sampleKurtosis: sampleKurtosis(dmQ17Data),
          sampleSkewness: sampleSkewness(dmQ17Data),
        },
      },
      dmQ18: {
        mentees: {
          dmQ18NotApplicableMentees: dmQ18NotApplicableMentees,
          dmQ18PoorMentees: dmQ18PoorMentees,
          dmQ18AverageMentees: dmQ18AverageMentees,
          dmQ18GoodMentees: dmQ18GoodMentees,
        },
        counts: countBy(dmQ18Data),
        statistics: {
          mean: mean(dmQ18Data),
          median: median(dmQ18Data),
          mode: mode(dmQ18Data),
          standardDeviation: standardDeviation(dmQ18Data),
          sampleKurtosis: sampleKurtosis(dmQ18Data),
          sampleSkewness: sampleSkewness(dmQ18Data),
        },
      },
      dmQ19: {
        mentees: {
          dmQ19NotApplicableMentees: dmQ19NotApplicableMentees,
          dmQ19PoorMentees: dmQ19PoorMentees,
          dmQ19AverageMentees: dmQ19AverageMentees,
          dmQ19GoodMentees: dmQ19GoodMentees,
        },
        counts: countBy(dmQ19Data),
        statistics: {
          mean: mean(dmQ19Data),
          median: median(dmQ19Data),
          mode: mode(dmQ19Data),
          standardDeviation: standardDeviation(dmQ19Data),
          sampleKurtosis: sampleKurtosis(dmQ19Data),
          sampleSkewness: sampleSkewness(dmQ19Data),
        },
      },
      dmQ20: {
        mentees: {
          dmQ20NotApplicableMentees: dmQ20NotApplicableMentees,
          dmQ20PoorMentees: dmQ20PoorMentees,
          dmQ20AverageMentees: dmQ20AverageMentees,
          dmQ20GoodMentees: dmQ20GoodMentees,
        },
        counts: countBy(dmQ20Data),
        statistics: {
          mean: mean(dmQ20Data),
          median: median(dmQ20Data),
          mode: mode(dmQ20Data),
          standardDeviation: standardDeviation(dmQ20Data),
          sampleKurtosis: sampleKurtosis(dmQ20Data),
          sampleSkewness: sampleSkewness(dmQ20Data),
        },
      },
      dmQ21: {
        mentees: {
          dmQ21NotApplicableMentees: dmQ21NotApplicableMentees,
          dmQ21PoorMentees: dmQ21PoorMentees,
          dmQ21AverageMentees: dmQ21AverageMentees,
          dmQ21GoodMentees: dmQ21GoodMentees,
        },
        counts: countBy(dmQ21Data),
        statistics: {
          mean: mean(dmQ21Data),
          median: median(dmQ21Data),
          mode: mode(dmQ21Data),
          standardDeviation: standardDeviation(dmQ21Data),
          sampleKurtosis: sampleKurtosis(dmQ21Data),
          sampleSkewness: sampleSkewness(dmQ21Data),
        },
      },
      dmQ22: {
        mentees: {
          dmQ22NotApplicableMentees: dmQ22NotApplicableMentees,
          dmQ22PoorMentees: dmQ22PoorMentees,
          dmQ22AverageMentees: dmQ22AverageMentees,
          dmQ22GoodMentees: dmQ22GoodMentees,
        },
        counts: countBy(dmQ22Data),
        statistics: {
          mean: mean(dmQ22Data),
          median: median(dmQ22Data),
          mode: mode(dmQ22Data),
          standardDeviation: standardDeviation(dmQ22Data),
          sampleKurtosis: sampleKurtosis(dmQ22Data),
          sampleSkewness: sampleSkewness(dmQ22Data),
        },
      },
      dmQ23: {
        mentees: {
          dmQ23NotApplicableMentees: dmQ23NotApplicableMentees,
          dmQ23PoorMentees: dmQ23PoorMentees,
          dmQ23AverageMentees: dmQ23AverageMentees,
          dmQ23GoodMentees: dmQ23GoodMentees,
        },
        counts: countBy(dmQ23Data),
        statistics: {
          mean: mean(dmQ23Data),
          median: median(dmQ23Data),
          mode: mode(dmQ23Data),
          standardDeviation: standardDeviation(dmQ23Data),
          sampleKurtosis: sampleKurtosis(dmQ23Data),
          sampleSkewness: sampleSkewness(dmQ23Data),
        },
      },
      dmQ24: {
        mentees: {
          dmQ24NotApplicableMentees: dmQ24NotApplicableMentees,
          dmQ24PoorMentees: dmQ24PoorMentees,
          dmQ24AverageMentees: dmQ24AverageMentees,
          dmQ24GoodMentees: dmQ24GoodMentees,
        },
        counts: countBy(dmQ24Data),
        statistics: {
          mean: mean(dmQ24Data),
          median: median(dmQ24Data),
          mode: mode(dmQ24Data),
          standardDeviation: standardDeviation(dmQ24Data),
          sampleKurtosis: sampleKurtosis(dmQ24Data),
          sampleSkewness: sampleSkewness(dmQ24Data),
        },
      },
      dmQ25: {
        mentees: {
          dmQ25NotApplicableMentees: dmQ25NotApplicableMentees,
          dmQ25PoorMentees: dmQ25PoorMentees,
          dmQ25AverageMentees: dmQ25AverageMentees,
          dmQ25GoodMentees: dmQ25GoodMentees,
        },
        counts: countBy(dmQ25Data),
        statistics: {
          mean: mean(dmQ25Data),
          median: median(dmQ25Data),
          mode: mode(dmQ25Data),
          standardDeviation: standardDeviation(dmQ25Data),
          sampleKurtosis: sampleKurtosis(dmQ25Data),
          sampleSkewness: sampleSkewness(dmQ25Data),
        },
      },
      dmQ26: {
        mentees: {
          dmQ26NotApplicableMentees: dmQ26NotApplicableMentees,
          dmQ26PoorMentees: dmQ26PoorMentees,
          dmQ26AverageMentees: dmQ26AverageMentees,
          dmQ26GoodMentees: dmQ26GoodMentees,
        },
        counts: countBy(dmQ26Data),
        statistics: {
          mean: mean(dmQ26Data),
          median: median(dmQ26Data),
          mode: mode(dmQ26Data),
          standardDeviation: standardDeviation(dmQ26Data),
          sampleKurtosis: sampleKurtosis(dmQ26Data),
          sampleSkewness: sampleSkewness(dmQ26Data),
        },
      },
      dmQ27: {
        mentees: {
          dmQ27NotApplicableMentees: dmQ27NotApplicableMentees,
          dmQ27PoorMentees: dmQ27PoorMentees,
          dmQ27AverageMentees: dmQ27AverageMentees,
          dmQ27GoodMentees: dmQ27GoodMentees,
        },
        counts: countBy(dmQ27Data),
        statistics: {
          mean: mean(dmQ27Data),
          median: median(dmQ27Data),
          mode: mode(dmQ27Data),
          standardDeviation: standardDeviation(dmQ27Data),
          sampleKurtosis: sampleKurtosis(dmQ27Data),
          sampleSkewness: sampleSkewness(dmQ27Data),
        },
      },
      dmQ28: {
        mentees: {
          dmQ28NotApplicableMentees: dmQ28NotApplicableMentees,
          dmQ28PoorMentees: dmQ28PoorMentees,
          dmQ28AverageMentees: dmQ28AverageMentees,
          dmQ28GoodMentees: dmQ28GoodMentees,
        },
        counts: countBy(dmQ28Data),
        statistics: {
          mean: mean(dmQ28Data),
          median: median(dmQ28Data),
          mode: mode(dmQ28Data),
          standardDeviation: standardDeviation(dmQ28Data),
          sampleKurtosis: sampleKurtosis(dmQ28Data),
          sampleSkewness: sampleSkewness(dmQ28Data),
        },
      },
      dmQ29: {
        mentees: {
          dmQ29NotApplicableMentees: dmQ29NotApplicableMentees,
          dmQ29PoorMentees: dmQ29PoorMentees,
          dmQ29AverageMentees: dmQ29AverageMentees,
          dmQ29GoodMentees: dmQ29GoodMentees,
        },
        counts: countBy(dmQ29Data),
        statistics: {
          mean: mean(dmQ29Data),
          median: median(dmQ29Data),
          mode: mode(dmQ29Data),
          standardDeviation: standardDeviation(dmQ29Data),
          sampleKurtosis: sampleKurtosis(dmQ29Data),
          sampleSkewness: sampleSkewness(dmQ29Data),
        },
      },
    };

    return majorData;
  });
};

export default useDataForScoreTables;
