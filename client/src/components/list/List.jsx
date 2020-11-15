import React,{useState} from 'react'

export const List = () => {
    const list_x = [
        {
            id:55,
            nom:'Aloras',
            prenom:'Ben Folen',
            etat:'Nouvelle'
        },
        {
            id:54,
            nom:'Folen',
            prenom:'Ben Folen',
            etat:'rejetee'
        },
        {
            id:53,
            nom:'Folen',
            prenom:'Ben Folen',
            etat:'accepte'
        },
        {
            id:52,
            nom:'Folen',
            prenom:'Ben Folen',
            etat:'en cours'
        }
    ]
    const [list, setList] = useState(list_x)

    const searchFor = (searchString) => {
        if(searchString.length === 0){
            setList(list_x)
        }
        else {
            const new_list = list.filter(x => (x.nom+" "+x.prenom).includes(searchString))
            setList(new_list)
        }
    }

    return(
        <div class="container p-2">
            <h1>List des candidaturs</h1>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">@</span>
                </div>
                <input onChange={(e) => searchFor(e.target.value)} type="text" class="form-control" placeholder="search" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div class="list-group">
                { list.map(x => 
                    <a href={"./candidatur/"+ x.id} class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{x.nom} {x.prenom}</h5>
                            <p>Email - etc ...</p>
                        </div>
                        <span class="badge badge-primary badge-pill">{x.etat}</span>
                    </a>
                )}
            </div>
        </div>
    )
}