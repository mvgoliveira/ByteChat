import '../components/RoomGrid.css'

export function VideoContainer(props){
    return(<div className="video-container">{props.children}</div>);
}

let peopleConnected = 7;

export function Grid(){
    switch (peopleConnected) {
        case 1:
            return(<div className="video-grid-1"><VideoContainer/></div>)
        case 2:
            return(<div className="video-grid-2"><VideoContainer/><VideoContainer/></div>)
        case 3:
            return(<div className="video-grid"><VideoContainer/><VideoContainer/><VideoContainer/></div>)
        case 4:
            return(<div className="video-grid-4"><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/></div>)
        case 5:
            return(<div className="video-grid"><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/></div>)
        case 6:
            return(<div className="video-grid"><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/></div>)
        case 7:
            return(<div className="video-grid"><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/></div>)
        case 8:
            return(<div className="video-grid"><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/></div>)
        case 9:
            return(<div className="video-grid"><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/><VideoContainer/></div>)

    }
}