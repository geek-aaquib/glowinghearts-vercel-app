// // src/components/CountdownTimer.tsx
// 'use client'
// import { useState, useEffect } from 'react'

// interface CountdownTimerProps {
//   endDate: string | Date
// }

// export default function CountdownTimer({ endDate }: CountdownTimerProps) {
//   const target =
//     typeof endDate === 'string' ? new Date(endDate) : endDate

//   const getTimeParts = () => {
//     const diff = Math.max(target.getTime() - Date.now(), 0)
//     const totalSeconds = Math.floor(diff / 1000)
//     return {
//       days:    Math.floor(totalSeconds / 86400),
//       hours:   Math.floor(totalSeconds / 3600) % 24,
//       minutes: Math.floor(totalSeconds / 60)   % 60,
//       seconds: totalSeconds                     % 60,
//     }
//   }

//   const pad = (n: number) => String(n).padStart(2, '0')
//   const [time, setTime] = useState(getTimeParts())

//   useEffect(() => {
//     const interval = setInterval(() => setTime(getTimeParts()), 1000)
//     return () => clearInterval(interval)
//   }, [endDate])

//   return (
//     <div className="mt-2">
//       <table
//         className="
//           mx-auto
//           table-fixed
//           border-separate
//           border-spacing-x-4
//           text-center
//         "
//       >
//         <tbody>
//           {/* ─── Numbers Row ─────────────────────── */}
//           <tr className="text-3xl font-extrabold sm:text-4xl">
//             <td>{pad(time.days)}</td>
//             <td>:</td>
//             <td>{pad(time.hours)}</td>
//             <td>:</td>
//             <td>{pad(time.minutes)}</td>
//             <td>:</td>
//             <td>{pad(time.seconds)}</td>
//           </tr>

//           {/* ─── Labels Row ─────────────────────── */}
//           <tr className="text-sm font-medium text-gray-600">
//             <td>Days</td>
//             <td></td>
//             <td>Hours</td>
//             <td></td>
//             <td>Minutes</td>
//             <td></td>
//             <td>Seconds</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   )
// }


//new code to pass build
// 'use client'
// import { useState, useEffect } from 'react'

// interface CountdownTimerProps {
//   endDate: string | Date
// }

// const pad = (n: number) => String(n).padStart(2, '0')

// const getTimeParts = (target: Date) => {
//   const diff = Math.max(target.getTime() - Date.now(), 0)
//   const totalSeconds = Math.floor(diff / 1000)
//   return {
//     days:    Math.floor(totalSeconds / 86400),
//     hours:   Math.floor(totalSeconds / 3600) % 24,
//     minutes: Math.floor(totalSeconds / 60)   % 60,
//     seconds: totalSeconds                     % 60,
//   }
// }

// export default function CountdownTimer({ endDate }: CountdownTimerProps) {
//   const target = typeof endDate === 'string' ? new Date(endDate) : endDate

//   const [time, setTime] = useState(() => getTimeParts(target))

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime(getTimeParts(target))
//     }, 1000)
//     return () => clearInterval(interval)
//   }, [target])

//   return (
//     <div className="mt-2">
//       <table className="mx-auto table-fixed border-separate border-spacing-x-4 text-center">
//         <tbody>
//           <tr className="text-3xl font-extrabold sm:text-4xl">
//             <td>{pad(time.days)}</td>
//             <td>:</td>
//             <td>{pad(time.hours)}</td>
//             <td>:</td>
//             <td>{pad(time.minutes)}</td>
//             <td>:</td>
//             <td>{pad(time.seconds)}</td>
//           </tr>
//           <tr className="text-sm font-medium text-gray-600">
//             <td>Days</td>
//             <td></td>
//             <td>Hours</td>
//             <td></td>
//             <td>Minutes</td>
//             <td></td>
//             <td>Seconds</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   )
// }


//latest code
'use client'
import { useState, useEffect, useMemo } from 'react'

interface CountdownTimerProps {
  endDate: string | Date
}

export default function CountdownTimer({ endDate }: CountdownTimerProps) {
  const target = useMemo(() => {
    return typeof endDate === 'string' ? new Date(endDate) : endDate
  }, [endDate])

  const getTimeParts = () => {
    const diff = Math.max(target.getTime() - Date.now(), 0)
    const totalSeconds = Math.floor(diff / 1000)
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor(totalSeconds / 3600) % 24,
      minutes: Math.floor(totalSeconds / 60) % 60,
      seconds: totalSeconds % 60,
    }
  }

  const pad = (n: number) => String(n).padStart(2, '0')
  const [time, setTime] = useState(getTimeParts())

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeParts()), 1000)
    return () => clearInterval(interval)
  }, [target])

  return (
    <div className="mt-2">
      <table
        className="
          mx-auto
          table-fixed
          border-separate
          border-spacing-x-4
          text-center
        "
      >
        <tbody>
          {/* ─── Numbers Row ─────────────────────── */}
          <tr className="text-3xl font-extrabold sm:text-4xl">
            <td>{pad(time.days)}</td>
            <td>:</td>
            <td>{pad(time.hours)}</td>
            <td>:</td>
            <td>{pad(time.minutes)}</td>
            <td>:</td>
            <td>{pad(time.seconds)}</td>
          </tr>

          {/* ─── Labels Row ─────────────────────── */}
          <tr className="text-sm font-medium text-gray-600">
            <td>Days</td>
            <td></td>
            <td>Hours</td>
            <td></td>
            <td>Minutes</td>
            <td></td>
            <td>Seconds</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
