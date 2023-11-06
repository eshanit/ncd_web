
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

const useFacilityTableData = async (data: any) => {
  ///
  return data.then((response: any) => {
    const state: any = response.state.value;

    const facilities: any[] = Object.keys(state);
    const facilityEvals: any[] = Object.values(state);

    let vmFacilityEvalCounts: any[] = [];

    for (var i = 0; i <  facilityEvals.length; i++) {
      vmFacilityEvalCounts.push(facilityEvals[i].length);
    }

    /// Mentees
    const facilityNames :any[] = [];

    facilityEvals.forEach((element: any) => {
        element.forEach((el: any) => {
          facilityNames.push(
            {
              district: el.district,
              facility: el.facility,
              fullname: el.info.menteeInfo[0].firstname + ' ' + el.info.menteeInfo[0].lastname
            });
      });
    });

    const facilityDistrict: any[] = [];



    

    const facilityMentee = Object.values(groupBy(facilityNames, 'facilty')).map((element)=>{
      return uniqBy(element,(obj)=> obj.fullname)
    });

    const facilityMenteeCounts :any[] = []
  
    const facilityCountsMentee = Object.values(groupBy(facilityMentee[0], 'facility')).forEach((resp) => {
      facilityMenteeCounts.push({ count:resp.length, district: resp[0].district});
    })


    ///

    const dataTable: any[] = [];

    for (var i = 0; i < facilities.length; i++) {
      dataTable.push({
        district:facilityMenteeCounts[i].district,
        facility: facilities[i],
        evaluations: vmFacilityEvalCounts[i],
        mentees: facilityMenteeCounts[i].count,

      });
    }

    return  dataTable;
  });
};

export default useFacilityTableData;
