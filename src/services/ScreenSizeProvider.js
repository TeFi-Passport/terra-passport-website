import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setIsMobile, setScreenSize} from "../store/action";
import {isMobile} from "../utils/mobileUtils";

/**
 * React provider that updates the screen size whenever it changes
 * @returns {{React.Element}}
 */
const ScreenSizeProvider = ({children}) => {
    const dispatch = useDispatch();

    const onScreenUpdate = ({width, height}) => {
        dispatch(setScreenSize({width, height}));
        dispatch(setIsMobile(isMobile(width)));
    }

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            onScreenUpdate({
                width: document.body.clientWidth,
                height: Math.max(document.body.clientHeight, window.innerHeight),
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => {
            window.removeEventListener("resize", handleResize)
        };
    }, []); // Empty array ensures that effect is only run on mount

    return (
        <>{children}</>
    );
}

export default ScreenSizeProvider;