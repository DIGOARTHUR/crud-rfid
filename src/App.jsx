import { useEffect, useState, useRef } from 'react'
import debounce from 'lodash.debounce';
import './App.css'
import { db } from './config/firebase'
import { getDocs, collection, addDoc,updateDoc,doc,deleteDoc ,getDoc} from 'firebase/firestore'
import { MdOutlineInput } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
function App() {
  const[newName, SetNewName] = useState("") 
  const[newEmail, SetNewEmail] = useState("") 
  const [users, setUsers]= useState([])
  const employeesRef = collection(db, "employees");
  const [timer, setTimer] = useState(null);

  const inputRef = useRef();


  const createUsers = async ()=>{
    await addDoc(employeesRef,{id:52552,name:newName, email:newEmail})
  }

  const updateUser = async (id, name)=>{
    const userDoc = doc(db,"employees",id)
    const newFields = {name: 'Mr ' + name }
    await updateDoc(userDoc, newFields)
  }


  const getSpecificData= async (id)=>{
    const userDoc = doc(db,"employees",id)
    const docSnap = await getDoc(userDoc);
    console.log(docSnap.data())
  }

  const deleteUser = async (id, name)=>{
    const userDoc = doc(db,"employees",id)
     await deleteDoc(userDoc) 
  }

  useEffect(() => {
    const getEmployeesList = async () => {
      try {
        const data = await getDocs(employeesRef);
        setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
      } catch (err) {
        console.error(err);
      }

      
    }
    getEmployeesList();
  }, [])


  const teste = ()=>{
    inputRef.current.select();
  }



  
  return (
    <>
 
    <input placeholder='Email...' onChange={(event) => {SetNewEmail(event.target.value)}}/>
    <button onClick={createUsers}>Create User</button>
{
  users.map((user)=>{
    return <div>
      <h4>Name: {user.name}</h4>
      <h5>Email: {user.email}</h5>
      <button onClick={()=>{updateUser(user.id, user.name)}}>Update</button>
      <button onClick={()=>{deleteUser(user.id)}}>Delete</button>
    </div>
  })
}


<h1>Search </h1>


    <button onClick={()=>{teste()}}><MdOutlineInput /></button>
    <div>
      Entre com o seu cartão
    <input onChange={(event) => {   if (timer) {
      clearTimeout(timer);

    }
    setTimer(
      setTimeout(() => {
        getSpecificData(event.target.value)
      }, 100)
    );}} type="text"  ref={inputRef} className='entry'/>
     <FaRegAddressCard />
    </div>
   
    </>
  )
}

export default App

