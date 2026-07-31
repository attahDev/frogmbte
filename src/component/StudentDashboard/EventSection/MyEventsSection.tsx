import EventsStats from "./EventStats"
import MyEventsUI from "./MyEventsUI"

export const MyEventsSectionIndex = () => {
  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-20 lg:pb-8">
      <EventsStats />
      <MyEventsUI />
    </div>
  )
}
