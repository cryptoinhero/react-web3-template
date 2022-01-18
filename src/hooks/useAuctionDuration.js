import { useEffect, useState } from "react"

const useAuctionDuration = (startTime, endTime) => {
  const [status, setStatus] = useState('')
  const [statusInfo, setStatusInfo] = useState('')
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if(!startTime || !endTime) return
    if(endTime < new Date().getTime() / 1000) {
      setStatusInfo('Auction has ended')
      setStatus('ended')
      return;
    }

    const interval = setInterval(async () => {
      const currentTimestamp = new Date().getTime()
      let countdownDate = 0

      if(startTime * 1000 > currentTimestamp) {
        countdownDate = startTime * 1000;
        setStatusInfo('Auction starting in')
        setStatus('not_started')
      } else if(endTime * 1000 > currentTimestamp) {
        countdownDate = endTime * 1000;
        setStatusInfo('Auction ending in')
        setStatus('progressing')
      } else {
        setStatusInfo('Auction has ended')
        setStatus('ended')
      }

      if (countdownDate) {
        const distanceToDate = countdownDate - currentTimestamp;

        let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor(
          (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
        );
        let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

        days = `${days}`;
        if (hours < 10) hours = `0${hours}`
        if (minutes < 10) minutes = `0${minutes}`
        if (seconds < 10) seconds = `0${seconds}`

        setState({ days: days, hours: hours, minutes, seconds });
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [startTime, endTime])

  return {
    status,
    statusInfo,
    state
  }
}

export default useAuctionDuration
