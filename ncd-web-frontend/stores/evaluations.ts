import { defineStore } from "pinia";
import groupBy from "lodash/groupBy";

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
        return (evals: any) =>groupBy(evals, "menteeId") 
      }
    },
    evaluationsByEvaluator(): any {
      if (this.rawEvaluations) {
        return (evals: any) =>groupBy(evals, "evaluatorId") 
      }
    }
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
      )

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
      
      return evals.then((resp: any)=>{
        return groupBy(resp, 'district')
      })
    },
    async groupedByFacility() {
      const evals = this.evaluations();
      
      return evals.then((resp: any)=>{
        return groupBy(resp, 'facility')
      })
    },
    async getEvalByDistrict(district: string | string[]){
      const evals = this.evaluations()
      return evals.then((resp: any)=>{
        return resp.filter((evaluation: any) => evaluation.district === district);
      })
    },
    async getEvalByEvaluator(evaluatorId: string | string[]){
      const evals = this.evaluations()
      return evals.then((resp: any)=>{
        return resp.filter((evaluation: any) => evaluation.info.evaluatorInfo[0].id === evaluatorId);
      })
    }
    ,
    async getIncompleteEvals(){
      const config = useRuntimeConfig();

      const { data, pending, error, refresh } = await useFetch(
        `${config.public.nestServerUrl}/incomplete`
      );

      return data.value;
    }
  },
});
