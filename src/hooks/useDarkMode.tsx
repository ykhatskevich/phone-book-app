import { useState } from "react"

const useDarkMode = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    return{isDarkMode,setIsDarkMode}

}

export default useDarkMode