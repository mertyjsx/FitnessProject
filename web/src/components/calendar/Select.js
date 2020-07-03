import React from 'react'

export default function Select({ handleChange, name, id, first }) {
    return (
        <div>
            <select name={name} id={id} onChange={handleChange} className="m20">
                <option>{first ? first : id}</option>
                <option value={'12:00 am'}>12:00 am</option>
                <option value={'1:00 am'}>1:00 am</option>
                <option value={'2:00 am'}>2:00 am</option>
                <option value={'3:00 am'}>3:00 am</option>
                <option value={'4:00 am'}>4:00 am</option>
                <option value={'5:00 am'}>5:00 am</option>
                <option value={'6:00 am'}>6:00 am</option>
                <option value={'7:00 am'}>7:00 am</option>
                <option value={'8:00 am'}>8:00 am</option>
                <option value={'9:00 am'}>9:00 am</option>
                <option value={'10:00 am'}>10:00 am</option>
                <option value={'11:00 am'}>11:00 am</option>
                <option value={'12:00 pm'}>12:00 pm</option>
                <option value={'1:00 pm'}>1:00 pm</option>
                <option value={'2:00 pm'}>2:00 pm</option>
                <option value={'3:00 pm'}>3:00 pm</option>
                <option value={'4:00 pm'}>4:00 pm</option>
                <option value={'5:00 pm'}>5:00 pm</option>
                <option value={'6:00 pm'}>6:00 pm</option>
                <option value={'7:00 pm'}>7:00 pm</option>
                <option value={'8:00 pm'}>8:00 pm</option>
                <option value={'9:00 pm'}>9:00 pm</option>
                <option value={'10:00 pm'}>10:00 pm</option>
                <option value={'11:00 pm'}>11:00 pm</option>
            </select>
        </div>
    )
}
