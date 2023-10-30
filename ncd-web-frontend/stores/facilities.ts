import { defineStore } from 'pinia'
import { useDistrictStore } from './districts'

export const useFacilityStore = defineStore('facilities', {
    state: () =>({
        allFacilities: [],
        facility: {}
    }),
    actions: {
         facilities(){
            const districtStore = useDistrictStore();

            const districts = districtStore.districts();

            const facilities = districts.then(
                (resp: any) => {
                    let vm = [];

                    for (var i = 0; i < resp.length; i++ ){
                        vm.push(resp[i].facilities)
                    }

                    return vm.flat()
                }
            )

            return facilities;

        }
    }
})