import React from 'react';
import './Fetch.css'

const Fetch = () => {
    return(
        <div className="fetch">
            <div className="sub-fetch">
                <div className="sort">
                    <select>
                        <option value="Release Date (newest first)">Release Date (newest first)</option>
                        <option value="Release Date (oldest first)">Release Date (oldest first)</option>
                        <option value="Course Title (a-z)">Course Title (a-z)</option>
                        <option value="Course Title (z-a)">Course Title (z-a)</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Fetch;