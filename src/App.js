import {Route, Routes} from "react-router-dom";
import Home from "./pages";
import CreatePost from "./pages/CreatePost";
import {Typography} from "antd";

function App() {
	return (
		<div>
			<Routes>
				<Route path={'/'} element={<Home/>} />
				<Route path={'/create'} element={<CreatePost/>} />
			</Routes>
		</div>
	)
}

export default App
