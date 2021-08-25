import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addUser, getUser, editUser } from "../../redux/actions/usersActions"
import "./user-form.scss"
import MessageError from "../MessageError/MessageError"

const UserForm = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const { user_email } = useParams()
  const user = useSelector( state => state.allUsers.user)
  const editing = useSelector( state => state.allUsers.editing)
  const [datalistCountries, setDatalistCountries] = useState([
    { id: 1, value: 'AR', label: 'Argentina' },
    { id: 2, value: 'BO', label: 'Bolivia' },
    { id: 3, value: 'BR', label: 'Brasil' },
    { id: 4, value: 'CL', label: 'Chile' },
    { id: 5, value: 'CO', label: 'Colombia' },
    { id: 6, value: 'PE', label: 'Perú' },
  ])

  // ESTADO DE VALUES
  const [stateUsers, setStateUsers] = useState({
      name: "",
      email: "",
      phone: "",
      country: ""
  })

  // ESTADO DE ERRORES
  const [stateErrors, setStateErrors] = useState({})

  const handleInputEmailBlur = (event) => {

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    // verificación del campo email
    if (emailRegex.test(event.target.value) && event.target.value !== "") {
      console.log('valida', emailRegex.test(event.target.value))
      setStateErrors({
        ...stateErrors,
        [event.target.name]: false
      })
    } else {
      console.log('no valida')
      setStateErrors({
        ...stateErrors,
        [event.target.name]: true
      })
    }
  }

  // AL PERDER EL FOCO DE UN INPUT
  const handleInputBlur = (event) => {
    // al perder el foco del input, si el valor de este esta vacio, 
    // lo agrego al estado de errores
    if (event.target.value === "") {
      setStateErrors({
        ...stateErrors,
        [event.target.name]: true
      })
    } else {
      setStateErrors({
        ...stateErrors,
        [event.target.name]: false
      })
    }

  }

  // AL CAMBIAR EL VALUE DE UN INPUT
  const handleInputChange = (event) => {
    // captura el valor del input y lo agrega en el estado de values
    setStateUsers({
      ...stateUsers,
      [event.target.name]: event.target.value
    })
  }

  // SUBMIT DEL FORMULARIO
  const handleSubmit = (event) => {
    event.preventDefault()
    // declaración del objeto de errores vacio
    let objectErrors = {}

    // se recorre el state buscando errores
    // y se agrega al objeto de errores
    for(let item in stateUsers) {
      const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

      if (stateUsers[item ] === "") {
        objectErrors[item] = true
      }

      if (item === "email" && !emailRegex.test(stateUsers[item])) {
        objectErrors[item] = true
      }
    }

    // se reemplaza el estado de errores, por el objeto de errores
    setStateErrors(objectErrors)

    // si el estado de errores esta vacio, entonces se envia el formulario
    if (Object.keys(objectErrors).length === 0) {

      if (editing) {
        // editar usuario en el estado de redux
        dispatch(editUser(user_email, stateUsers))
      } else {
        // agregar usuario en el estado de redux
        dispatch(addUser(stateUsers))
      }
      
      // redirección al home
      history.push('/')

    }
  }

  const obtenerUsuario = () => {
    if (user_email) {
      dispatch(getUser(user_email))
      setStateUsers(user[0])
    }
  } 

  useEffect(obtenerUsuario, [editing])

  return (
    <div className="centered">
      <h2>{ editing ? 'Edit user' : 'Add new user' }</h2>
      { stateUsers &&
      <form>
        <div className="input-group">
          <label htmlFor="name" className="label">Name*</label>
          <input placeholder="Jhon" id="name" name="name" type="text" value={ stateUsers.name } onChange={handleInputChange} onBlur={handleInputBlur} required />
          { stateErrors.name && <MessageError name="name" /> }
        </div>
        <div className="input-group">
          <label htmlFor="email" className="label">Email*</label>
          <input placeholder="jhon.doe@cliengo.com" id="email" name="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={ stateUsers.email } onChange={handleInputChange} onBlur={handleInputEmailBlur} required />
          { stateErrors.email && <MessageError name="valid email" /> }
        </div>
        <div className="input-group">
          <label htmlFor="phone" className="label">Phone*</label>
          <input placeholder="+543816530788" id="phone" name="phone" type="text" value={ stateUsers.phone } onChange={handleInputChange} onBlur={handleInputBlur} required />
          { stateErrors.phone && <MessageError name="phone" /> }
        </div>
        <div className="input-group">
          <label htmlFor="country" className="label">Country*</label>
          <input placeholder="AR" id="country" name="country" list="countries" type="text" value={ stateUsers.country } onChange={handleInputChange} onBlur={handleInputBlur} required />
            <datalist id="countries" >
              { datalistCountries.map((country) => <option key={country.id} value={country.value} label={country.label} />) }
            </datalist>
          { stateErrors.country && <MessageError name="country" /> }
        </div>
        <input className="button" type="submit" value={ editing ? 'Edit' : 'Add' } onClick={handleSubmit} />
      </form>
      }
    </div>
  );
}

export default UserForm
