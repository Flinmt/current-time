import { useEffect, useState } from "react";
import Edit from "@/assets/imgs/edit.png"
import * as month from 'month';
import dayjs from 'dayjs';
import Image from "next/image";
import timezones from 'timezones-list';

var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)

export default function Home() {
  const [time, setTime] = useState("")
  const [date, setDate] = useState(new Date)
  const [timeZone, setTimeZone] = useState(dayjs.tz.guess())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(dayjs().tz(timeZone))
      setDate(dayjs()['$d'])
    }, 1000);
    return () => clearInterval(intervalId)
  }, [timeZone]);

  function setZone() {
    const timezone = document.getElementById("timezone").value
    if (timezone == "Pick a timezone") {
      return
    } else {
      setTimeZone(timezone)
    }
  }

  return (
    <main className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-[#ffffff63] w-[60%] h-72 max-md:w-full max-md:h-full max-md:border-none rounded-2xl flex justify-center items-center shadow-2xl">
      <div>
        <button onClick={() => document.getElementById('my_modal_2').showModal()} className=" w-full flex items-center justify-end text-sm text-[#ffffff63] mb-1">
          <span className=" mr-2">{timeZone}</span>
          <Image src={Edit} width={18} height={18} className=" mb-1" alt="edit" />
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg mb-4">Change Timezone</h3>
            <div className=" flex align-middle">
              <select id="timezone" className="select select-bordered w-full max-w-xs mr-8">
                <option disabled selected>Pick a timezone</option>
                {getTimeZones()}
              </select>
              <form method="dialog" className=" flex justify-center align-middle">
                <button onClick={setZone}>Aplly</button>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <h1 className=" font-bold text-7xl flex items-center justify-center">
          {String(time['$H']).length == 1 ? "0" + time['$H'] : time['$H']}:{String(time['$m']).length == 1 ? "0" + time['$m'] : time['$m']}:{String(time['$s']).length == 1 ? "0" + time['$s'] : time['$s']}
        </h1>
        <span className=" w-full flex items-center justify-end text-sm font-semibold">
          {currentWeekDay(date.getDay())}, {date.getDate()} {month(date.getMonth() + 1)}, {date.getFullYear()}
        </span>
      </div>
    </main>
  );
}

function currentWeekDay(day) {
  const week = ["Moonday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  return week[day - 1]
}

function getTimeZones() {
  const zones = timezones;
  const tzCodes = []

  zones.forEach(element => {
    tzCodes.push(
      <option key={element.tzCode}>{element.tzCode}</option>
    )
  });

  return tzCodes
}