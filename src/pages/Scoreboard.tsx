import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

// const socket = io('http://localhost:4000'); //สำหรับทดสอบในเครื่องตัวเอง
const socket = io('http://172.20.10.2:4000'); // เปลี่ยน IP และ Port ให้ตรงกับ Back-end

const Scoreboard: React.FC = () => {
  const [team1Name, setTeam1Name] = useState('Team 1');
  const [team2Name, setTeam2Name] = useState('Team 2');
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [team1Color, setTeam1Color] = useState('blue');
  const [team2Color, setTeam2Color] = useState('green');
  const [lastScorer, setLastScorer] = useState<'team1' | 'team2' | null>(null);
  const [team1Sets, setTeam1Sets] = useState(0);
  const [team2Sets, setTeam2Sets] = useState(0);

  const prevScores = useRef<{ team1Score: number; team2Score: number }>({
    team1Score: 0,
    team2Score: 0,
  });

  // const volleyballIcon = '🏐';

  const volleyballIcon = (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-3xl"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M15.795 11.272L7.795 16.272C6.79593 16.8964 5.5 16.1782 5.5 15L5.5 5.00002C5.5 3.82186 6.79593 3.1036 7.795 3.72802L15.795 8.72802C16.735 9.31552 16.735 10.6845 15.795 11.272Z"
          fill="#000000"
        ></path>
      </g>
    </svg>

    
  );

  useEffect(() => {
    socket.on('update-score', (data) => {
      setTeam1Name(data.team1Name);
      setTeam2Name(data.team2Name);
      setTeam1Score(data.team1Score);
      setTeam2Score(data.team2Score);
      setTeam1Color(data.team1Color);
      setTeam2Color(data.team2Color);
      setTeam1Sets(data.team1Sets);
      setTeam2Sets(data.team2Sets);

      // Check if there is a change in the score and update lastScorer accordingly
      if (data.team1Score > prevScores.current.team1Score) {
        setLastScorer('team1');
      } else if (data.team2Score > prevScores.current.team2Score) {
        setLastScorer('team2');
      }

      // Update the ref to the current scores for the next comparison
      prevScores.current = {
        team1Score: data.team1Score,
        team2Score: data.team2Score,
      };
    });

    return () => {
      socket.off('update-score');
    };
  }, []);

  const getDynamicFontSize = (name: string) => {
    if (name.length > 15) return 'text-lg';
    if (name.length > 10) return 'text-xl';
    return 'text-3xl';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent text-white">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-3 min-w-[500px]">
          <span
            className={`font-semibold text-center truncate ${getDynamicFontSize(team1Name)}`}
            style={{
              width: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginLeft: '50px',
            }}
          >
            {team1Name}
          </span>
          <div
            className=""
            style={{
              backgroundColor: team1Color,
              width: '30px',
              height: '30px',
              marginLeft: '-5px',
              borderRadius: '50%',
              border: '2px solid black',
            }}
          />
          <div className="flex items-center justify-center w-12 h-12" style={{ marginLeft: '5px' }}>
            {lastScorer === 'team1' && volleyballIcon}
          </div>
          <span className="font-bold w-1/4 text-center text-black" style={{ marginLeft: '-30px' ,fontSize:'40px'}}>
            {team1Sets}
          </span>
          <span className="font-bold w-16 text-center" style={{ marginLeft: '-35px' ,fontSize:'40px'}}>
            {team1Score}
          </span>
        </div>

        <div className="flex items-center space-x-3 min-w-[500px]">
          <span
            className={`font-semibold text-center truncate ${getDynamicFontSize(team2Name)}`}
            style={{
              width: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginLeft: '50px',
            }}
          >
            {team2Name}
          </span>
          <div
            className=""
            style={{
              backgroundColor: team2Color,
              width: '30px',
              height: '30px',
              marginLeft: '-5px',
              borderRadius: '50%',
              border: '2px solid black',
            }}
          />
          <div className="flex items-center justify-center w-12 h-12" style={{ marginLeft: '5px' }}>
            {lastScorer === 'team2' && volleyballIcon}
          </div>
          <span className="font-bold w-1/4 text-center text-black" style={{ marginLeft: '-30px' ,fontSize:'40px'}}>
            {team2Sets}
          </span>
          <span className="font-bold w-16 text-center" style={{ marginLeft: '-35px' ,fontSize:'40px'}}>
            {team2Score}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
