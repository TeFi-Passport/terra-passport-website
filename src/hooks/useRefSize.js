import {useEffect, useState} from "react";

/**
 * Get the size attributed to a given container
 * @param ref - the ref of the container
 * @returns {{width: undefined, height: undefined}}
 */
export const useRefSize = (ref) => {
    const [refSize, setRefSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            if(ref.current){

                let width  = ref.current.offsetWidth;
                let height  = ref.current.offsetHeight;

                setRefSize({
                    width: width,
                    height: height,
                });
            } else {
                setTimeout(handleResize, 50);
            }
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return refSize;
}