import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from "../App";

export default function AddName() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [child, setChild] = useState('');
  const { children } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post('/app/name/', {
      'name': name,
      'gender': gender,
      'id': child
    });
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
        <div className="form-group">
          <label className="block text-lg p-1 font-xl  text-gray-500 dark:text-white" htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="M">Boy</option>
            <option value="F">Girl</option>
          </select>
        </div>
        <div className="form-group">
          <label className="block text-lg p-1 font-xl  text-gray-500 dark:text-white" htmlFor="child">Child:</label>
          <select
            id="child"
            name="child"
            value={child}
            onChange={(e) => setChild(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled hidden>Select an Option</option>
            {children.map(child => (
              <option key={child.id} value={child.id}>{child.nickname}</option>
            ))}
          </select>
        </div>
      </div>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm w-fit px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-fit" type="submit">Save</button>
    </form>
    );
}
