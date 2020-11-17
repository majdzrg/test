import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

export const List = () => {

    const [list, setList] = useState([])
    const [message, setMessage] = useState({
        type: 'danger',
        show : false,
        message : ''
    })

    const [showList, setShowList] = useState(list)
    let history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token || token.length === 0){
            history.push('/login')
        }
        axios.get("http://localhost:3300/api/candidat/", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if(response.status == 200){
                setList(response.data.candidats)
                setShowList(response.data.candidats)
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
    }, [history])

    const searchFor = (searchString) => {
        if(searchString.length === 0){
            setShowList(list)
        }
        else {
            const new_list = list.filter(x => (x.nom+" "+x.prenom).includes(searchString))
            setShowList(new_list)
        }
    }

    return(
        <div class="container p-2">
            <h1>List des candidaturs</h1>
            <a className="btn btn-secondary" href="/candidatur">Create new</a>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">@</span>
                </div>
                <input onChange={(e) => searchFor(e.target.value)} type="text" class="form-control" placeholder="search" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div class="list-group">
                { showList.map(x => 
                    {
                        let classType = x.etat == "Rejeter" ? "danger" : x.etat == "Confirmer" ? "success" : x.etat == "En cours" ? "warning" : "primary"
                        return <a href={"./candidatur/"+ x._id} class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{x.nom} {x.prenom}</h5>
                                <p>{x.email}</p>
                            </div>
                            <span className={"badge badge-"+classType+ " badge-pill"}>{x.etat}</span>
                        </a>
                    }
                )}
                {showList.length == 0 && (
                    <p>
                        There is no things here
                    </p>
                )}
            </div>
        </div>
    )
}