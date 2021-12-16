import { reactive } from 'vue';
import axios from 'axios';

let emails = reactive(new Set())

export const useEmailSelection = function(){
  let toggle = function(email) {
    if(emails.has(email)) {
      emails.delete(email)
    } else {
      emails.add(email)
    }
  }
  let clear = () => {
      emails.clear()
  }
  let addMultiple = (newEmails) => {
      newEmails.forEach((email) => {
          emails.add(email)
      })
  }
  let forSelected = (fn) => {
    emails.forEach((email) => {
        fn(email);
        axios.put(`http://localhost:3000/emails/${email.id}`, email)
    })
};
  const markRead = () => forSelected(e => e.read = true)
      
  const markUnread = () => forSelected(e => e.read = false)
    
  const archive = () =>  { forSelected(e => e.archived = true); clear() }

  return {
    emails,
    toggle,
    clear,
    addMultiple,
    markRead,
    markUnread,
    archive,
    forSelected
  }
}

export default useEmailSelection