import EventsStats from "./EventStats"
import EventsUI from "./EventUI"

export const EventSectionIndex = () => {
  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-20 lg:pb-8">
      <EventsStats />
      <EventsUI />
    </div>
  )
}
