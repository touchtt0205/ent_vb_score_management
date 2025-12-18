// import React from 'react';

// interface HistoryMatchProps {
//   currentSet: number;
//   team1Sets: number;
//   team2Sets: number;
//   team1SetsHistory?: number[];
//   team2SetsHistory?: number[];
// }

// const HistoryMatch: React.FC<HistoryMatchProps> = ({
//   currentSet,
//   team1Sets,
//   team2Sets,
//   team1SetsHistory = [],
//   team2SetsHistory = []
// }) => {
//   return (
//     <div className="mt-6 space-y-4">
//       {/* Completed Set Scores */}
//       <div>
//         <h2 className="text-2xl font-semibold">Set Scores</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">Set</th>
//                 <th className="py-2 px-4 border-b">Team 1 Score</th>
//                 <th className="py-2 px-4 border-b">Team 2 Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[...Array(currentSet - 1)].map((_, index) => {
//                 // For each completed set, show the scores
//                 const setNumber = index + 1;
//                 const team1SetScore = team1SetsHistory[setNumber - 1] || 0;
//                 const team2SetScore = team2SetsHistory[setNumber - 1] || 0;
//                 return (
//                   <tr key={setNumber} className="hover:bg-gray-700">
//                     <td className="py-2 px-4 border-b text-center">{setNumber}</td>
//                     <td className="py-2 px-4 border-b text-center">{team1SetScore}</td>
//                     <td className="py-2 px-4 border-b text-center">{team2SetScore}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Current Set Information */}
//       <div className="mt-4">
//         <p className="text-xl">Current Set: {currentSet}</p>
//         <p className="text-lg">Team 1 Sets: {team1Sets}</p>
//         <p className="text-lg">Team 2 Sets: {team2Sets}</p>
//       </div>
//     </div>
//   );
// };

// export default HistoryMatch;
