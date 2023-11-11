import { defineStore } from "pinia";
import groupBy from "lodash/groupBy";
import { format } from "date-fns";

export const useEvaluationsStore = defineStore("evaluations", {
  state: () => ({
    allEvaluations: [],
    evaluations: {},
  }),
  getters: {
    rawEvaluations(state) {
      return state.allEvaluations ? state.allEvaluations.values : [];
    },
    getEvaluations: (state): any => {
      return state.allEvaluations ? state.allEvaluations.values : {};
    },
    evaluationsByMentee(): any {
      if (this.rawEvaluations) {
        return (evals: any) => groupBy(evals, "menteeId");
      }
    },
    evaluationsByEvaluator(): any {
      if (this.rawEvaluations) {
        return (evals: any) => groupBy(evals, "evaluatorId");
      }
    },
  },

  actions: {
    async evaluations() {
      const config = useRuntimeConfig();

      const { data, pending, error, refresh } = await useFetch(
        `${config.public.nestServerUrl}/evaluations`
      );

      return data.value;
    },
    async menteeEval(menteeId: string) {
      return this.evaluations().then((resp: any) => {
        return resp.filter(
          (mentee: any) => mentee.info.menteeInfo[0].id === menteeId
        );
      });
    },
    async groupedByMentees() {
      const evals = this.evaluations;
      return groupBy(evals, "menteeId");
    },
    async getMenteeEvals(menteeId: string | string[]) {
      const config = useRuntimeConfig();

      const { data, pending, error, refresh } = await useFetch(
        `${config.public.nestServerUrl}/evaluations/mentee/${menteeId}`
      );

      return data.value;
    },
    async getEval(scoreId: string | string[]) {
      /** possible bug  returning 1's from dmQ1 to dmQ13 */
      const config = useRuntimeConfig();
      const { data, pending, error, refresh } = await useFetch(
        `${config.public.nestServerUrl}/evaluations/${scoreId}`
      );
      return data.value;
    },
    async groupedByDistricts() {
      const evals = this.evaluations();

      return evals.then((resp: any) => {
        return groupBy(resp, "district");
      });
    },
    async groupedByFacility() {
      const evals = this.evaluations();

      return evals.then((resp: any) => {
        return groupBy(resp, "facility");
      });
    },
    async getEvalByDistrict(district: string | string[]) {
      const evals = this.evaluations();
      return evals.then((resp: any) => {
        return resp.filter(
          (evaluation: any) => evaluation.district === district
        );
      });
    },
    async getEvalByFacility(facility: string | string[]) {
      const evals = this.evaluations();
      return evals.then((resp: any) => {
        return resp.filter(
          (evaluation: any) => evaluation.facility === facility
        );
      });
    },
    async getEvalByEvaluator(evaluatorId: string | string[]) {
      const evals = this.evaluations();
      return evals.then((resp: any) => {
        return resp.filter(
          (evaluation: any) =>
            evaluation.info.evaluatorInfo[0].id === evaluatorId
        );
      });
    },
    async getIncompleteEvals() {
      const config = useRuntimeConfig();

      const { data, pending, error, refresh } = await useFetch(
        `${config.public.nestServerUrl}/incomplete`
      );

      return data.value;
    },

    async getDownloadableData() {
      const evals = this.evaluations();
      return evals.then((resp: any) => {
        let vm: any[] = [];

         resp.forEach((el: any) => {
          vm.push({
            firstname: el.info.menteeInfo[0].firstname,
            lastname: el.info.menteeInfo[0].lastname,
            gender: el.info.menteeInfo[0].gender,
            district: el.info.menteeInfo[0].district,
            facility: el.info.menteeInfo[0].facility,
            date: format(new Date(el.info.evaluationDate), "dd-MMM-yyyy"),
            dmQ1: el.scores[0].dmQ1,
            dmQ2: el.scores[0].dmQ2,
            dmQ3: el.scores[0].dmQ3,
            dmQ4: el.scores[0].dmQ4,
            dmQ5: el.scores[0].dmQ5,
            dmQ6: el.scores[0].dmQ6,
            dmQ7: el.scores[0].dmQ7,
            dmQ8: el.scores[0].dmQ8,
            dmQ9: el.scores[0].dmQ9,
            dmQ10: el.scores[0].dmQ10,
            dmQ11: el.scores[0].dmQ11,
            dmQ12: el.scores[0].dmQ12,
            dmQ13: el.scores[0].dmQ13,
            dmQ14: el.scores[0].dmQ14,
            dmQ15: el.scores[0].dmQ15,
            dmQ16: el.scores[0].dmQ16,
            dmQ17: el.scores[0].dmQ17,
            dmQ18: el.scores[0].dmQ18,
            dmQ19: el.scores[0].dmQ19,
            dmQ20: el.scores[0].dmQ20,
            dmQ21: el.scores[0].dmQ21,
            dmQ22: el.scores[0].dmQ22,
            dmQ23: el.scores[0].dmQ23,
            dmQ24: el.scores[0].dmQ24,
            dmQ25: el.scores[0].dmQ25,
            dmQ26: el.scores[0].dmQ26,
            dmQ27: el.scores[0].dmQ27,
            dmQ28: el.scores[0].dmQ28,
            dmQ29: el.scores[0].dmQ29,
          });
        });

        return vm

      });
    },
  },
});
