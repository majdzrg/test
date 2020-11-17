import React, {useState} from 'react'
import axios from "axios";
export const Candidatur = () => {

    const [message, setMessage] = useState({
        type: 'error',
        show : false,
        message : ''
    })

    const handleForm = (event) => {
        event.preventDefault();
        const {nom, prenom, num_tel, exp, dispo, cv, email, date_naissance } = event.target.elements
        const data_obj = {
            nom: nom.value,
            prenom : prenom.value,
            num_tel: num_tel.value,
            experience: exp.value,
            disponabilite: dispo.value,
            cv: cv.files[0],
            email: email.value,
            date_naissance: date_naissance.value
        }
        //console.log(data_obj)
        // request call
        let formData = new FormData();
        Object.keys(data_obj).forEach(key => formData.append(key, data_obj[key]))
        console.log(formData)
        axios.post("http://localhost:3300/api/candidat", formData,
        {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response)
            if(response.status == 200){
                // show success
                setMessage({
                    show: true,
                    message: "You are Registred :D ",
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
            <h1>Create a new candidatur</h1>
            <button className="btn btn-secondary" href="/login">Switch to admin</button>
            {message.show && <div className={"alert alert-"+message.type} role="alert">
                {message.message}
            </div>}
            <form onSubmit={handleForm}>
                <div className="row">
                    <div className="col">
                        <div class="form-group">
                            <label for="nom">Nom</label>
                            <input type="text" class="form-control" id="nom" required/>
                        </div>
                    </div>
                    <div className="col">
                        <div class="form-group">
                            <label for="prenom">Prenom</label>
                            <input type="text" class="form-control" id="prenom" required/>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" required/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="date_naissance">Date de naissance</label>
                    <input type="date" class="form-control" id="date_naissance"/>
                </div>
                <div class="form-group">
                    <label for="num_tel">Numero tel</label>
                    <input type="number" class="form-control" id="num_tel" required/>
                </div>
                <div class="form-group">
                    <label for="dispo">Disponibilité</label>
                    <input type="number" min="0" max="6" class="form-control" id="dispo"/>
                    
                </div>
                <div class="form-group">
                    <label for="exp">Experience</label>
                    <input type="number" min="0" class="form-control" id="exp" />
                </div>
                <div class="form-group">
                    <label for="cv">Votre CV</label>
                    <input type="file" class="form-control-file" accept="application/pdf" required id="cv"/>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea class="form-control" id="message" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}