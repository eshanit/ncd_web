
import { groupBy, uniqBy } from "lodash";
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

const useDistructTableData = async (data: any) => {
  ///
  return data.then((response: any) => {
    const state: any = response.state.value;

    const districts: any[] = Object.keys(state);
    const districtEvals: any[] = Object.values(state);

    let vmDistrictEvalCounts: any[] = [];

    for (var i = 0; i < districtEvals.length; i++) {
      vmDistrictEvalCounts.push(districtEvals[i].length);
    }

    /// Mentees
    const distNames :any[] = [];

    districtEvals.forEach((element: any) => {
        element.forEach((el: any) => {
          distNames.push(
            {

              district: el.district,
              facility: el.facility,
              fullname: el.info.menteeInfo[0].firstname + ' ' + el.info.menteeInfo[0].lastname
            });
      });
    });

    const districtMenteeCounts = Object.values(groupBy(distNames, 'district')).map((element)=>{
      return uniqBy(element,(obj)=> obj.fullname).length
    });

    const districtFacilityCounts = Object.values(groupBy(distNames, 'district')).map((element)=>{
      return uniqBy(element,(obj)=> obj.facility).length
    });
  

    ///

    const dataTable: any[] = [];

    for (var i = 0; i < districts.length; i++) {
      dataTable.push({
        district: districts[i],
        evaluations: vmDistrictEvalCounts[i],
        mentees: districtMenteeCounts[i],
        facilities: districtFacilityCounts[i]
      });
    }

    return dataTable;
  });
};

export default useDistructTableData;
