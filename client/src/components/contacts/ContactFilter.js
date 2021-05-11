import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext) 
    const text = useRef('')

    const { filterContacts, clearFilter, filtered } = contactContext

    useEffect(() => {
        if(filtered === null) {
            text.current.value = ''
        }
    })

    const onChange = e => {
        if(text.current.value !== '') {
            filterContacts(e.target) //filterContacts compares what was wrote in the filter with any current contact (name or email)
        } else {
            clearFilter()
        }
    }
    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange}/>
        </form>
    )
}

export default ContactFilter