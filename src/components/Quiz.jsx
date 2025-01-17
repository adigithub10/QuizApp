//This component basically provides currently active question and changes question asa user answers the currentone 
import {React , useState} from 'react'

export default function Quiz() {

    const[activeQueIndex , setactiveQueIndex] = useState(0);
     //this state stores the answer given by user
     const [userAnswers , setuserAnswers] = useState([]);
  
    return (
    <div>
      <p>Currently Active Question!!</p>
    </div>
  )
}
