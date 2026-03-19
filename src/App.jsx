import { useState } from 'react'


function App() {
  const [score, setScore] = useState(0)
  const [lizardSpok, setLizardSpok] = useState(false)
  const [boardChoice, setBoardChoice] = useState(["Pierre","Feuille","Ciseau"])
  const [winner, setWinner] = useState(null)
  const [botChoices,setBotChoices] = useState(null)

  function reset(){
    setScore(0)
  }

  function changeList(){
    if(!lizardSpok){
      setBoardChoice(["Pierre","Feuille","Ciseau","Lezard", "Spok"])
    }else{
      setBoardChoice(["Pierre","Feuille","Ciseau"])
    }
  }

  function gameLizardSpok(){
    setLizardSpok(!lizardSpok)
    changeList()
    setScore(0)
  }

  function botChoice(){
    return boardChoice[Math.floor(Math.random() * boardChoice.length)]
  }

  function handleClick(playerChoice){
    const constBotChoice=botChoice()
    setBotChoices(constBotChoice)

    if(playerChoice===constBotChoice)
      setWinner("None")

    else if((playerChoice==="Pierre" && (constBotChoice ==="Ciseau"|| constBotChoice==="Lezard"))||
      (playerChoice==="Feuille" && (constBotChoice ==="Pierre"|| constBotChoice==="Spok"))||
      (playerChoice==="Ciseau" && (constBotChoice ==="Feuille"|| constBotChoice==="Lezard"))||
      (playerChoice==="Lezard" && (constBotChoice ==="Spok"|| constBotChoice==="Feuille"))||
      (playerChoice==="Spok" && (constBotChoice ==="Ciseau"|| constBotChoice==="Pierre"))
      ){
        setScore(score+1) 
        setWinner("Joueur")
    }
    else
      setWinner("Bot")
  }

  return (
    <div className="game">
      <h1>{!lizardSpok?"Pierre Feuille Ciseau":"Pierre Feuille Ciseau Lézard Spok"}</h1>

      <p className="score">Votre Score : {score}</p>
      <p>{botChoices?<span>Choix du bot :{botChoices}</span>:""}</p>
      <p className="status">
        {winner ? (winner!="None"?
        <span>Gagnant : {winner}</span>:"Match Nul !") 
        : ""}
      </p>
      <div className="board">
        {boardChoice.map((cell,i)=>(
          <button key={i} name="pad" className="cell" onClick={()=>handleClick(cell)}>
            {cell}
          </button>
        ))}
      </div>
      <button className="reset" onClick={reset}>Rejouer</button>

      <button className="reset" onClick={gameLizardSpok}>{!lizardSpok ? (
        <span>Jouer en mode Lezard Spok</span>) 
        :<span>Jouer en classique</span>}</button>
      
    </div>
  )
}

export default App
