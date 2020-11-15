import React, { useState } from 'react'

export const CandidaturEdit = () => {

    const [candid_Dat, setCandid_Dat] = useState({
        nom: "",
        prenom : "",
        num_tel: "",
        exp: "",
        dispo: "",
        cv: "",
        email: "",
        date_naissance: ""
    })

    const handleForm = (event) => {
        event.preventDefault();
        const { nom, prenom, num_tel, exp, dispo, cv, email, date_naissance } = event.target.elements
        const data_obj = {
            nom: nom.value,
            prenom : prenom.value,
            num_tel: num_tel.value,
            exp: exp.value,
            dispo: dispo.value,
            cv: cv.value,
            email: email.value,
            date_naissance: date_naissance.value
        }
        console.log(data_obj)
    }
    return(
        <div className="container p-2">
            <h1>Edit candidatur</h1>
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
                <div className="form-group">
                    <label htmlFor="state">
                        Select state
                    </label>
                    <select class="form-control" id="state">
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