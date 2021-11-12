import "../components/SignTemplate.css"


export function Title(props){
    return (<p className="title">{props.children}</p>);
}

export function SubTitle(props){
    return (<p className="subtitle">{props.children}</p>);
}

export function UserInput(){
    return (<input className="un " type="text" align="center" placeholder="Email"></input>);
}

export function PassInput(props){
    return (<input className="pass" type="password" align="center" placeholder={props.placeholder}></input>);
}

export function Submit(props){
    return(<a class="submit">{props.children}</a>);
}

export default function SignTemplate(props) {
    return (
        <div className="sign_page">
             
            <div className="sign_image">
                <img src={props.image}></img>
            </div>
            
            <div className="sign_view">
                {props.children}
            </div>
        </div>
    );
}