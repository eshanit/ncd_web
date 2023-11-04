const  evaluatorEvalsTable = ( data: any ) => {

    return data.then((response: any) => {
        
        const state: any = response.state.value;
        
        let scoreData: any[] = [];

        state.forEach((score: any) => {
                scoreData.push({
                    evalId: score._id,
                    evalInfo: score.info.evaluatorInfo[0].firstname+' '+score.info.evaluatorInfo[0].surname,
                    menteeId: score.info.menteeInfo[0].id,
                    menteeFirstname: score.info.menteeInfo[0].firstname,
                    menteeLastname: score.info.menteeInfo[0].lastname,
                    numCoMentors: score.info.comentorInfo.length,
                    mennteeMeanScore: score.scoreStats.totalaverageScore
                })
        
        })

        return scoreData;

    })

}

export default evaluatorEvalsTable