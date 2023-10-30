/**
 * {
 * district,
 * facilities (count),
 * total number of mentees
 * evaluations
 * }
 *
 * {
 * district: Zaka,
 * facilitire: 3,
 * mentees: 18,
 * evaluations: 59
 * }
 */

const useDistructTableData = async (district: any, mentee: any) => {
  //district
  const districtData = district.then((response: any) => {
    const state = response.state.value;
    let vmDistricts: any[] = [];
    let vmFacilities: any[] = [];

    for (var i = 0; i < state.length; i++) {
      vmDistricts.push(state[i].district);
      vmFacilities.push(state[i].facilities);
    }

    return {
      districts: vmDistricts,
      facilities: vmFacilities,
    };
  });

  //mentees

  const menteeData = mentee.then((response: any) => {
    const state = response.state.value;
    let vmDistrictMenteeCounts: any[] = []

    const districts: any[] = Object.keys(state)
    const districtMentees: any[] = Object.values(state)

    for(var i = 0; i < districtMentees.length; i++){
       vmDistrictMenteeCounts.push(districtMentees[i].length)
    }

    return {
      districtsFromMentees: districts,
      menteesInDistrict: districtMentees ,
      districtMenteeCounts: vmDistrictMenteeCounts
    } ;

  });

  return menteeData; 
};

export default useDistructTableData;
