import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      ////  array,fill creates and array with a number of spaces passed as an argument and assigns values to them 
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      rolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
      
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this)
    this.animateRoll = this.animateRoll.bind(this)
  }
  componentDidMount() {
    
    this.animateRoll();
  }
  animateRoll() {
    this.setState({ rolling: true }, () => {
      setTimeout(this.roll, 1000)
    })
  }
  roll(evt) {
    
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false
    }) );
   
  
  }

  toggleLocked(idx) {

    if (this.state.rollsLeft !==0 && !this.state.rolling) {
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  
  }

  doScore(rulename, ruleFn) {
    console.log(this.state.scores)
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false)
    }));
    this.roll();
  }

  displayRollInfo() {
    const messages = [
      "O Rolls Left",
      "1 Roll Left",
      "2 Rolls Left",
      "Starting Round"
    ]
    return messages[this.state.rollsLeft]
  }
   


  render() {
  
    
    const { dice, locked, rollsLeft, rolling, scores } = this.state
  
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h2 className='App-title'>Yahtzee!</h2>

          <section className='Game-dice-section'>
            <Dice
              dice={dice}
              locked={locked}
              handleClick={this.toggleLocked}
              disabled={rollsLeft === 0}
              rolling={rolling}
            />
            <div className='Game-button-wrapper'>
              <button
                className='Game-reroll'
                disabled={this.state.locked.every(x => x) ||
                  this.state.rollsLeft === 0 ||
                  this.state.rolling}
                onClick={this.animateRoll}
              >
                {this.displayRollInfo()}
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={scores} />
      </div>
    );
  }
}

export default Game;
