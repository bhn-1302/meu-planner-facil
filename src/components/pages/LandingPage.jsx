import { Link } from "react-router-dom";
import './LandingPage.css';

export default function LandingPage() {
    return (
        <div className="landing-page">
            <h1>Meu Planner Fácil</h1>
            <p>Organize suas tarefas com simplicidade, foco e beleza.</p>
            <Link to="/planner" className="btn-entrar">
                Começar agora
            </Link>
        </div>
    );
}

