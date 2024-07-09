import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PickDate = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
          <DatePicker className='border rounded-md border-gray-700 text-center tracking-tight font-bold hover:cursor-pointer'
            selected={startDate}
            onChange={(date) => setStartDate(date)} />
        </div>
    );
};

export default PickDate;
