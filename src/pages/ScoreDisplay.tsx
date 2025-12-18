import React from 'react';

interface ScoreDisplayProps {
  teamName: string;
  teamColor: string;
  score: number;
  sets: number;
  isLastScorer: boolean;
  volleyballIcon: string;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  teamName,
  teamColor,
  score,
  sets,
  isLastScorer,
  volleyballIcon,
}) => {
  const getDynamicFontSize = (name: string) => {
    if (name.length > 15) return 'text-lg';
    if (name.length > 10) return 'text-xl';
    return 'text-3xl';
  };

  return (
    <div className="flex items-center space-x-2 min-w-[500px] ">
      <span
        className={`font-semibold text-center truncate ${getDynamicFontSize(teamName)}`}
        style={{
          width: '200px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {teamName}
      </span>
      <div className="w-6 h-6" style={{ backgroundColor: teamColor }} />
      <div className="flex items-center justify-center w-12 h-12">
        {isLastScorer && <span className="text-3xl">{volleyballIcon}</span>}
      </div>
      <span className="text-5xl font-bold w-1/4 text-center">{sets}</span>
      <span className="text-5xl font-bold w-1/4 text-center">{score}</span>
      
    </div>
  );
};

export default ScoreDisplay;
