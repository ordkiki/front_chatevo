import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

const apiUrl = import.meta.env.VITE_API_URL;

function Login() {
    const navigate = useNavigate(); // Utiliser useNavigate pour la redirection
    const [formData, setFormData] = useState({
        Email: '',
        Mdp: '',
    });
    const [error, setError] = useState(null); // Pour les erreurs
    const [loading, setLoading] = useState(false); // Pour gérer l'état de chargement

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Réinitialiser l'erreur avant l'envoi

        try {
            const response = await axios.post(
                `${apiUrl}/api/utilisateurs/login`,  // Correction de l'URL
                formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log('Réponse du serveur :', response.data);
            localStorage.setItem('user', JSON.stringify(response.data));

            alert("Connexion réussie");

            // Rediriger vers la page d'accueil après une connexion réussie
            navigate('/');
        } catch (error) {
            setError("Échec de la connexion. Vérifiez vos informations.");
            console.error("Connexion échouée :", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-4 sm:p-12">
                    <div>
                        <img
                            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                            className="w-24 mx-auto"
                        />
                    </div>
                    <div className="mt-5 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">Se connecter</h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="flex flex-col items-center">
                                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-2 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <div className="bg-white p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4"
                                            />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853"
                                            />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04"
                                            />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335"
                                            />
                                        </svg>
                                    </div>
                                    <span className="ml-4">Se connecter avec Google</span>
                                </button>
                            </div>
                            <div className="my-8 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Ou inscrivez-vous avec votre e-mail
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="mx-auto max-w-xs" method="POST">
                                <input
                                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="email"
                                    name="Email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password"
                                    name="Mdp"
                                    placeholder="Votre mot de passe"
                                    onChange={handleChange}
                                    required
                                />
                                {error && (
                                    <p className="text-red-500 text-sm mt-2">{error}</p>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    {loading ? "Connexion..." : "Se connecter"}
                                </button>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    J'accepte les conditions d'utilisation et la politique de confidentialité
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 w-[30vw] text-center hidden lg:flex">
                    <div
                        className="m-5 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")',
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Login;