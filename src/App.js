import React, { Component } from "react";
import MinionCard from "./components/MinionCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Footer from "./components/Footer";
import Alert from "./components/Alert";
import Guess from "./components/Guess";
import minions from "./minions.json";

// ======== shuffle way1 ========:
// 建立一个 window 的 global 的函数,
// 在 handleClick 中 call 这个函数 minions.shuffle().
Array.prototype.shuffle = function () {
  let i = this.length, j, temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));

    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
    // Or:
    // [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
}
// console.log(minions.shuffle());

// ======== shuffle way2-1 ========:
// 建立一个 global 的函数function shuffleArr(array),
// 在 handleClick 中 call handleShuffle1,
// 函数如下:
// function shuffleArr(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };




class App extends Component {
  state = {
    minions,
    score: 0,
    topScore: 0,
    clickedArr: [],
    alert: false
  };

  handleAlert = () => {
    this.setState({
      guess: false,
      alert: false,
      score: 0,
      clickedArr: [],
    });
  }


  handleClick = id => {
    if (this.state.clickedArr.indexOf(id) === -1) {

      // question 1:
      this.state.clickedArr.push(id);
      // const newArr = this.state.clickedArr.push(id);

      // question 3: why concat(id)? id is array?
      // this.setState({ clickedArr: this.state.clickedArr.concat(id) });
      // console.log(this.state.clickedArr)

      this.setState(
        {
          score: this.state.score + 1,
          guess: true
        },
        () => {
          console.log(this.state.score)
          // question2: why not update score in log and in top score?
          // Please check react setState callback documentation.
          if (this.state.score > this.state.topScore) {
            this.setState({ topScore: this.state.score });
          }
          if (this.state.score === 12) {
            alert("you win");
            this.setState({
              score: 0,
              clickedArr: []
            });
          }
        }
        // clickedArr: newArr
      );
    }

    else {
      // alert("you lose");
      this.setState({
        score: 0,
        clickedArr: [],
        alert: true,
        guess: false
      });
    }

    minions.shuffle();
    // this.handleShuffle1();
    // this.handleShuffle2();
  };

  // ======== shuffle way2-2 ========:
  // 在 handleShuffle 中设一个变量 let shuffleArr 等于 2-1 中建立的函数 shuffleArr(minions)
  // 并 重新 set state 中的 minions 为 shuffle 后的顺序 minions: shuffleArr
  //
  // handleShuffle1 = () => {
  //   let shuffleArr = shuffleArr(minions);
  //   console.log(shuffleArr)
  //   this.setState({ minions: shuffleArr });
  // };
  // 完成.

  // ======== shuffle way3-1 ========:
  // 在 Component App 这个 constructor 中建立函数function shuffleMinions(array),
  // 在 handleClick 中 call handleShuffle2,
  // 函数如下:
  // shuffleArr = (array) => {
  //   let i = array.length, j, temp;
  //   while (--i > 0) {
  //     j = Math.floor(Math.random() * (i + 1));

  //     temp = array[j];
  //     array[j] = array[i];
  //     array[i] = temp;
  //     // Or:
  //     // [this[i], this[j]] = [this[j], this[i]];
  //   }
  //   return array;
  // }
  // ======== shuffle way3-2 ========:
  // 在 handleShuffle 中设一个变量 let shuffleArr 等于 3-1 中建立的函数 this.shuffleArr(minions)
  // 注意 由于那个函数是在同路径下, 即 App 这个 constructor 下, 所以 call 的时候加 this.
  // 并 重新 set state 中的 minions 为 shuffle 后的顺序 minions: shuffleArr
  //
  // handleShuffle2 = () => {
  //   let shuffleMinions = this.shuffleMinions(minions);
  //   console.log(shuffleMinions)
  //   this.setState({ minions: shuffleMinions });
  // };
  // 完成.

  render() {
    return (
      <Wrapper>
        <Title
          score={this.state.score}
          topScore={this.state.topScore}
        />
        {/* question 4 js in jsx? */}

        {this.state.alert ? <Alert handleAlert={this.handleAlert} /> : console.log("no alert")}
        {this.state.guess ? <Guess guessRight={this.guess} /> : console.log("incorrect")}


        {this.state.minions.map(minion => (
          <MinionCard
            key={minion.id}
            id={minion.id}
            image={minion.image}
            handleClick={this.handleClick}
          />
        ))}

        <Footer>Copyright © 2019 Isaac Wu</Footer>
      </Wrapper>
    );
  }
}

export default App;
