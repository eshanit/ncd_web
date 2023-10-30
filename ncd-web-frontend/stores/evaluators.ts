import { defineStore } from 'pinia'

export const useEvaluatorsStore = defineStore('evaluators', {
    state: () =>({
        allCoMentors: [],
        comentor: {}
    }),
    actions: {
        async evaluators(){
            const config = useRuntimeConfig();
            
            const { data , pending, error, refresh } 
            = await useFetch(`${config.public.nestServerUrl}/evaluators`)

            return data.value;
        }
    }
})