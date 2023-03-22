import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const gameBoard = [...Array(9).map((v, idx) => {
    return (
      <div key={idx} className="square">
        X
      </div>
    );
  })]

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className='game'>
        <div className='game_menu'>
          <p>xTurn</p>
        </div>
        <div className='game_board'>
          {gameBoard}
        </div>
      </div>
    </div>
  );
}
