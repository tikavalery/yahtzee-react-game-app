//

class Rule {
      
      constructor() {
        
    //   this.name = name;
    //   this.year = year;
      }
      
      sum(dice) {
        // sum of all dice
        return dice.reduce((prev, curr) => prev + curr);
      }
    
      freq(dice) {
        // frequencies of dice values
        const freqs = new Map();
        for (let d of dice) freqs.set(d, (freqs.get(d) || 0) + 1);
        return Array.from(freqs.values());
      }
    
      count(dice, val) {
        // # times val appears in dice
        return dice.filter(d => d === val).length;
      }   
}  
  
class TotalOneNumber extends Rule {
    constructor(val,description) {
        super();
        this.val = val;
        this.description = description;
      }
    evalRoll = dice => {
      return this.val * this.count(dice, this.val);
    };
}
  
class SumDistro extends Rule {
    constructor(count,description) {
        super();   
        this.count = count;
        this.description = description;
      }

    evalRoll = dice => {
      // do any of the counts meet of exceed this distro?
      return this.freq(dice).some(c => c >= this.count) ? this.sum(dice) : 0;
    };
  }
  

class FullHouse extends Rule{
    constructor(score,description) {
        super();   
        this.score = score;
        this.description = description;
      }
    evalRoll = (dice) => {
      const freqs = this.freq(dice);
      return freqs.includes(2) && freqs.includes(3) ? this.score : 0;
    }
}
  
class SmallStraight extends Rule{
    constructor(score,description) {
        super();   
        this.score = score;
        this.description = description;
      }
    evalRoll = (dice) => {
      const d = new Set(dice)
      if (d.has(2) && d.has(3) && d.has(4) && d.has(1) || d.has(5))
        return this.score;
        
      if (d.has(3) && d.has(4) && d.has(5) && d.has(2) || d.has(6))
        return this.score
      
      return 0
      }
}
  
class LargeStraight extends Rule {
    constructor(score,description) {
        super();   
        this.score = score;
        this.description = description;
      }
    evalRoll = dice => {
      const d = new Set(dice);
  
      // large straight must be 5 different dice & only one can be a 1 or a 6
      return d.size === 5 && (!d.has(1) || !d.has(6)) ? this.score : 0;
    };
}
  
class Yahtzee extends Rule {
    constructor(count,description) {
        super();   
        this.count = count;
        this.description = description;
      }

    evalRoll = dice => {
        // all dice must be the same
        return this.freq(dice)[0] === 5 ? this.score : 0;
    };
}

const ones = new TotalOneNumber(1,"1 point per 1");
const twos = new TotalOneNumber( 2, "2 point per 2");
const threes = new TotalOneNumber( 3 ,"3 point per 3" );
const fours = new TotalOneNumber(  4 , "4 point per 4");
const fives = new TotalOneNumber(  5 , "5 point per 5");
const sixes = new TotalOneNumber(  6 , "6 point per 6");

// three/four of kind score as sum of all dice
const threeOfKind = new SumDistro( 3 ,  "Sum all dice if 4 are the same");
const fourOfKind = new SumDistro(  4 ,  "Sum all dice if 3 are the same");

// full house scores as flat 25
const fullHouse = new FullHouse( 25 , "25 points for a full house");

// small/large straights score as 30/40
const smallStraight = new SmallStraight(30 , "30 points for a small straight");
const largeStraight = new LargeStraight( 40 ,  "40 points for a large straight");

// yahtzee scores as 50
const yahtzee = new Yahtzee(  50 , "50 points for a yathzee");

// for chance, can view as some of all dice, requiring at least 0 of a kind
const chance = new SumDistro(0 ,  "Sum of all dice");

export {
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance
};