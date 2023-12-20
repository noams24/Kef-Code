import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";

// type PreferenceNavProps = {
// 	settings: ISettings;
// 	setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
// };

const PreferenceNav = () => {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const handleFullScreen = () => {
		if (isFullScreen) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		setIsFullScreen(!isFullScreen);
	};

	useEffect(() => {
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullScreen]);

	return (

		<button onClick={handleFullScreen}>
			<div className='text-zinc-700 dark:text-zinc-300 rounded-sm h-6 bg-gray-200 dark:bg-zinc-800 font-bold text-lg pt-0.5'>
				{!isFullScreen ? <AiOutlineFullscreen title="הגדל"/> : <AiOutlineFullscreenExit title="מזער" />}
			</div>
		</button>
	);
};
export default PreferenceNav;