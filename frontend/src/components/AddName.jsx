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
    <form className="add-name-form" onSubmit={submitHandler}>
      <p>Manually add your favorite name</p>
      <div className='form-holder'>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="M">Boy</option>
            <option value="F">Girl</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="child">Child:</label>
          <select
            id="child"
            name="child"
            value={child}
            onChange={(e) => setChild(e.target.value)}
          >
            <option value="" disabled hidden>Select an Option</option>
            {children.map(child => (
              <option key={child.id} value={child.id}>{child.nickname}</option>
            ))}
          </select>
        </div>
      </div>
      <button className="addName-button" type="submit">Save</button>
    </form>
  );
}
