import { defineStore } from 'pinia'

export const useCoMentorsStore = defineStore('comentors', {
    state: () =>({
        allCoMentors: [],
        comentor: {}
    }),
    actions: {
        async comentors(){
            const config = useRuntimeConfig();
            
            const { data , pending, error, refresh } 
            = await useFetch(`${config.public.nestServerUrl}/comentors`)

            return data.value;
        }
    }
})