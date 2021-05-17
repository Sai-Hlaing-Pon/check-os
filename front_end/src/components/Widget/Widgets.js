import React from 'react'
import "../Widget/Widgets.css"

import Tabs from "./elements/Tabs"

function Widgets({ profilePic, image, username, timestamp, message }) { 
       return (
        <div className="widgets">            
            <div>
                <Tabs />
            </div>
            

        </div>
    )
}

export default Widgets
