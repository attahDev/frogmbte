 
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/mainuseAuth"; // Updated import
import AIDashboard from "./AIDashboardPage"


const AIDashboardIndex = () => {
  const { user, isAuthenticated, isLoading } = useAuth() // Use new auth context
  const navigate = useNavigate()

  // Redirect if not authenticated
  useEffect(() => {
    // Only redirect when we're done loading and user is not authenticated
    if (!isLoading && !isAuthenticated) {
      console.log("User not authenticated, redirecting to login...")
      navigate("/login", { replace: true })
    }
  }, [user, isAuthenticated, isLoading, navigate])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7263D]"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Show redirect message or prevent flash of content
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D7263D]"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  // User is authenticated, show dashboard content
  return (
    <>
   <AIDashboard />
    </>
  )
}

// Helper functions (you can move these to a separate utils file)




export default AIDashboardIndex