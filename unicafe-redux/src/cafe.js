import React, { useState } from "react";

function Cafe() {
    const [visible, setVisible] = useState(true);
    return (
        <div>
            {" "}
            <button>greet</button>
            <br />
            {visible && <div>cafe</div>}
        </div>
    );
}

export default Cafe;
