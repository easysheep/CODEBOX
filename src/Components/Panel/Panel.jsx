import React, { useState } from 'react';
import "./Panel.scss";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';


const Panel = ({ contname, language, value, options, onChange }) => {
    const handleChange = (editor, data, value) => {
        onChange(value);
    };

    const del = () => {
        // Clear the HTML, CSS, and JS code respectively
        if (contname === "HTML") {
            onChange('');
        } else if (contname === "CSS") {
            onChange('');
        } else if (contname === "JS") {
            onChange('');
        }
    };



    const [open, setOpen] = useState(true);

    return (
        <div className={`cont ${open ? '' : 'collapsed'}`}>
            <div className="title">
                {contname}
                <div className="btns">
                    <button className='red' onClick={del}></button>
                    {/* <button className='green' onClick={handleSubmit}>Submit</button> */}
                </div>
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className='code-mirror-wrapper'
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: 'material',
                    lineNumbers: true
                }}
            />
        </div>
    );
};

export default Panel;


