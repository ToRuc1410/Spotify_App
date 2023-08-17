import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ToastProvider({ children }: any) {
  return (
    <>
      {children}
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar transition={Slide} />
    </>
  )
}
