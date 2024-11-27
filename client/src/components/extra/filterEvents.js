import React from 'react'

/**i want to filter the all-events component in waiter to hold only events that
 * are not approved or pending to him.
 * or that i will get the status of the waiter for each event.
  */
const filterEvents = ({stateA, stateB, StateC}) => {
    const getFilteredArray = () => {
        return stateA.filter(
          (item) =>
            // item.includes(filterB) && item.includes(filterC) // Customize filtering logic as needed
          console.log(item)
          
        );
      };
  return (
    <div>filterEvents</div>
  )
}

export default filterEvents