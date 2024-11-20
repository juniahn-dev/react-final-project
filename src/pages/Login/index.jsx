import  { atom, useRecoilState } from 'recoil';
import "./index.css";


const loginAtom = atom({
    key: 'Login',
    default: { userId:(1), name: '', email: '',address:'', pass:'' } 
});

export default function Login()
{

        const [value, setValue] = useRecoilState(loginAtom)

        const logout = (e)=>
            {
                e.preventDefault();
                localStorage.removeItem("logins")
            }

        const clean = (e)=>
        {
            e.preventDefault();
            setValue(prevValue => ({
                ...prevValue, 
                name: '',     
                email: '',    
                pass: '',
                address:''   
            }));
            
        }


        const handleChange = (e) => {
            const { name, value } = e.target;
            setValue((prev) => ({
                ...prev,
                [name]: value
            }));
        };
       
        
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log('Form submitted:', value);
            const form =
            {
                "name": value.name,
                "email":value.email,
                "pass": value.pass,
                "address":value.address,
            }
            localStorage.setItem("logins", JSON.stringify(form));
        };
    
    return (
        <div className="container justify-content-center d-flex">
          <div className='border pb-5 w-75  mt-5 pt-4 background-image border border-5 border-primary'>

            <div className='pb-5 '>

                <div className='pb-5 '>
                    <div className='pb-5 pt-5'>
                        <div className='pb-5 pt-5'>
                          <div className='pb-5 pt-5'> 
                                <div className='p-0 container  rounded  shadow pb-2  border mt-5  wida bg-white'>
                                    <h1 className='fs-4 pt-4 ms-3'>Welcome Back</h1>
                                    <p className='pb-2 fs-6 ms-3'>Please enter your details</p>
                                    <form onSubmit={handleSubmit} className='grid grid-cols-1 ms-48 m-0 text-center '>
                                        <div className='col-12 mb-3'> 
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                name="name"
                                                value={value.name}
                                                onChange={handleChange}
                                                className='rounded  w-75'
                                            />
                                        </div>
                                        <div className='col-12 mb-3'>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                name="email"
                                                value={value.email}
                                                onChange={handleChange}
                                                className='rounded  w-75  '
                                            />
                                        </div>
                                        <div className='col-12 mb-3'>
                                            <input
                                                type="text"
                                                placeholder="Address"
                                                name="address"
                                                value={value.address}
                                                onChange={handleChange}
                                                className='rounded  w-75  '
                                            />
                                        </div>
                                        <div className='col-12 mb-3'>
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                name="pass"
                                                value={value.pass}
                                                onChange={handleChange}
                                                className=' rounded w-75 '
                                            />
                                        </div>
                                        <div className='mt-4 pb-3'>
                                            <button type="submit" className='btn btn-primary    me-16 rounded '>Submit</button>
                                            <button type="submit" onClick={clean} className=' btn btn-secondary rounded ms-5'>delete</button>
                                        </div>
                                        <button type='submit'onClick={logout} className='btn btn-warning' >Logout</button>
                                    </form>
                                </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
