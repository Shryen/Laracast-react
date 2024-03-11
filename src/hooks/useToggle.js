import { useState } from "react";

function useToggle(initialState){
    const [visible, setVisible] = useState(initialState = true);


    function toggle(){
        setVisible(prevVisible => !prevVisible);
    }

    return [visible,toggle];
}

export default useToggle;