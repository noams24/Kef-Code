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
			<div className='h-7 p-0.5 pt-1 text-zinc-700 dark:text-zinc-300 rounded-sm  bg-gray-200 dark:bg-zinc-800 font-bold text-lg  border border-zinc-400 dark:border-zinc-600'>
				{!isFullScreen ? <AiOutlineFullscreen title="הגדל"/> : <AiOutlineFullscreenExit title="מזער" />}
			</div>
		</button>
	);
};
export default PreferenceNav;