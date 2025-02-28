import React, { useState, useEffect } from 'react';
import { TiTick } from "react-icons/ti";

function NameEdit() {
    const savedName = localStorage.getItem("userName")
    const [name, setName] = useState(savedName ? savedName : "");
    const [editName, setEditName] = useState(false);

    useEffect(() => {
      localStorage.setItem("userName", name)
    }, [name]);

    return (
      <div>
        { editName ? 
            (  <div className="flex">
                    <input
                    className="text-3xl border-b-2 border-black mb-4 text-center" 
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                    />
                    <TiTick
                        size={60}
                        onClick={() => setEditName(false)}
                        className='absolute right-10'
                    />
               </div>
            ) :
            ( <h1 className="text-3xl font-bold mb-4" onClick={() => setEditName(true)}>{ name ? name : "Enter your name"}</h1> )
        }
       </div>
    );
  }

export default NameEdit;
