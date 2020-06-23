import * as React from "react";
import { Board } from "./Board";
import { Winner } from "../calculateWinner"
import { calculateWinner } from "../calculateWinner"

interface BoardState {
    moveLocation: number | null;
    squares: string[];
}

interface GameState {
    history: BoardState[];
    stepNumber: number;
    xIsNext: boolean;
    moveSortAscending: boolean;
}

export class Game extends React.Component<any, GameState> {
    constructor(props: any){
      super(props);
      this.state = {
        history: [{
          moveLocation: null,
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
        moveSortAscending: true,
      };
    }

    // Based on what square is clicked and the current board state,
    // evaluate a move and update the history
    handleClick(i : number) : void {
      const history : BoardState[] = this.state.history.slice(0, this.state.stepNumber + 1);
      const current : BoardState = history[history.length - 1];
      const squares : string[] = current.squares.slice();
      if(calculateWinner(squares) || squares[i]) {
        // Do nothing if the game has ended or this square is occupied
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          moveLocation: i,
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    // Update the current BoardState to this step of the history
    jumpTo(step : number) : void {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    // Toggle the move sorting
    toggleSort() {
      this.setState({
        moveSortAscending: !this.state.moveSortAscending,
      })
    }

    render() {
      const history : BoardState[] = this.state.history;
      const current : BoardState = history[this.state.stepNumber];
      const winner : Winner | null = calculateWinner(current.squares);

      const moves : JSX.Element[] = history.map((step : BoardState, move : number) : JSX.Element => {
        let desc = 'Game Start';
        if(move && step.moveLocation !== null) {
          const col = step.moveLocation % 3;
          const row = Math.floor(step.moveLocation / 3);
          const player = (move % 2) === 0 ? 'O' : 'X'; // We're actually labeling the move that led to this, not the next move from here
          const winner = calculateWinner(step.squares);
          let victoryDesc = '';
          if(winner)
          {
            if(winner.player === 'draw')
              victoryDesc = ' resulting in a draw';
            else
              victoryDesc = ' ftw (pwned)';
          }
          desc = 'Move #' + move + ': ' + player + ' to (' + col + ', ' + row + ')' + victoryDesc;
        }
        return (
          <li key={move} data-cy={'move ' + move}>
            <button
                className={move === this.state.stepNumber ? "current-move" : "move"}
                onClick={() => this.jumpTo(move)}
            >
              {desc}
            </button>
          </li>
        );
      });

      const movesSorted : JSX.Element[] = this.state.moveSortAscending ? moves : moves.reverse();

      let status : string;
      if(winner) {
        if(winner.player === 'draw')
          status = 'DRAW!';
        else
          status = 'Winner: ' + winner.player;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              winner={winner}
              onClick={(i) => this.handleClick(i)}
             />
          </div>
          <div className="game-info">
            <div data-cy="status">{status}</div>
            <button
                data-cy="toggleSort"
                onClick={() => this.toggleSort()}
            >
                {'Toggle Move Sort'}
            </button>
            <ul data-cy="moveList">{movesSorted}</ul>
          </div>
        </div>
      );
    }
  }