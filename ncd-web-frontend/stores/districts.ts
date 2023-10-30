import { defineStore } from 'pinia'

export const useDistrictStore = defineStore('districts', {
    state: () =>({
        allDistricts: [],
        district: {}
    }),
    actions: {
        async districts(){
            const config = useRuntimeConfig();
            
            const { data , pending, error, refresh } 
            = await useFetch(`${config.public.nestServerUrl}/districts`)

            return data.value;
        }
    }
})