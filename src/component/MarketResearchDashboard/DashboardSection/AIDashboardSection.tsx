import DashboardActivity from './AIDashboardActivity'
import DashboardEmpty from './AIDashboardEmpty'
import DashboardHero from './AIDashboardHero'
import DashboardProjects from './AIDashboardProjects'
import DashboardStats from './AIDashboardStats'

type Props = {
  hasContent?: boolean
}

const DashboardSection = ({ hasContent = true }: Props) => {
  return (
    <div className="min-h-screen bg-[#F2F2EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {hasContent ? (
          <div className="space-y-6">
            <DashboardHero hasContent={hasContent} />
            <DashboardStats />

            <DashboardProjects />

            <DashboardActivity />
          </div>
        ) : (
          <DashboardEmpty />
        )}
      </div>
    </div>
  )
}

export default DashboardSection