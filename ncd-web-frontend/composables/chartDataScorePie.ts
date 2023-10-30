import { countBy } from "lodash";

const chartDataScorePie = async (data: any) => {
  return data.then((resp: any) => {
    const state: any = resp.state.value;

    const vmIIEKnowledge = [
      parseInt(state.scores[0].dmQ1),
      parseInt(state.scores[0].dmQ2),
      parseInt(state.scores[0].dmQ3),
      parseInt(state.scores[0].dmQ4),
      parseInt(state.scores[0].dmQ5),
      parseInt(state.scores[0].dmQ6),
      parseInt(state.scores[0].dmQ7)
    ]

    const vmIIEAcquiredSkill = [
      parseInt(state.scores[0].dmQ8),
      parseInt(state.scores[0].dmQ9),
      parseInt(state.scores[0].dmQ10),
    ];

    const vmIIEBehaviour = [
      parseInt(state.scores[0].dmQ11),
      parseInt(state.scores[0].dmQ12),
      parseInt(state.scores[0].dmQ13),
    ];

    const vmMngtKnowledge = [
      parseInt(state.scores[0].dmQ14),
      parseInt(state.scores[0].dmQ15),
      parseInt(state.scores[0].dmQ16),
      parseInt(state.scores[0].dmQ17),
      parseInt(state.scores[0].dmQ18),
      parseInt(state.scores[0].dmQ19),
      // parseInt(state.scores[0].dmQ20),
      parseInt(state.scores[0].dmQ22),
    ];

    const vmMngtAcquiredSkill = [
      parseInt(state.scores[0].dmQ23),
      parseInt(state.scores[0].dmQ24),
      parseInt(state.scores[0].dmQ25),
      parseInt(state.scores[0].dmQ26),
      parseInt(state.scores[0].dmQ27),
      parseInt(state.scores[0].dmQ28),
    ];

    const vmMngtBehaviour = [parseInt(state.scores[0].dmQ29)];

    //counts

    const countScoreIIEKnowledge = countBy(vmIIEKnowledge);
    const countScoreIIEAcquiredSkill = countBy(vmIIEAcquiredSkill);
    const countScoreIIEBehaviour = countBy(vmIIEBehaviour);
    const countScoreMngtKnowledge = countBy(vmMngtKnowledge);
    const countScoreMngtAcquiredSkill = countBy(vmMngtAcquiredSkill);            
    const countScoreMngtBehaviour = countBy(vmMngtBehaviour);

    for(var i = 0 ; i < 4; i++){
        if(countScoreIIEKnowledge.hasOwnProperty(i)){

            true;

        }else{

            countScoreIIEKnowledge[i] = 0;
        }
    }
   
    for(var i = 0 ; i < 4; i++){
        if(countScoreIIEAcquiredSkill.hasOwnProperty(i)){

            true;

        }else{

            countScoreIIEAcquiredSkill[i] = 0;
        }
    }

    for(var i = 0 ; i < 4; i++){
        if(countScoreIIEBehaviour.hasOwnProperty(i)){

            true;

        }else{

            countScoreIIEBehaviour[i] = 0;
        }
    }

///hey

for(var i = 0 ; i < 4; i++){
    if(countScoreMngtKnowledge.hasOwnProperty(i)){

        true;

    }else{

        countScoreMngtKnowledge[i]= 0;
    }
}

for(var i = 0 ; i < 4; i++){
    if(countScoreMngtAcquiredSkill.hasOwnProperty(i)){

        true;

    }else{

        countScoreMngtAcquiredSkill[i] = 0;
    }
}

for(var i = 0 ; i < 4; i++){
    if(countScoreMngtBehaviour.hasOwnProperty(i)){

        true;

    }else{

        countScoreMngtBehaviour[i]= 0;
    }
}

///


    return {
      raw: {
        iieknowledge: countScoreIIEKnowledge,
        iieacquiredskill: countScoreIIEAcquiredSkill,
        iiebehaviour: countScoreIIEBehaviour,
        mngtknowledge: countScoreMngtKnowledge,
        mngtacquiredskill: countScoreMngtAcquiredSkill,
        mngtbehaviour: countScoreMngtBehaviour,
      },
      values: {
        iieknowledge: Object.values(countScoreIIEKnowledge),
        iieacquiredskill: Object.values(countScoreIIEAcquiredSkill),
        iiebehaviour: Object.values(countScoreIIEBehaviour),
        mngtknowledge: Object.values(countScoreMngtKnowledge),
        mngtacquiredskill: Object.values(countScoreMngtAcquiredSkill),
        mngtbehaviour: Object.values(countScoreMngtBehaviour),
      },
      keys: {
        iieknowledge: Object.keys(countScoreIIEKnowledge).map((el) => {
          let codes: any[] = [];
          for (let i = 0; i < el.length; i++)
            if (el[i] == "0") {
              codes[i] = "0 - Not Applicable";
            } else if (el[i] == "1") {
              codes[i] = "1 - Poor";
            } else if (el[i] == "2") {
              codes[i] = "2 - Moderate";
            } else {
              codes[i] = "3 - Competent";
            }

          return codes[0];
        }),
        iieacquiredskill: Object.keys(countScoreIIEAcquiredSkill).map((el) => {
          let codes: any[] = [];
          for (let i = 0; i < el.length; i++)
            if (el[i] == "0") {
              codes[i] = "0 - Not Applicable";
            } else if (el[i] == "1") {
              codes[i] = "1 - Poor";
            } else if (el[i] == "2") {
              codes[i] = "2 - Moderate";
            } else {
              codes[i] = "3 - Competent";
            }

          return codes[0];
        }),
        iiebehaviour: Object.keys(countScoreIIEBehaviour).map((el) => {
          let codes: any[] = [];
          for (let i = 0; i < el.length; i++)
            if (el[i] == "0") {
              codes[i] = "0 - Not Applicable";
            } else if (el[i] == "1") {
              codes[i] = "1 - Poor";
            } else if (el[i] == "2") {
              codes[i] = "2 - Moderate";
            } else {
              codes[i] = "3 - Competent";
            }

          return codes[0];
        }),
        mngtknowledge: Object.keys(countScoreMngtKnowledge).map((el) => {
          let codes: any[] = [];
          for (let i = 0; i < el.length; i++)
            if (el[i] == "0") {
              codes[i] = "0 - Not Applicable";
            } else if (el[i] == "1") {
              codes[i] = "1 - Poor";
            } else if (el[i] == "2") {
              codes[i] = "2 - Moderate";
            } else {
              codes[i] = "3 - Competent";
            }

          return codes[0];
        }),
        mngtacquiredskill: Object.keys(countScoreMngtAcquiredSkill).map(
          (el) => {
            let codes: any[] = [];
            for (let i = 0; i < el.length; i++)
              if (el[i] == "0") {
                codes[i] = "0 - Not Applicable";
              } else if (el[i] == "1") {
                codes[i] = "1 - Poor";
              } else if (el[i] == "2") {
                codes[i] = "2 - Moderate";
              } else {
                codes[i] = "3 - Competent";
              }

            return codes[0];
          }
        ),
        mngtbehaviour: Object.keys(countScoreMngtBehaviour).map((el) => {
          let codes: any[] = [];
          for (let i = 0; i < el.length; i++)
            if (el[i] == "0") {
              codes[i] = "0 - Not Applicable";
            } else if (el[i] == "1") {
              codes[i] = "1 - Poor";
            } else if (el[i] == "2") {
              codes[i] = "2 - Moderate";
            } else {
              codes[i] = "3 - Competent";
            }

          return codes[0];
        }),
      },
    };
  });
};

export default chartDataScorePie;
