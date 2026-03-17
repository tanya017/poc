
// 
// import { useForm } from "react-hook-form";

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   return(
//     <div className="h-screen flex bg-gray-100">
//       <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
//         <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
//           Login Form
//         </h1>
//         <form onSubmit={handleSubmit((data) => console.log(data))}>
//           <div>
//             <label>Usename</label>
//             <input
//               type="text"
//               className="w-full border rounded-md outline-none"
//               {...register("username")}
//             />
//           </div>

//           <div>
//             <label>Password</label>
//             <input
//               type="password"
//               className="w-full border rounded-md outline-none"
//               {...register("password", { required: true })}
//             />
//           </div>

//           {errors.password && <span>This field is required</span>}

//           <div className="text-center">
//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded shadow">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

