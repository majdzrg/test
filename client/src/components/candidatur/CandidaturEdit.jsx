import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useParams} from "react-router"
import { useHistory } from "react-router-dom";

export const CandidaturEdit = () => {

    const [candid_Data, setCandid_Data] = useState({
        nom: "",
        prenom : "",
        num_tel: "",
        experience: "",
        disponabilite: "",
        cv: "",
        email: "",
        date_naissance: "",
        etat : "",
        register_date: "",
        email_sent :""
    })
    let history = useHistory();
    const [message, setMessage] = useState({
        type: 'error',
        show : false,
        message : ''
    })
    const [disabledFrom, setDisabledFrom] = useState(true)
    const { id } = useParams()
    useEffect(() => {
        // check if admin
        const token = localStorage.getItem('token')
        if(!token || token.length === 0){
            history.push('/login')
        }
        axios.get("http://localhost:3300/api/candidat/"+id, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if(response.status == 200){
                setCandid_Data(response.data.candidat)
            } else {
                setMessage({show: true, message:"somthing went wrong "+response.data.message, type:"danger"})
            }
        }, error=> {
            console.log(error)
            setMessage({show: true, message:"somthing went wrong", type:"danger"})

        })
        .catch(error => {
            console.log(error);
            setMessage({show: true, message:"somthing went wrong", type:"danger"})
        })
    }, [])

    const handleForm = (event) => {
        event.preventDefault();
        const { nom, prenom, num_tel, experience, disponabilite, email, date_naissance, etat } = event.target.elements
        const data_obj = {
            nom: nom.value,
            prenom : prenom.value,
            num_tel: num_tel.value,
            experience: experience.value,
            disponabilite: disponabilite.value,
            email: email.value,
            date_naissance: date_naissance.value,
            etat: etat.value
        }
        const token = localStorage.getItem('token')
        axios.patch("http://localhost:3300/api/candidat/"+id, data_obj,
        {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response)
            if(response.status == 200){
                // show success
                setMessage({
                    show: true,
                    message: "Updated :D ",
                    type:"success"
                })
            }
            else {
                const message = response.data.message
                // show error
                setMessage({
                    show: true,
                    message: "Somthing went wrong, try later , "+message,
                    type:"danger"
                })
            }
        }, error => {
            console.log(error)
            setMessage({
                show: true,
                message: "Somthing went wrong, try later.",
                type:"danger"
            })
        })

    }
    return(
        <div className="container p-2">
            <h1>Edit candidatur</h1>
            {message.show && <div className={"alert alert-"+message.type} role="alert">
                {message.message}
            </div>}
            <div className="row">
                <div className="col">
                    <p>
                        You can edit the data of this candidatur. <br></br>
                        This candidatur registred on : <time> { candid_Data.register_date } </time>
                    </p>
                </div>
                <div className="col">
                    <a className="btn btn-secondary" href="/candidaturs"> back to list</a>
                    <button className="btn btn-primary" onClick={() => setDisabledFrom(!disabledFrom)}>Edit</button>
                </div>
            
            </div>
            <form onSubmit={handleForm}>
                <div className="row">
                    <div className="col">
                        <div class="form-group">
                            <label for="nom">Nom</label>
                            <input disabled={disabledFrom} onChange={(e) => setCandid_Data({...candid_Data, nom: e.target.value})} value={candid_Data.nom} type="text" class="form-control" id="nom" required/>
                        </div>
                    </div>
                    <div className="col">
                        <div class="form-group">
                            <label for="prenom">Prenom</label>
                            <input disabled={disabledFrom} onChange={(e) => setCandid_Data({...candid_Data, prenom: e.target.value})} value={candid_Data.prenom} type="text" class="form-control" id="prenom" required/>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input disabled={disabledFrom} type="email" onChange={(e) => setCandid_Data({...candid_Data, email: e.target.value})} value={candid_Data.email} class="form-control" id="email" aria-describedby="emailHelp" required/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="date_naissance">Date de naissance</label>
                    <input disabled={disabledFrom} type="date" onChange={(e) => setCandid_Data({...candid_Data, date_naissance: e.target.value})} value={candid_Data.date_naissance} class="form-control" id="date_naissance"/>
                </div>
                <div class="form-group">
                    <label for="num_tel">Numero tel</label>
                    <input disabled={disabledFrom} type="number" onChange={(e) => setCandid_Data({...candid_Data, num_tel: e.target.value})} value={candid_Data.num_tel} class="form-control" id="num_tel" required/>
                </div>
                <div class="form-group">
                    <label for="dispo">Disponibilité</label>
                    <input disabled={disabledFrom} type="number" onChange={(e) => setCandid_Data({...candid_Data, disponabilite: e.target.value})} value={candid_Data.disponabilite} min="0" max="6" class="form-control" id="disponabilite"/>
                    
                </div>
                <div class="form-group">
                    <label for="exp">Experience</label>
                    <input disabled={disabledFrom} type="number" onChange={(e) => setCandid_Data({...candid_Data, experience: e.target.value})} value={candid_Data.experience} min="0" class="form-control" id="experience" />
                </div>
                <div class="form-group">
                    <label for="cv">View CV</label>
                    <a href={"http://localhost:3300/uploads/"+candid_Data.cv}> click here </a>
                    
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea  disabled={disabledFrom} onChange={(e) => setCandid_Data({...candid_Data, message: e.target.value})} value={candid_Data.message} class="form-control" id="message" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="state">
                        Select state
                    </label>
                    <select  disabled={disabledFrom} onChange={(e) => setCandid_Data({...candid_Data, etat: e.target.value})} value={candid_Data.etat} class="form-control" id="etat">
                        <option value="Nouvelle">Nouvelle</option>
                        <option value="En cours">En cours</option>
                        <option value="Confirmer">Confirmer</option>
                        <option value="Rejeter">Rejeter</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}