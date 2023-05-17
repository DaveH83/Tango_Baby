import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from "../App";

export default function AddName() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [child, setChild] = useState('');
  const { children,activeChild } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post('/app/name/', {
      'name': name,
      'gender': activeChild['gender'],
      'child': activeChild
    });
    console.log('child-id',child)
    setName('');
    setGender('');
  };

  return (
    <form className="grid grid-cols-2 gap-2" onSubmit={submitHandler}>
      <p className=' text-gray-500 text-lg p-1 '> Manually add your favorite name</p>

      <div className='form-holder'>
        <div className="form-group">
          <label className="block mb-2 text-lg p-1 font-lg  text-gray-500 dark:text-white" htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <button className="text-white bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-fit hover:text-gray-600 hover:bg-white hover:border-gray-600 hover:drop-shadow-xl
			focus:border-gray-300 w-40" type="submit">Save</button>
    </form>
    );
}
