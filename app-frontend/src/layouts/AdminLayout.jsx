import Sidebar from "../components/common/Sidebar"

function AdminLayout({ children }) {

return (

    <div className="d-flex">

    <Sidebar />

    <div className="flex-grow-1 p-4">

        {children}

    </div>

    </div>

)
}

export default AdminLayout