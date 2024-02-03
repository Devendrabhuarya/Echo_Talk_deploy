import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import GuestRoute from './Routes/GuestRoute';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import SemiProtectedRoute from './Routes/SemiProtectedRoute';
import ProtectedRoute from './Routes/ProtectedRoute';
import Rooms from './pages/Rooms/Rooms';
import './index.css';
import { useLoaderWithRefresh } from './hooks/useLoaderWithRefresh';
import Loader from './components/shared/Loader/Loader';
import Room from './pages/Room/Room';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/EditProfile/EditProfile';
function App() {
    const { loader } = useLoaderWithRefresh();
    return (

        // loader ? (
        //     <>
        //         <Loader text={'loading please wait ....'} />
        //     </>
        // ) : (
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/authenticate"
                        element={<GuestRoute><Authenticate /></GuestRoute>}
                    />
                    <Route path="/active"
                        element={<SemiProtectedRoute><Activate /></SemiProtectedRoute>}
                    />
                    <Route path="/rooms"
                        element={<ProtectedRoute><Rooms /></ProtectedRoute>}
                    />
                    <Route path="/room/:id"
                        element={<ProtectedRoute><Room /></ProtectedRoute>}
                    />
                    <Route path="/profile/:id"
                        element={<ProtectedRoute><Profile /></ProtectedRoute>}
                    />
                    <Route path="/edit-profile"
                        element={<ProtectedRoute><EditProfile /></ProtectedRoute>}
                    />
                    {/* <Route path="/register" element={<Register />} />


                <Route path="/login" element={<Login />} /> */}
                </Routes>
            </BrowserRouter >
        // )
    );
}

export default App;
