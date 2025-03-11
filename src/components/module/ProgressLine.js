// "use client"

// import { useSpring, animated } from 'react-spring';

// const ProgressLine = ({ rate }) => {
//     const clampedRating = Math.max(0, Math.min(rate, 10))
//     const progress = (clampedRating / 10) * 100

//     const props = useSpring({
//       width: `${progress}%`,
//       from: { width: "0%" },
//       config: { duration: 500 },
//     })

//   return (
//     <div
//       style={{
//         width: "100px",
//         backgroundColor: "#e0e0e0",
//         borderRadius: "5px",
//         overflow: "hidden",
//       }}
//     >
//       <animated.div
//         style={{
//           ...props,
//           height: "6px",
//           backgroundColor: "#6174fe",
//         }}
//       />
//     </div>
//   )
// };

// export default ProgressLine;
