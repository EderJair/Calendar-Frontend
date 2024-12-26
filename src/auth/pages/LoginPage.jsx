import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';


const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    RegisterName: '',
    RegisterEmail: '',
    RegisterPassword: '',
    RegisterPassword2: '',
}





export const LoginPage = () => {


    const {startLogin, errorMessage, starRegister} = useAuthStore()

    const {loginEmail, loginPassword, onInputChange:onLoginInputChange} = useForm( loginFormFields)
    const {RegisterName, RegisterEmail, RegisterPassword, RegisterPassword2, onInputChange:onRegisterInputChange} = useForm( registerFormFields)



    const loginSubmit = (e) => {
        e.preventDefault();
        startLogin({email: loginEmail, password: loginPassword});
        
    }


    const registerSubmit = (e) => {
        e.preventDefault();
        if(RegisterPassword !== RegisterPassword2){
            Swal.fire('Contrasenas no coinciden', errorMessage, 'error')
            return
        }

        starRegister({name: RegisterName, email: RegisterEmail, password: RegisterPassword})
    }


    useEffect(() => {
      if(errorMessage !== undefined){
        Swal.fire('Error en Registro', 'Contrasenas no son iguales', 'error');
      }
      
    }, [errorMessage])
    


  return (
    <div className="container login-container">
        <div className="row">
            <div className="col-md-6 login-form-1">
                <h3>Ingreso</h3>
                <form onSubmit={loginSubmit}>
                    <div className="form-group mb-2">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Correo"
                            name='loginEmail'
                            value={loginEmail}
                            onChange={onLoginInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name='loginPassword'
                            value={loginPassword}
                            onChange={onLoginInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input 
                            type="submit"
                            className="btnSubmit"
                            value="Login" 
                        />
                    </div>
                </form>
            </div>

            <div className="col-md-6 login-form-2">
                <h3>Registro</h3>
                <form onSubmit={registerSubmit}>
                    <div className="form-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            name='RegisterName'
                            value={RegisterName}
                            onChange={onRegisterInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            name='RegisterEmail'
                            value={RegisterEmail}
                            onChange={onRegisterInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name='RegisterPassword'
                            value={RegisterPassword}
                            onChange={onRegisterInputChange}
                        />
                    </div>

                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Repita la contraseña"
                            name='RegisterPassword2'
                            value={RegisterPassword2}
                            onChange={onRegisterInputChange}
                        />
                    </div>

                    <div className="form-group mb-2">
                        <input 
                            type="submit" 
                            className="btnSubmit" 
                            value="Crear cuenta" />
                    </div>
                </form>
            </div>
        </div>
    </div>
)
}
