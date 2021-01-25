import React, { useState } from "react";
import { Minimax } from "../algorithm/Minimax";

export const Coingame = (props: any) => {
    // Variable
    const [coinCount, setCoinCount] = useState(0);
    const [aiSelect, setAiSelect] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [minimax1, setMinimax1] = useState(new Minimax(true));
    const [minimax2, setMinimax2] = useState(new Minimax(false));

    // Function
    const onButtonClick = (n: number) => {
        let currentCoinCount = coinCount + n;
        minimax1.selectNode(n);
        minimax2.selectNode(n);

        console.info(minimax2.getPossibleWin());

        // AI Turn
        if (currentCoinCount != 10) {
            let list: number[][] = [];
            let currentSmallestArraySize = 100;
            for (const path of minimax2.getPossibleWin()) {
                if (currentSmallestArraySize > path.length) {
                    currentSmallestArraySize = path.length;
                    list = [];
                }
                if (currentSmallestArraySize == path.length) {
                    list.push(path);
                }
            }

            console.info(list.length);

            const scoreDict: Map<number, number> = new Map();
            for (let e of list) {
                if (scoreDict.get(e[0]) == null) {
                    scoreDict.set(e[0], 1);
                } else {
                    var oldCount = scoreDict.get(e[0]);
                    scoreDict.set(e[0], oldCount + 1);
                }
            }

            console.info(scoreDict);

            let highestConfidentCoin = 0;
            let confidentCount = 0;
            for (const [key, val] of scoreDict) {
                if (highestConfidentCoin != key && confidentCount < val) {
                    highestConfidentCoin = key;
                    confidentCount = val;
                }

                console.info(key, val);
            }

            console.info(highestConfidentCoin);


            minimax1.selectNode(highestConfidentCoin);
            minimax2.selectNode(highestConfidentCoin);
            setCoinCount(currentCoinCount + highestConfidentCoin);

            if (currentCoinCount + highestConfidentCoin != 10) {
                setAiSelect("AI Select " + highestConfidentCoin);
            } else {
                setAiSelect("AI Select " + highestConfidentCoin + ", AI Win 😘");
                setGameOver(true);
            }
        } else {
            setCoinCount(currentCoinCount);
            setAiSelect("Player Win");
            setGameOver(true);
        }
    };

    // Render
    return <>
        <p className="currentCoin">เกมเติมเงิน💸</p>
        <p className="currentCoin">💰: {coinCount}</p>
        <p className="currentCoin">{aiSelect != "" ? aiSelect : ""}</p>

        <div className="actionBtn">
            {gameOver ? <button onClick={() => {
                minimax1.tree.selectingNode = minimax1.tree.root;
                minimax2.tree.selectingNode = minimax2.tree.root;
                setAiSelect("");
                setGameOver(false);
                setCoinCount(0);
            }} style={{width: "300px"}}>Reset</button> : <>
                    <button onClick={() => onButtonClick(1)}>1</button>
                    <button onClick={() => onButtonClick(2)}>2</button>
                    <button onClick={() => onButtonClick(5)}>5</button>
                </>}
        </div>
        <p className="coinRule">วิธีเล่น: ให้สลับกันเติมเงินครั้งละ 1 เหรียญ หากใครเติมเหรียญครบ 10 เหรียญก่อน จะเป็นฝ่ายชนะ</p>
    </>;
};
