import { useContext, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { UserContext } from "../App";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  
  export default function AddName() {
    
    
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name,setName] = useState('');
    const [gender,setGender] = useState('');
    const [child,setChild]=useState('')
    const {children}=useContext(UserContext)

    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
   
    const submitHandler = async(name,gender,child)=>{
        let response =await axios.post('/app/name/',
                {
                    'name':name,
                    'gender':gender,
                    'id':child
                });
    }
    return (
      <div>
        <button onClick={openModal}>Add Name</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add Name</h2>
          <button onClick={closeModal}>close</button>
       
          <form onSubmit={(e)=>{
                e.preventDefault();
                submitHandler(name,gender,child)
                console.log('onSubmit:',name,gender,id)
                setName('');
                setGender('');
            }}>
                <input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label for="gender">Choose Gender:</label>
                <select 
                    name='gender'
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="M">Boy</option>
                    <option value="F">Girl</option>
                </select>
                <label for="child">Choose Child:</label>
                <select 
                    name='child'
                    onChange={(e) => setChild(e.target.value)}
                >
                  <option value="none" selected disabled hidden>Select an Option</option>
                  {children.map(child=>(
                    <option value={child.id}>{child.nickname}</option>
                  ))}
                    
            
                </select>
                <input type="submit" value="Save" />
            
          </form>
        </Modal>
      </div>
    );
  }
  
