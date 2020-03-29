import React, {useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Register() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    /*Essa função será responsável por fazer o cadastro do usuário*/
    async function handleRegister(e){
        /*o e.prevent default previne que a página não seja recarregada ao clicar em submit*/
        e.preventDefault()

        const data = ({
            name,
            email,
            whatsapp,
            city,
            uf
        })

        console.log(data)

        try {
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/')
        } catch (err){
            alert('Erro no cadastro, tente novamente.');
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">
                
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                
                    <Link className='back-link' to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                
                </section>

               <form onSubmit={handleRegister}>

                    <input 
                        placeholder="Nome da ONG" 
                        value={name}
                        onChange={e => setName (e.target.value)} /*isso representa o valor do input*/
                    />

                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail (e.target.value)} /*isso representa o valor do input*/
                    />

                    <input 
                        placeholder="WhatsApp" 
                        value={whatsapp}
                        onChange={e => setWhatsapp (e.target.value)} /*isso representa o valor do input*/
                    />

                    <div className="input-group">
                    
                        <input 
                            placeholder="Cidade" 
                            value={city}
                            onChange={e => setCity (e.target.value)} /*isso representa o valor do input*/
                        />

                        <input 
                            placeholder="UF" 
                            value={uf}
                            onChange={e => setUf (e.target.value)} /*isso representa o valor do input*/
                            style={{ width: 80}} />
                    
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
               </form>

            </div>
        </div>
    );
}