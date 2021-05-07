import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [ //hardcoded dummy contacts until the API is ready
            {
                id: 1,
                name: 'Juancito Perez',
                email: 'juancitoperez@gmail.com',
                phone: '111-111-111-111',
                type: 'personal'
            },
            {
                id:2,
                name: 'Pepito Gomez',
                email: 'pepitogomez@gmail.com',
                phone: '222-222-222-222',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Fernando Fofo',
                email: 'fernandofofo@gmail.com',
                phone: '333-333-333-333',
                type: 'professional'

            }
        ]    
    }

    const [state, dispatch] = useReducer(contactReducer, initialState)

    // Add Contact
    const addContact = contact => {
        contact.id = uuidv4()  //uuid generates an ID for us
        dispatch({ type: ADD_CONTACT, payload: contact})
    }
    // Delete Contact

    // Set Current Contact

    // Clear Current Contact

    // Update Contact

    // Filter Contacts

    // Clear Filter

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact
            }}>
            { props.children }
        </ContactContext.Provider>
    )
}

export default ContactState