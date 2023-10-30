import { defineStore } from "pinia";
import groupBy from "lodash/groupBy";

export const useMenteesStore = defineStore("mentees", {
  state: () => ({
    allMentees: [],
    mentee: {},
  }),
  getters: {
    rawMentees(state) {
      return state.allMentees ? state.allMentees.values : [];
    },
    // menteesByDistrict() {
    //   if (this.rawMentees) {
    //     return (mentees: any) => groupBy(mentees, "district");
    //   }
    // },
    menteesByFacility() {
      if (this.rawMentees) {
        return (mentees: any) => groupBy(mentees, "facilities");
      }
    },
    menteesByGender(): any {
      if (this.rawMentees) {
        return (mentees: any) => groupBy(mentees, "gender");
      }
    },
  },
  actions: {
    async mentees() {
      const config = useRuntimeConfig();

      const { data, pending, error, refresh } = await useFetch(
        `${config.public.nestServerUrl}/mentees`
      ).then((resp) => {
        return resp;
      });

      return data.value;
    },
    async menteesByDistrict() {
      const evals = this.mentees();
      return evals.then((resp: any) => {
        return groupBy(resp, "district");
      });
    },
  },
});
