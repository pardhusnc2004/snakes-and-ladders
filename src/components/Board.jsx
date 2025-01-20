import React, { useState } from 'react'

const Board = ({ players }) => {
    const board = [];
    for(let x=9; x>=0; x--) {
        const tmp = [];
        for(let y=1; y<=10; y++) tmp.push(10*x+y);
        if(x&1 == 1) {
            tmp.reverse();
        }
        board.push(tmp);
    }
    
    const snakes = {
        16: 6,
        46: 25,
        49: 11,
        87: 19,
        93: 11
    };
    
    const ladders = {
        2: 38,
        7: 14,
        21: 42,
        28: 84
    };
    

    const checkPlayerInPositions = (col) => {
        let color = "bg-teal-300";
        for (let i = 0; i < position.length; i++) {
            if (position[i] === col) {
                switch (players[i].color) {
                    case "red":
                      color = "bg-red-600";
                      break;
                    case "blue":
                      color = "bg-blue-600";
                      break;
                    case "green":
                      color = "bg-green-600";
                      break;
                    case "yellow":
                      color = "bg-yellow-600";
                      break;
                    case "purple":
                      color = "bg-purple-600";
                      break;
                    case "pink":
                      color = "bg-pink-600";
                      break;
                    case "indigo":
                      color = "bg-indigo-600";
                      break;
                    case "teal":
                      color = "bg-teal-600";
                      break;
                    case "cyan":
                      color = "bg-cyan-600";
                      break;
                    case "orange":
                      color = "bg-orange-600";
                      break;
                    case "amber":
                      color = "bg-amber-600";
                      break;
                    case "lime":
                      color = "bg-lime-600";
                      break;
                    case "emerald":
                      color = "bg-emerald-600";
                      break;
                    case "fuchsia":
                      color = "bg-fuchsia-600";
                      break;
                    case "rose":
                      color = "bg-rose-600";
                      break;
                    default:
                      color = "bg-teal-300";
                  }
                  
            }
        }
        return color;
    };

    const RenderBoard = () => {
        return (
            board.map((row, idx) => (
                <div className='flex flex-row' key={idx}>
                    {row.map((col, idx2) => {
                        return (
                            <div className={`pt-3 text-center board-box ${checkPlayerInPositions(col)}`} key={idx2}>{col}</div>
                        );
                    })}
                </div>
            ))
        );
    }

    let positions = [];
    let started = [];
    for(let i=0; i<players.length; i++) {
        positions.push(0);
        started.push(false);
    }

    const [player, setPlayer] = useState(0)
    const [position, setPosition] = useState(positions);
    const [rolledNumber, setRolledNumber] = useState(0);
    const [start, setStart] = useState(started);
    const [gameOver, setGameOver] = useState(false)

    const handleRollClick = () => {
        const rand = Math.max(1, Math.min(6, parseInt(Math.random()*7)))
        setRolledNumber(rand)
        if(start[player] === false) {
            if(rand == 6) {
                const getNewStarted = () => {
                    let st = [...start];
                    for(let i=0; i<st.length; i++) {
                        if(i == player) st[i] = true;
                    }
                    return st;
                }
                setStart(getNewStarted());
            }
            else {
                // do-nothing
            }
        } else {
            const getNewPositions = () => {
                let pos = [...position];
                for(let i=0; i<pos.length; i++) {
                    if(i == player) {
                        if(pos[i] + rand <= 100) {
                            pos[i] += rand;
                            if(pos[i] in snakes) {
                                pos[i] = snakes[pos[i]]
                            }
                            if(pos[i] in ladders) {
                                pos[i] = ladders[pos[i]]
                            }
                        }
                        if(pos[i] == 100) {
                            setGameOver(true)
                            return;
                        }
                    }
                }
                return pos;

            }
            setPosition(getNewPositions());
        }
        setPlayer((player+1)%players.length);
    }

    return (
        (gameOver)?<div className='px-6 py-3'>
        <div className='text-center py-2 text-5xl font-bold text-red-700'>{players[player].name} <span className='text-yellow-500'>Won</span></div></div>:<div className='px-6 py-3'>
        <div className='text-center py-2 text-5xl font-bold text-red-700'>Snakes & <span className='text-yellow-500'>Ladders</span></div>
        <div className='flex items-center align-middle justify-center space-x-10'>
            <div className='grid'>
                <RenderBoard />
            </div>
        </div>

        <div className='grid items-center justify-center py-5'>
            <div className='items-center justify-center text-center'><span className='text-red-700 font-semibold'>{players[player].name}</span></div>
            <button className='btn bg-yellow-500 rounded-lg px-5 py-2 text-red-700 font-bold w-56' onClick={handleRollClick}>ROLL</button>
            <div className='items-center justify-center text-center'><span className='text-red-700 font-semibold'>{rolledNumber}</span></div>
        </div>
    </div>
    )
}


export default Board